import { nanoid } from "nanoid";
import moment from "moment";
import { getSupabase } from "./supabase.client";

// ============================================
// DEVICE ID — used to identify "you" per device
// ============================================
const getDeviceId = () => {
  let id = localStorage.getItem("peersplit.device_id");
  if (!id) {
    id = nanoid(16);
    localStorage.setItem("peersplit.device_id", id);
  }
  return id;
};

// ============================================
// INIT
// ============================================
export const dbInit = async () => {
  const { error } = await getSupabase()
    .from("groups")
    .select("id", { count: "exact", head: true });
  if (error) {
    console.error("Supabase connection failed:", error);
    throw error;
  }
};

// ============================================
// WIPE (for settings page)
// ============================================
export const wipeData = async () => {
  localStorage.removeItem("peersplit.device_id");
  localStorage.removeItem("peersplit.name");
};

// ============================================
// HELPERS — data format conversion
// ============================================
const tryParseJSON = (str: any) => {
  if (!str || typeof str !== "string") return str;
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};

/** Build member name → ID map */
const buildNameToId = (members: Record<string, { id: string; name: string }>) => {
  const map: Record<string, string> = {};
  for (const m of Object.values(members)) {
    if (m.name) map[m.name.toLowerCase()] = m.id;
  }
  return map;
};

/** Build member ID → name map */
const buildIdToName = (members: Record<string, { id: string; name: string }>) => {
  const map: Record<string, string> = {};
  for (const m of Object.values(members)) {
    map[m.id] = m.name;
  }
  return map;
};

/** Convert a Supabase expense row to the app's internal transaction format */
const expenseToTransaction = (exp: any, nameToId: Record<string, string>) => {
  const payerId = nameToId[exp.paid_by?.toLowerCase()] || `unknown:${exp.paid_by || "?"}`;
  const involvedIds = (exp.involved || []).map((n: string) => nameToId[n.toLowerCase()] || `unknown:${n}`);
  const total = Number(exp.amount) || 0;

  const payers: Record<string, number> = { [payerId]: total };
  const splitters: Record<string, number> = {};

  if (exp.split_details && typeof exp.split_details === "object" && !Array.isArray(exp.split_details)) {
    // Per-person amounts
    for (const [name, amount] of Object.entries(exp.split_details)) {
      const id = nameToId[name.toLowerCase()] || `unknown:${name}`;
      splitters[id] = Number(amount);
    }
  } else {
    // Equal split
    const each = total / (involvedIds.length || 1);
    for (const id of involvedIds) {
      splitters[id] = id ? each : 0;
    }
  }

  return {
    id: exp.id,
    type: "expense" as const,
    description: exp.description || "",
    splitType: 1,
    payers,
    splitters,
    category: exp.category || null,
    created_at: exp.created_at || exp.date,
    updated_at: exp.updated_at,
    created_by: exp.paid_by || "",
  };
};

/** Convert a Supabase payment row to the app's internal transaction format */
const paymentToTransaction = (pay: any, nameToId: Record<string, string>) => {
  const fromId = nameToId[pay.from_user?.toLowerCase()] || `unknown:${pay.from_user || "?"}`;
  const toId = nameToId[pay.to_user?.toLowerCase()] || `unknown:${pay.to_user || "?"}`;
  const amount = Number(pay.amount) || 0;

  return {
    id: pay.id,
    type: "payment" as const,
    description: pay.note || `${pay.from_user || "?"} → ${pay.to_user || "?"}`,
    splitType: 1,
    payers: { [fromId]: amount },
    splitters: { [toId]: amount },
    category: pay.category || null,
    created_at: pay.created_at || pay.date,
    updated_at: pay.updated_at,
    created_by: "",
  };
};

/** Build the app's internal group object from Supabase query results */
const buildGroupObject = (
  groupRow: any,
  members: any[],
  expenses: any[],
  payments: any[],
  activityRows: any[],
  deviceId: string,
) => {
  const membersMap: Record<string, { id: string; name: string; siteID: string }> = {};
  let myID: string | null = null;

  for (const m of members) {
    membersMap[m.id] = { id: m.id, name: m.name || "Unnamed User", siteID: m.site_id || "" };
    if (m.site_id === deviceId) {
      myID = m.id;
    }
  }

  const nameToId = buildNameToId(membersMap);

  const transactions: Record<string, any> = {};
  const transactionOrder: string[] = [];

  for (const exp of expenses) {
    const tx = expenseToTransaction(exp, nameToId);
    transactions[tx.id] = tx;
    transactionOrder.push(tx.id);
  }

  for (const pay of payments) {
    const tx = paymentToTransaction(pay, nameToId);
    transactions[tx.id] = tx;
    transactionOrder.push(tx.id);
  }

  // Sort by created_at ascending
  transactionOrder.sort((a, b) => {
    const aDate = transactions[a]?.created_at || "";
    const bDate = transactions[b]?.created_at || "";
    return String(aDate).localeCompare(String(bDate));
  });

  const activityList = (activityRows || []).map((a: any) => ({
    ...a,
    data: tryParseJSON(a.data),
  }));

  return {
    id: groupRow.id,
    myID,
    mySiteID: deviceId,
    name: groupRow.name || "Unnamed Group",
    currency: groupRow.currency || "₹",
    transactions,
    transactionOrder,
    activityList,
    members: membersMap,
  };
};

// ============================================
// UPDATE GROUP — refreshes Pinia store after DB ops
// ============================================
export const updateGroup = async (id: string) => {
  const group = await getGroup(id);
  if (group) {
    useGroups().setGroup(group);
  }
  return group;
};

// ============================================
// GET GROUP — fetch full group with all related data
// ============================================
export const getGroup = async (id: string) => {
  const supabase = getSupabase();
  const deviceId = getDeviceId();

  const [{ data: groupRow }, { data: members }, { data: expenses }, { data: payments }, { data: activityRows }] =
    await Promise.all([
      supabase.from("groups").select("*").eq("id", id).single(),
      supabase.from("members").select("*").eq("group_id", id),
      supabase.from("expenses").select("*").eq("group_id", id).order("created_at", { ascending: true }),
      supabase.from("payments").select("*").eq("group_id", id).order("created_at", { ascending: true }),
      supabase.from("activity").select("*").eq("group_id", id).order("created_at", { ascending: true }),
    ]);

  if (!groupRow) return null;

  return buildGroupObject(groupRow, members || [], expenses || [], payments || [], activityRows || [], deviceId);
};

// ============================================
// GET GROUPS — fetch all groups
// ============================================
export const getGroups = async (): Promise<Record<string, any>> => {
  const { data: groupRows } = await getSupabase().from("groups").select("*");
  const result: Record<string, any> = {};

  if (groupRows) {
    await Promise.all(
      groupRows.map(async (g) => {
        const group = await getGroup(g.id);
        if (group) result[group.id] = group;
      }),
    );
  }
  return result;
};

// ============================================
// CREATE GROUP
// ============================================
export const createGroup = async (name: string, currency: string) => {
  const id = nanoid(32);
  const deviceId = getDeviceId();

  await getSupabase().from("groups").insert({ id, name, currency });

  // Create a default member for the creator
  const userName = typeof useName !== "undefined" ? useName().value : "Me";
  const memberId = nanoid();
  await getSupabase().from("members").insert({
    id: memberId,
    group_id: id,
    name: userName || "Me",
    site_id: deviceId,
  });

  const group = await updateGroup(id);
  return id;
};

export const createEmptyGroup = async (id: string) => {
  await getSupabase().from("groups").insert({ id, name: "New Group", currency: "₹" });
};

// ============================================
// SET GROUP NAME
// ============================================
export const setGroupName = async (id: string, name: string, by?: string) => {
  const supabase = getSupabase();

  const { data: groupRow } = await supabase.from("groups").select("name").eq("id", id).single();
  const prev = groupRow?.name || "";

  await supabase.from("groups").update({ name }).eq("id", id);

  const activityId = nanoid();
  await supabase.from("activity").insert({
    id: activityId,
    group_id: id,
    data: { type: "update_name", prev, cur: name },
    by: by || "",
  });

  await updateGroup(id);
  return await getActivityById(activityId);
};

// ============================================
// SET GROUP CURRENCY
// ============================================
export const setGroupCurrency = async (id: string, currency: string, by?: string) => {
  const supabase = getSupabase();

  const { data: groupRow } = await supabase.from("groups").select("currency").eq("id", id).single();
  const prev = groupRow?.currency || "";

  await supabase.from("groups").update({ currency }).eq("id", id);

  const activityId = nanoid();
  await supabase.from("activity").insert({
    id: activityId,
    group_id: id,
    data: { type: "update_currency", prev, cur: currency },
    by: by || "",
  });

  await updateGroup(id);
  return await getActivityById(activityId);
};

// ============================================
// MEMBERS
// ============================================
export const addMemberToGroup = async (groupID: string, member: { id: string; name: string }) => {
  await getSupabase().from("members").insert({
    id: member.id,
    group_id: groupID,
    name: member.name,
  });
};

export const updateMemberInGroup = async (groupID: string, id: string, data: { name?: string; site_id?: string | null }) => {
  await getSupabase().from("members").update(data).eq("id", id).eq("group_id", groupID);
};

export const deleteMemberFromGroup = async (groupID: string, id: string) => {
  await getSupabase().from("members").delete().eq("id", id).eq("group_id", groupID);
};

// ============================================
// TRANSACTIONS
// ============================================
export const addTransactionToGroup = async (groupID: string, transaction: any, by?: string) => {
  const supabase = getSupabase();
  const group = await getGroup(groupID);
  if (!group) return null;

  const idToName = buildIdToName(group.members);
  const activityId = nanoid();

  if (transaction.type === "expense") {
    const paidByName = idToName[Object.keys(transaction.payers)[0]] || "";
    const involvedNames = Object.keys(transaction.splitters)
      .map((id) => idToName[id])
      .filter(Boolean);

    await supabase.from("expenses").insert({
      id: transaction.id,
      group_id: groupID,
      description: transaction.description || "",
      amount: Object.values(transaction.payers).reduce((a: number, b: any) => a + Number(b), 0),
      paid_by: paidByName,
      date: transaction.created_at || moment().utc().format("YYYY-MM-DDTHH:mm:ss"),
      involved: involvedNames,
      split_type: transaction.splitType === 1 ? "equal" : "custom",
      category: transaction.category || null,
    });
  } else {
    const fromName = idToName[Object.keys(transaction.payers)[0]] || "";
    const toName = idToName[Object.keys(transaction.splitters)[0]] || "";
    const amountVal = Object.values(transaction.payers)[0] || 0;

    await supabase.from("payments").insert({
      id: transaction.id,
      group_id: groupID,
      from_user: fromName,
      to_user: toName,
      amount: Number(amountVal),
      date: transaction.created_at || moment().utc().format("YYYY-MM-DDTHH:mm:ss"),
      note: transaction.description || "",
    });
  }

  await supabase.from("activity").insert({
    id: activityId,
    group_id: groupID,
    data: { type: "create_transaction", cur: { ...transaction } },
    by: by || "",
  });

  await updateGroup(groupID);
  return await getActivityById(activityId);
};

export const updateTransactionInGroup = async (groupID: string, transaction: any, by?: string) => {
  const supabase = getSupabase();
  const group = await getGroup(groupID);
  if (!group) return null;

  const idToName = buildIdToName(group.members);
  const activityId = nanoid();

  if (transaction.type === "expense") {
    const paidByName = idToName[Object.keys(transaction.payers)[0]] || "";
    const involvedNames = Object.keys(transaction.splitters)
      .map((id) => idToName[id])
      .filter(Boolean);

    await supabase
      .from("expenses")
      .update({
        description: transaction.description || "",
        amount: Object.values(transaction.payers).reduce((a: number, b: any) => a + Number(b), 0),
        paid_by: paidByName,
        involved: involvedNames,
        split_type: transaction.splitType === 1 ? "equal" : "custom",
        category: transaction.category || null,
      })
      .eq("id", transaction.id)
      .eq("group_id", groupID);
  } else {
    const fromName = idToName[Object.keys(transaction.payers)[0]] || "";
    const toName = idToName[Object.keys(transaction.splitters)[0]] || "";
    const amountVal = Object.values(transaction.payers)[0] || 0;

    await supabase
      .from("payments")
      .update({
        from_user: fromName,
        to_user: toName,
        amount: Number(amountVal),
        note: transaction.description || "",
      })
      .eq("id", transaction.id)
      .eq("group_id", groupID);
  }

  await supabase.from("activity").insert({
    id: activityId,
    group_id: groupID,
    data: { type: "update_transaction", cur: { ...transaction } },
    by: by || "",
  });

  await updateGroup(groupID);
  return await getActivityById(activityId);
};

export const deleteTransactionFromGroup = async (groupID: string, transactionId: string, by?: string) => {
  const supabase = getSupabase();
  const activityId = nanoid();

  // Try deleting from expenses first; if not found, delete from payments
  const { data: expense } = await supabase
    .from("expenses")
    .select("id")
    .eq("id", transactionId)
    .eq("group_id", groupID)
    .single();

  if (expense) {
    await supabase.from("expenses").delete().eq("id", transactionId).eq("group_id", groupID);
  } else {
    await supabase.from("payments").delete().eq("id", transactionId).eq("group_id", groupID);
  }

  await supabase.from("activity").insert({
    id: activityId,
    group_id: groupID,
    data: { type: "delete_transaction", prev: { id: transactionId } },
    by: by || "",
  });

  await updateGroup(groupID);
  return await getActivityById(activityId);
};

// ============================================
// ACTIVITY
// ============================================
export const getActivityById = async (id: string) => {
  const { data } = await getSupabase().from("activity").select("*").eq("id", id).single();
  if (!data) return null;
  return { ...data, data: tryParseJSON(data.data) };
};

export const getActivity = async (_tx: any, id: string) => {
  // Kept for backward compatibility — Supabase doesn't use transaction-based reads
  return await getActivityById(id);
};

// ============================================
// STUB IMPORTS (kept for compatibility)
// These were used by Gun.js sync — no longer needed
// ============================================
export const initGroupDb = async (_id: string) => {};
export const getGroupDB = async (_id: string) => ({
  async tx(fn: (tx: any) => Promise<void>) {
    await fn({ execO: async () => [], exec: async () => {} });
  },
  async exec(_q: string, _p?: any[]) {},
});
export const getSiteID = async () => getDeviceId();

// ============================================
// EXISTING IMPORTS (keep for backward compat)
// Used by SupabaseImport and SplitwiseImport
// ============================================
export const importSupabase = async (
  groupID: string,
  myID: string,
  supabaseMembers: any[],
  supabaseExpenses: any[],
  supabasePayments: any[],
) => {
  const db = getSupabase();

  // Create members
  const memberIdMap: Record<string, string> = {};
  for (const member of supabaseMembers) {
    const id = nanoid();
    memberIdMap[member.name] = id;
    await db.from("members").insert({ id, group_id: groupID, name: member.name });
  }

  // Create expenses
  for (const expense of supabaseExpenses) {
    const payerId = memberIdMap[expense.paid_by];
    if (!payerId) continue;

    const payers = { [payerId]: expense.amount };
    const splitters: Record<string, any> = {};

    if (expense.split_type === "equal") {
      for (const name of expense.involved || []) {
        const splitterId = memberIdMap[name];
        if (splitterId) splitters[splitterId] = 1;
      }
    } else if (expense.split_details) {
      for (const [name, amount] of Object.entries(expense.split_details)) {
        const splitterId = memberIdMap[name];
        if (splitterId) splitters[splitterId] = amount;
      }
    }

    const createdAt = expense.date
      ? moment(expense.date).utc().format("YYYY-MM-DD HH:mm:ss")
      : moment().utc().format("YYYY-MM-DD HH:mm:ss");

    await db.from("expenses").insert({
      id: nanoid(),
      group_id: groupID,
      description: expense.description,
      amount: expense.amount,
      paid_by: expense.paid_by,
      date: createdAt,
      involved: expense.involved || [],
      split_type: expense.split_type || "equal",
      category: expense.category || null,
    });
  }

  // Create payments
  for (const payment of supabasePayments) {
    const fromId = memberIdMap[payment.from_user];
    const toId = memberIdMap[payment.to_user];
    if (!fromId || !toId) continue;

    const createdAt = payment.date
      ? moment(payment.date).utc().format("YYYY-MM-DD HH:mm:ss")
      : moment().utc().format("YYYY-MM-DD HH:mm:ss");

    await db.from("payments").insert({
      id: nanoid(),
      group_id: groupID,
      from_user: payment.from_user,
      to_user: payment.to_user,
      amount: payment.amount,
      date: createdAt,
      note: payment.note || "",
    });
  }

  // Log activity
  await db.from("activity").insert({
    id: nanoid(),
    group_id: groupID,
    data: {
      type: "import_supabase",
      members: supabaseMembers.length,
      expenses: supabaseExpenses.length,
      payments: supabasePayments.length,
    },
    by: myID || "",
  });

  await updateGroup(groupID);
};

export const importSplitwise = async (groupID: string, myID: string, members: string[], transactions: any[][]) => {
  const db = getSupabase();
  const memberIds: string[] = [];

  await db.from("members").insert(
    members.map((name) => ({ id: nanoid(), group_id: groupID, name })),
  );

  // Re-fetch to get assigned IDs
  const { data: insertedMembers } = await db.from("members").select("id, name").eq("group_id", groupID);
  const nameToId: Record<string, string> = {};
  for (const m of insertedMembers || []) {
    nameToId[m.name] = m.id;
    if (!memberIds.includes(m.id)) memberIds.push(m.id);
  }

  for (const txn of transactions) {
    const payers: Record<string, number> = {};
    const splitters: Record<string, number> = {};

    txn.slice(5).forEach((v: any, index: number) => {
      const val = Number(v);
      if (val > 0 && memberIds[index]) payers[memberIds[index]] = val;
      if (val < 0 && memberIds[index]) splitters[memberIds[index]] = val;
    });

    const [date, description] = txn;
    const isPayment =
      description.includes("paid") &&
      txn
        .slice(5)
        .map((v: any) => Number(v))
        .filter((v: number) => v !== 0).length === 2;

    const createdAt = moment(date).utc().format("YYYY-MM-DD HH:mm:ss");

    if (isPayment) {
      const fromName = members[txn.slice(5).findIndex((v: number) => Number(v) > 0)];
      const toName = members[txn.slice(5).findIndex((v: number) => Number(v) < 0)];
      await db.from("payments").insert({
        id: nanoid(),
        group_id: groupID,
        from_user: fromName || "",
        to_user: toName || "",
        amount: Math.abs(Number(txn.slice(5).find((v: number) => Number(v) > 0) || 0)),
        date: createdAt,
        note: description || "",
      });
    } else {
      const paidByName = members[txn.slice(5).findIndex((v: number) => Number(v) > 0)] || "";
      const involvedNames = txn.slice(5).map((_: any, i: number) => members[i]).filter(Boolean);
      await db.from("expenses").insert({
        id: nanoid(),
        group_id: groupID,
        description: description || "",
        amount: txn.slice(5).reduce((sum: number, v: number) => sum + Math.max(0, Number(v)), 0),
        paid_by: paidByName,
        date: createdAt,
        involved: involvedNames,
        split_type: "custom",
      });
    }
  }

  await db.from("activity").insert({
    id: nanoid(),
    group_id: groupID,
    data: { type: "import_splitwise", members: members.length, transactions: transactions.length },
    by: myID || "",
  });

  await updateGroup(groupID);
};

// ============================================
// GUN SYNC STUBS (kept for backward compat)
// ============================================
export const applyChangesForGroup = async () => {};
export const getGroupChanges = async () => [[], -1];
export const checkChange = async () => false;
export const insertChange = async () => {};
