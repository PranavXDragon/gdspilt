import moment from "moment";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";

export const round = (val) =>
  Math.round((Number(val) + Number.EPSILON) * 100) / 100;

export const groupGetMyBalance = (group) => {
  const balances = groupGetBalances(group);
  return balances[group.myID];
};

export const computeTransaction = (transaction) => {
  for (const [payer, val] of Object.entries(transaction.payers)) {
    transaction.payers[payer] = round(val);
  }
  for (const [splitter, val] of Object.entries(transaction.splitters)) {
    transaction.splitters[splitter] = round(val);
  }
  const totalCost = Object.values(transaction.payers).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0,
  );
  const totalSplit = Object.values(transaction.splitters).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0,
  );
  const splits = { ...transaction.splitters };
  const members = Object.keys(splits);
  members.sort();
  for (const split of Object.keys(splits)) {
    // split equally
    if (transaction.splitType === 1) {
      splits[split] = totalCost / members.length;
    } else {
      splits[split] = totalCost * splits[split];
      splits[split] /= totalSplit;
    }
    splits[split] = round(splits[split]);
  }
  const newTotalSplit = Object.values(splits).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0,
  );
  if (members[0]) {
    const diff = totalCost - newTotalSplit;
    if (diff > 0) {
      splits[members[0]] = round(splits[members[0]] + diff);
    }
  }
  return {
    ...transaction,
    totalCost,
    splits,
  };
};

export const groupGetBalances = (group) => {
  const balances = {};
  for (const member of Object.keys(group.members || {})) {
    balances[member] = 0;
  }
  for (const transaction of Object.values(group.transactions || {})) {
    const computedTransaction = computeTransaction(transaction);
    for (const [payer, value] of Object.entries(computedTransaction.payers)) {
      balances[payer] ||= 0;
      balances[payer] = round(balances[payer] + Number(value));
    }
    for (const [splitter, value] of Object.entries(
      computedTransaction.splits,
    )) {
      balances[splitter] ||= 0;
      balances[splitter] = round(balances[splitter] - Number(value));
    }
  }
  return balances;
};

export const groupGetPayments = (group) => {
  const payments = [];
  const balances = Object.entries(groupGetBalances(group)).map(([a, b]) => [
    b,
    a,
  ]);
  balances.sort();
  let i = 0,
    j = balances.length - 1;
  while (i < j) {
    if (balances[i][0] === 0) {
      i++;
    } else if (balances[j][0] === 0) {
      j--;
    } else if (-balances[i][0] > balances[j][0]) {
      payments.push({
        from: balances[i][1],
        to: balances[j][1],
        value: round(balances[j][0]),
      });
      balances[i][0] += balances[j][0];
      balances[j][0] = 0;
    } else {
      payments.push({
        from: balances[i][1],
        to: balances[j][1],
        value: round(-balances[i][0]),
      });
      balances[j][0] += balances[i][0];
      balances[i][0] = 0;
    }
  }
  return payments;
};

export const useGroups = defineStore("groups", {
  state: () => ({
    loading: true,
    groups: {},
    currentGroup: null,
    currentTransaction: null,
  }),
  actions: {
    setCurrentGroup(id) {
      this.currentGroup = id;
    },
    setCurrentTransaction(id) {
      this.currentTransaction = id;
    },
    setGroups(groups) {
      this.groups = groups;
      this.loading = false;
    },
    setGroup(group) {
      this.groups ||= {};
      this.groups[group.id] = group;
    },
    async setGroupName(groupID, name) {
      const group = this.groups[groupID];
      group.name = name;
      const activity = await setGroupName(groupID, name, group.myID);
      this.addActivity(groupID, activity);
    },
    async setGroupCurrency(groupID, currency) {
      const group = this.groups[groupID];
      group.currency = currency;
      const activity = await setGroupCurrency(groupID, currency, group.myID);
      this.addActivity(groupID, activity);
    },
    async addTransaction(groupID, transaction) {
      const activity = await addTransactionToGroup(groupID, transaction, this.groups[groupID]?.myID);
      if (activity) this.addActivity(groupID, activity);
    },
    async updateTransaction(groupID, transaction) {
      const activity = await updateTransactionInGroup(groupID, transaction, this.groups[groupID]?.myID);
      if (activity) this.addActivity(groupID, activity);
    },
    async deleteTransaction(groupID, transactionID) {
      const activity = await deleteTransactionFromGroup(groupID, transactionID, this.groups[groupID]?.myID);
      if (activity) this.addActivity(groupID, activity);
    },
    async addMember(groupID, member) {
      const group = this.groups[groupID];
      if (!group.members) group.members = {};
      group.members[member.id] = member;
      await addMemberToGroup(groupID, member);
    },
    async updateMember(groupID, member) {
      const group = this.groups[groupID];
      group.members[member.id] = member;
      member.name ||= "Unnamed User";
      await updateMemberInGroup(groupID, member.id, { name: member.name, site_id: member.siteID });
    },
    async deleteMember(groupID, id) {
      const group = this.groups[groupID];
      if (group.members) delete group.members[id];
      await deleteMemberFromGroup(groupID, id);
    },
    async assignMember(groupID, id) {
      const group = this.groups[groupID];
      const old = group.myID;
      group.myID = id;
      if (old) {
        this.updateMember(groupID, {
          ...group.members[old],
          siteID: null,
        });
      }
      this.updateMember(groupID, {
        ...group.members[id],
        siteID: group.mySiteID,
      });
    },
    async addActivity(groupID, activity) {
      const group = this.groups[groupID];
      group.activityList ||= [];
      group.activityList.push(activity);
    },
  },
  getters: {
    getGroupedTransactionsByGroupID(state) {
      return (groupID) => {
        const monthMap = {};
        const transactionOrder = [
          ...(state.groups[groupID]?.transactionOrder || []),
        ].reverse();
        for (const transactionID of transactionOrder) {
          const transaction =
            state.groups[groupID]?.transactions?.[transactionID];
          if (transaction) {
            const month = moment(transaction.created_at).format("MMMM YYYY");
            if (!monthMap[month]) {
              monthMap[month] = { month, expenses: [], payments: [] };
            }
            if (transaction.type === "payment") {
              monthMap[month].payments.push(transaction);
            } else {
              monthMap[month].expenses.push(transaction);
            }
          }
        }
        return Object.values(monthMap);
      };
    },
    groupsList(state) {
      return Object.values(state.groups);
    },
    getGroupByID(state) {
      return (id) => state.groups[id];
    },
    getBalancesByGroupID() {
      return (id) => {
        return groupGetBalances(this.getGroupByID(id));
      };
    },
    getPaymentsByGroupID() {
      return (id) => groupGetPayments(this.getGroupByID(id));
    },
    getMembersList(state) {
      return (id) => Object.values(state.groups[id]?.members || {});
    },
    getMemberName(state) {
      return (groupID, memberID, lowercase) => {
        const group = state.groups[groupID];
        const name =
          memberID === group.myID
            ? lowercase
              ? "you"
              : "You"
            : group.members[memberID]?.name;
        return name || "Unnamed User";
      };
    },
    getGroupCurrency(state) {
      return (id) => state.groups[id]?.currency || "₹";
    },
    getAllActivity(state) {
      const activity = [];
      for (const group of Object.values(state.groups)) {
        activity.push(
          group.activityList.map((a) => ({
            ...a,
            groupID: group.id,
            myID: group.myID,
          })),
        );
      }
      const activityFlat = activity.flat();
      activityFlat.sort((a, b) => b.created_at.localeCompare(a.created_at));
      return activityFlat;
    },
  },
});
// TODO: can we make stuff slightly more performant
// by computing all group balances and payments together and caching them
// in the store???

export const updateGroups = async () => {
  useGroups().setGroups(await getGroups());
};

export const updateGroup = async (id) => {
  const group = await getGroup(id);
  useGroups().setGroup(group);
  return group;
};

export const useGroupID = () => useGroups().currentGroup;
