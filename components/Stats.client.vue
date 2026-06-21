<template>
  <UCard class="max-h-[85vh] overflow-y-auto">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-medium text-lg">Group Stats</span>
        <UButton
          @click="$emit('close')"
          variant="ghost"
          color="gray"
          icon="i-heroicons-x-mark"
        />
      </div>
    </template>
    <div class="space-y-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-3">
        <div class="p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50">
          <span class="text-xs text-primary-600 dark:text-primary-400 font-medium uppercase tracking-wider">Total Spent</span>
          <p class="text-2xl font-bold text-primary-700 dark:text-primary-300 mt-1">{{ currency }}{{ totalSpent }}</p>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50">
          <span class="text-xs text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wider">Transactions</span>
          <p class="text-2xl font-bold text-amber-700 dark:text-amber-300 mt-1">{{ txCount }}</p>
        </div>
      </div>

      <!-- Spending by Category -->
      <div v-if="categoryData.length > 0">
        <span class="font-medium text-sm text-gray-700 dark:text-gray-300">Spending by Category</span>
        <div class="mt-2 space-y-2">      <div v-for="cat in categoryData"
        :key="cat.id"
        class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div
          class="w-8 h-8 rounded-lg flex items-center justify-center"
          :style="{ backgroundColor: CAT_COLOR_HEX[cat.color] + '1a' || '#6b72801a' }"
        >
          <UIcon :name="cat.icon" class="w-4 h-4" :style="{ color: CAT_COLOR_HEX[cat.color] || '#6b7280' }" />
        </div>
        <div class="flex-grow">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ cat.label }}</span>
            <span class="text-sm font-semibold tabular-nums">{{ currency }}{{ cat.total }}</span>
          </div>
          <div class="mt-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :style="{
                width: cat.percent + '%',
                backgroundColor: CAT_COLOR_HEX[cat.color] || '#6b7280',
              }"
            />
          </div>
        </div>
      </div>
        </div>
      </div>

      <!-- Charts -->
      <div>
        <span class="font-medium text-sm text-gray-700 dark:text-gray-300">Spending</span>
        <canvas id="spending-chart" :height="graphHeight" class="mt-2"></canvas>
      </div>
      <div>
        <span class="font-medium text-sm text-gray-700 dark:text-gray-300">Shares</span>
        <canvas id="shares-chart" :height="graphHeight" class="mt-2"></canvas>
      </div>
      <div>
        <span class="font-medium text-sm text-gray-700 dark:text-gray-300">Payments Made</span>
        <canvas id="payments-made-chart" :height="graphHeight" class="mt-2"></canvas>
      </div>
      <div>
        <span class="font-medium text-sm text-gray-700 dark:text-gray-300">Payments Received</span>
        <canvas id="payments-received-chart" :height="graphHeight" class="mt-2"></canvas>
      </div>
    </div>
  </UCard>
</template>

<script setup>
import Chart from "chart.js/auto";
import { EXPENSE_CATEGORIES } from "~/utils/constants";

const groupID = useGroupID();

const CAT_COLOR_HEX = {
  rose: "#f43f5e", sky: "#0ea5e9", amber: "#f59e0b", violet: "#8b5cf6",
  emerald: "#10b981", pink: "#ec4899", indigo: "#6366f1", orange: "#f97316",
  teal: "#14b8a6", lime: "#84cc16", gray: "#6b7280",
};
const currency = computed(() => useGroups().getGroupCurrency(groupID));

const members = computed(() =>
  Object.keys(useGroups().getGroupByID(groupID).members || {}),
);

const graphHeight = computed(() => (members.value.length + 1) * 40);
const txCount = computed(() => Object.keys(useGroups().getGroupByID(groupID)?.transactions || {}).length);

const totalSpent = computed(() => {
  const transactions = useGroups().getGroupByID(groupID)?.transactions || {};
  let total = 0;
  for (const tx of Object.values(transactions)) {
    for (const val of Object.values(tx.payers)) {
      total = round(total + Number(val));
    }
  }
  return total;
});

const categoryData = computed(() => {
  const transactions = useGroups().getGroupByID(groupID)?.transactions || {};    const catTotals = {};
  for (const tx of Object.values(transactions)) {
    const cat = tx.category || "other";
    catTotals[cat] ||= 0;
    for (const val of Object.values(tx.payers)) {
      catTotals[cat] = round(catTotals[cat] + Number(val));
    }
  }
  const total = Object.values(catTotals).reduce((a, b) => a + b, 0);
  return EXPENSE_CATEGORIES.map((cat) => ({
    ...cat,
    total: catTotals[cat.id] || 0,
    percent: total > 0 ? round((catTotals[cat.id] || 0) / total * 100) : 0,
  })).filter((cat) => cat.total > 0);
});

const graphOptions = () => ({
  indexAxis: "y",
  elements: {
    bar: { borderWidth: 2, borderRadius: 4 },
  },
  responsive: true,
  scales: {
    x: {
      border: { display: false },
      grid: { display: false, drawOnChartArea: false },
      ticks: { font: { size: 11 } },
    },
    y: {
      grid: { color: "rgba(128,128,128,0.08)" },
      ticks: { font: { size: 11 } },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
});

const colors = [
  { background: "rgba(255, 99, 132, 0.2)", border: "rgb(255, 99, 132)" },
  { background: "rgba(255, 159, 64, 0.2)", border: "rgb(255, 159, 64)" },
  { background: "rgba(255, 205, 86, 0.2)", border: "rgb(255, 205, 86)" },
  { background: "rgba(75, 192, 192, 0.2)", border: "rgb(75, 192, 192)" },
  { background: "rgba(54, 162, 235, 0.2)", border: "rgb(54, 162, 235)" },
  { background: "rgba(153, 102, 255, 0.2)", border: "rgb(153, 102, 255)" },
  { background: "rgba(201, 203, 207, 0.2)", border: "rgb(201, 203, 207)" },
];

const memberColors = {};
let colorIndex = 0;
const getMemberColor = (member) => {
  if (memberColors[member]) return memberColors[member];
  colorIndex++;
  colorIndex %= colors.length;
  return (memberColors[member] = colors[colorIndex]);
};

const getData = (data) => {
  const rows = [
    {
      member: "Total",
      val: Object.values(data).reduce((a, b) => round(a + b), 0),
    },
    ...Object.entries(data).map(([member, val]) => ({
      id: member,
      member: useGroups().getMemberName(groupID, member),
      val,
    })),
  ];
  for (const member of members.value) {
    if (!data[member]) {
      rows.push({ member: useGroups().getMemberName(groupID, member), val: 0 });
    }
  }
  const chartColors = rows.map((row) => getMemberColor(row.id));
  return {
    labels: rows.map((row) => [row.member, row.val]),
    datasets: [
      {
        data: rows.map((row) => row.val),
        backgroundColor: chartColors.map((c) => c.background),
        borderColor: chartColors.map((c) => c.border),
      },
    ],
  };
};

onMounted(() => {
  const transactions = useGroups().getGroupByID(groupID).transactions;
  const spending = {},
    paymentsMade = {},
    paymentsReceived = {},
    shares = {};
  for (const transaction of Object.values(transactions)) {
    const computedTransaction = computeTransaction(transaction);
    if (computedTransaction.type === "expense") {
      for (const [payer, value] of Object.entries(computedTransaction.payers)) {
        spending[payer] ||= 0;
        spending[payer] = round(spending[payer] + Number(value));
      }
      for (const [splitter, value] of Object.entries(
        computedTransaction.splits,
      )) {
        shares[splitter] ||= 0;
        shares[splitter] = round(shares[splitter] + Number(value));
      }
    } else {
      for (const [payer, value] of Object.entries(computedTransaction.payers)) {
        paymentsMade[payer] ||= 0;
        paymentsMade[payer] = round(paymentsMade[payer] + Number(value));
      }
      for (const [splitter, value] of Object.entries(
        computedTransaction.splits,
      )) {
        paymentsReceived[splitter] ||= 0;
        paymentsReceived[splitter] = round(
          paymentsReceived[splitter] + Number(value),
        );
      }
    }
  }
  new Chart(document.getElementById("spending-chart"), {
    type: "bar",
    options: graphOptions(),
    data: getData(spending),
  });
  new Chart(document.getElementById("shares-chart"), {
    type: "bar",
    options: graphOptions(),
    data: getData(shares),
  });
  new Chart(document.getElementById("payments-made-chart"), {
    type: "bar",
    options: graphOptions(),
    data: getData(paymentsMade),
  });
  new Chart(document.getElementById("payments-received-chart"), {
    type: "bar",
    options: graphOptions(),
    data: getData(paymentsReceived),
  });
});
</script>
