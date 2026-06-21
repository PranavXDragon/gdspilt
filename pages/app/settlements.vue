<template>
  <div class="h-full flex flex-col">
    <!-- Header with group name -->
    <div class="px-3 pt-3 pb-1 flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <p class="text-lg font-medium">Settlements</p>
        <span class="text-sm text-gray-400">·</span>
        <span class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[160px]">{{ group?.name }}</span>
      </div>
      <USelectMenu
        v-if="groupsList.length > 1"
        v-model="groupID"
        :options="groupsList"
        value-attribute="id"
        option-attribute="name"
        size="sm"
        class="w-40"
        placeholder="Switch group"
      >
        <template #label>
          <div class="flex items-center gap-1.5 text-xs truncate">
            <UIcon name="i-heroicons-arrows-right-left" class="w-3 h-3 text-gray-400 shrink-0" />
            <span class="truncate">{{ groupsList.find(g => g.id === groupID)?.name || 'Switch' }}</span>
          </div>
        </template>
      </USelectMenu>
    </div>

    <div class="flex-grow overflow-y-scroll px-2 pb-2">
      <SpinLoader height="h-full" v-if="loading" />

      <div v-else-if="!group" class="flex flex-col items-center justify-center h-full text-center">
        <div class="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-banknotes" class="w-8 h-8 text-primary-400 dark:text-primary-500" />
        </div>
        <p class="text-gray-500 dark:text-gray-400 font-medium">No group selected</p>
      </div>

      <div v-else class="py-1 space-y-4">
        <!-- Balance Summary Card -->
        <div
          class="p-4 rounded-xl border"
          :class="netBalance === 0
            ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30'
            : netBalance > 0
              ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30'
              : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30'"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ netBalance === 0 ? "You're settled up" : netBalance > 0 ? "You are owed" : "You owe" }}
              </p>
              <p class="text-2xl font-bold mt-0.5"
                :class="netBalance === 0 ? 'text-green-600 dark:text-green-400' : netBalance > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'"
              >
                {{ currency }}{{ Math.abs(netBalance) }}
              </p>
            </div>
            <div class="w-12 h-12 rounded-full flex items-center justify-center"
              :class="netBalance === 0 ? 'bg-green-100 dark:bg-green-900/30' : netBalance > 0 ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-amber-100 dark:bg-amber-900/30'"
            >
              <UIcon :name="netBalance === 0 ? 'i-heroicons-check-circle' : netBalance > 0 ? 'i-heroicons-arrow-down-circle' : 'i-heroicons-arrow-up-circle'"
                class="w-7 h-7"
                :class="netBalance === 0 ? 'text-green-500' : netBalance > 0 ? 'text-emerald-500' : 'text-amber-500'"
              />
            </div>
          </div>

          <!-- Owe breakdown -->
          <div v-if="netBalance < 0" class="mt-3 space-y-1.5 pt-3 border-t border-amber-200/50 dark:border-amber-800/20">
            <p v-for="p in paymentsInvolvingMe.filter(p => p.from === myID)"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-gray-600 dark:text-gray-400">
                You owe <span class="font-medium text-gray-800 dark:text-gray-200">{{ memberName(p.to) }}</span>
              </span>
              <span class="font-semibold text-amber-600 dark:text-amber-400">{{ currency }}{{ p.value }}</span>
            </p>
          </div>

          <!-- Owed breakdown -->
          <div v-if="netBalance > 0" class="mt-3 space-y-1.5 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/20">
            <p v-for="p in paymentsInvolvingMe.filter(p => p.to === myID)"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-gray-600 dark:text-gray-400">
                <span class="font-medium text-gray-800 dark:text-gray-200">{{ memberName(p.from) }}</span> owes you
              </span>
              <span class="font-semibold text-emerald-600 dark:text-emerald-400">{{ currency }}{{ p.value }}</span>
            </p>
          </div>
        </div>

        <!-- Outstanding Debts with Why breakdown -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Outstanding Debts</p>
            <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
              <button @click="simplifyDebts = true"
                class="text-xs px-2 py-1 rounded-md transition-all duration-200 font-medium"
                :class="simplifyDebts ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
              >Simplified</button>
              <button @click="simplifyDebts = false"
                class="text-xs px-2 py-1 rounded-md transition-all duration-200 font-medium"
                :class="!simplifyDebts ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'"
              >Raw</button>
            </div>
          </div>

          <div v-if="allPayments.length === 0" class="text-center py-8">
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
              <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500" />
            </div>
            <p class="text-gray-500 dark:text-gray-400 font-medium">All settled up!</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">No outstanding debts in {{ group.name }}.</p>
          </div>

          <div v-else class="space-y-2">
            <div v-for="(payment, index) in allPayments" :key="index"
              class="rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-200"
              :class="{ 'ring-2 ring-primary-100 dark:ring-primary-900/30': involvesMe(payment) }"
            >
              <!-- Payment header (clickable to toggle breakdown) -->
              <div @click="toggleBreakdown(index)"
                class="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  :class="payment.from === myID ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'"
                >
                  {{ payment.from === myID ? 'U' : memberName(payment.from).charAt(0).toUpperCase() }}
                </div>

                <div class="flex-grow min-w-0">
                  <p class="text-sm font-medium text-gray-800 dark:text-gray-200">
                    <span :class="{ 'font-bold': payment.from === myID }">{{ payment.from === myID ? 'You' : memberName(payment.from) }}</span>
                    <span class="text-gray-400 mx-1">→</span>
                    <span :class="{ 'font-bold': payment.to === myID }">{{ payment.to === myID ? 'you' : memberName(payment.to) }}</span>
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {{ payment.from === myID ? 'You owe' : memberName(payment.from) + ' owes' }}
                    {{ payment.to === myID ? 'you' : memberName(payment.to) }}
                  </p>
                </div>

                <div class="text-right shrink-0 flex items-center gap-2">
                  <div>
                    <p class="text-lg font-bold tabular-nums"
                      :class="payment.from === myID ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'"
                    >{{ currency }}{{ payment.value }}</p>
                  </div>
                  <UIcon :name="expandedIndex === index ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                    class="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <!-- Expanded transaction breakdown (the "why") -->
              <div v-if="expandedIndex === index" class="border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/20">
                <div class="px-3 py-2">
                  <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Why {{ memberName(payment.from) }} owes {{ memberName(payment.to) }}:</p>

                  <div v-if="getDebtBreakdown(payment).length === 0" class="text-xs text-gray-400 py-1 text-center">
                    From balance simplification
                  </div>

                  <div v-for="(item, i) in getDebtBreakdown(payment)" :key="i"
                    class="flex items-center justify-between py-1.5 text-sm border-b border-gray-100 dark:border-gray-700/30 last:border-0"
                  >
                    <div class="flex items-center gap-2 min-w-0">
                      <div class="w-1.5 h-1.5 rounded-full shrink-0"
                        :class="item.type === 'expense' ? 'bg-primary-400' : 'bg-amber-400'"
                      />
                      <span class="text-gray-700 dark:text-gray-300 truncate">{{ item.description }}</span>
                    </div>
                    <span class="font-medium tabular-nums shrink-0 ml-2"
                      :class="item.fromPaysTo ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'"
                    >
                      {{ item.fromPaysTo ? '+' : '–' }}{{ currency }}{{ Math.abs(item.amount) }}
                    </span>
                  </div>

                  <!-- Total -->
                  <div class="flex items-center justify-between pt-2 text-sm font-semibold border-t border-gray-200 dark:border-gray-700/50 mt-1">
                    <span class="text-gray-600 dark:text-gray-400">Total</span>
                    <span :class="payment.from === myID ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'">
                      {{ currency }}{{ payment.value }}
                    </span>
                  </div>
                </div>

                <div class="px-3 pb-3 flex gap-2">
                  <UButton @click.stop="markAsPaid(payment)" size="sm" color="emerald" block variant="soft" icon="i-heroicons-check-circle">
                    Mark as Paid
                  </UButton>
                  <UButton @click.stop="settle(payment)" size="sm" color="primary" variant="outline" icon="i-heroicons-arrow-right-left" class="shrink-0">
                    Customize
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Settlement History -->
        <div v-if="settlementHistory.length > 0">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 mt-6">Settlement History</p>
          <div class="space-y-2">
            <div v-for="(tx, index) in settlementHistory" :key="index"
              class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700/50"
            >
              <div class="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-primary-500" />
              </div>
              <div class="flex-grow min-w-0">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  <span class="font-medium">{{ memberName(Object.keys(tx.payers)[0]) }}</span>
                  paid
                  <span class="font-medium">{{ memberName(Object.keys(tx.splitters)[0]) }}</span>
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {{ formatDate(tx.created_at) }}
                  <span v-if="tx.description"> · {{ tx.description }}</span>
                </p>
              </div>
              <div class="text-right shrink-0">
                <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {{ currency }}{{ Object.values(tx.payers)[0] }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Payment Editor Modal -->
  <UModal :ui="{ transition: { enter: 'transition-all duration-300', leave: 'transition-all duration-200' } }" prevent-close v-model="showPaymentEditor">
    <PaymentEditor v-model="ugly" :expenseItem="expense" @update="update" @record="add" @close="clearEditors" />
  </UModal>
</template>

<script setup>
import { nanoid } from "nanoid";
import { computed, ref, nextTick } from "vue";

const { loading, groupsList, getGroupByID, getPaymentsByGroupID, getBalancesByGroupID } =
  storeToRefs(useGroups());

const showPaymentEditor = ref(false);
const ugly = ref({ hello: "" });
const expense = ref(null);
const expandedIndex = ref(null);
const simplifyDebts = ref(true);

// Auto-select current group or first group
const groupID = computed({
  get() {
    const current = useGroups().currentGroup;
    if (current) return current;
    if (groupsList.value.length > 0) return groupsList.value[0].id;
    return null;
  },
  set(val) {
    useGroups().setCurrentGroup(val);
  },
});

const group = computed(() => (groupID.value ? getGroupByID.value(groupID.value) : null));
const myID = computed(() => group.value?.myID);
const currency = computed(() => useGroups().getGroupCurrency(groupID.value));

const allPayments = computed(() => {
  if (!groupID.value) return [];
  if (simplifyDebts.value) {
    return getPaymentsByGroupID.value(groupID.value) || [];
  }
  // Unsimplified: compute pairwise debts per-transaction without cross-tx simplification
  const g = getGroupByID.value(groupID.value);
  if (!g || !g.transactions || !g.members) return [];
  // Accumulate net pairwise debts: "from->to" = amount
  const debts = {};
  for (const tx of Object.values(g.transactions)) {
    if (tx.type === "payment") continue;
    const computed = computeTransaction(tx);
    const totalPaid = Object.values(computed.payers).reduce((a, b) => round(Number(a) + Number(b)), 0);
    if (totalPaid <= 0) continue;
    // For each payer, compute who owes them from this transaction
    for (const [payer, paid] of Object.entries(computed.payers)) {
      const paidNum = Number(paid);
      if (paidNum <= 0) continue;
      for (const [splitter, split] of Object.entries(computed.splits)) {
        if (payer === splitter) continue;
        const splitNum = Number(split);
        if (splitNum <= 0) continue;
        // splitter's share attributed to this payer proportionally
        const amount = round(splitNum * (paidNum / totalPaid));
        if (amount <= 0) continue;
        const key = `${splitter}->${payer}`;
        debts[key] = round((debts[key] || 0) + amount);
      }
    }
  }
  // Consolidate pairwise (cancel out reverse debts)
  const paymentMap = {};
  for (const [key, amount] of Object.entries(debts)) {
    if (amount <= 0) continue;
    const [from, to] = key.split("->");
    const revKey = `${to}->${from}`;
    const revAmount = paymentMap[revKey] || 0;
    if (revAmount > 0) {
      const net = round(amount - revAmount);
      if (net > 0) paymentMap[key] = net;
      delete paymentMap[revKey];
    } else {
      paymentMap[key] = round((paymentMap[key] || 0) + amount);
    }
  }
  return Object.entries(paymentMap).map(([key, value]) => {
    const [from, to] = key.split("->");
    return { from, to, value };
  });
});

const paymentsInvolvingMe = computed(() =>
  allPayments.value.filter((p) => p.from === myID.value || p.to === myID.value),
);

const netBalance = computed(() => {
  if (!groupID.value) return 0;
  const balances = getBalancesByGroupID.value(groupID.value);
  return balances[myID.value] || 0;
});

function toggleBreakdown(index) {
  expandedIndex.value = expandedIndex.value === index ? null : index;
}

function involvesMe(payment) {
  return payment.from === myID.value || payment.to === myID.value;
}

function memberName(id) {
  return useGroups().getMemberName(groupID.value, id);
}

function getDebtBreakdown(payment) {
  const g = getGroupByID.value(groupID.value);
  if (!g || !g.transactions) return [];

  const items = [];
  for (const tx of Object.values(g.transactions)) {
    const computed = computeTransaction(tx);
    const fromSplit = computed.splits[payment.from] || 0;
    const toSplit = computed.splits[payment.to] || 0;
    const fromPaid = computed.payers[payment.from] || 0;
    const toPaid = computed.payers[payment.to] || 0;

    // If 'to' paid and 'from' has a split, 'from' owes 'to' for this transaction
    if (toPaid > 0 && fromSplit > 0) {
      const amount = Math.min(fromSplit, toPaid);
      items.push({
        description: computed.description || (computed.type === "payment" ? "Payment" : "Expense"),
        type: computed.type,
        amount,
        fromPaysTo: true,
      });
    }

    // If 'from' paid and 'to' has a split, 'to' owes 'from' (negative contribution to from→to debt)
    if (fromPaid > 0 && toSplit > 0) {
      const amount = Math.min(toSplit, fromPaid);
      items.push({
        description: computed.description || (computed.type === "payment" ? "Payment" : "Expense"),
        type: computed.type,
        amount,
        fromPaysTo: false, // this reduces what 'from' owes 'to'
      });
    }
  }

  // For payments (not expenses), override description to show payer→payee
  return items;
}

function settle(payment) {
  expense.value = {
    id: nanoid(),
    type: "payment",
    created_at: new Date(),
    splitType: 1,
    payers: { [payment.from]: String(payment.value) },
    splitters: { [payment.to]: String(payment.value) },
  };
  nextTick(() => {
    showPaymentEditor.value = true;
  });
}

function add(trx) {
  const gid = groupID.value;
  if (gid) {
    useGroups().addTransaction(gid, trx);
  }
  clearEditors();
}

function update(trx) {
  const gid = groupID.value;
  if (gid) {
    useGroups().updateTransaction(gid, trx);
  }
  clearEditors();
}

const settlementHistory = computed(() => {
  if (!groupID.value) return [];
  const g = getGroupByID.value(groupID.value);
  if (!g || !g.transactions) return [];
  return Object.values(g.transactions)
    .filter((tx) => tx.type === "payment")
    .sort((a, b) => b.created_at?.localeCompare(a.created_at) || 0);
});

function markAsPaid(payment) {
  const gid = groupID.value;
  if (!gid) return;
  const tx = {
    id: nanoid(),
    type: "payment",
    description: `Settlement: ${memberName(payment.from)} → ${memberName(payment.to)}`,
    created_at: new Date().toISOString(),
    splitType: 1,
    payers: { [payment.from]: String(payment.value) },
    splitters: { [payment.to]: String(payment.value) },
  };
  useGroups().addTransaction(gid, tx);
  expandedIndex.value = null;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function clearEditors() {
  showPaymentEditor.value = false;
  expense.value = null;
  ugly.value = { hello: "" };
}
</script>
