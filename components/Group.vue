<template>
  <SpinLoader height="h-full" v-if="loading" />
  <div v-if="!loading && group" class="flex flex-col gap-3 h-full px-3">
    <!-- Header -->
    <div class="h-14 flex items-center gap-1">
      <span class="font-semibold text-lg truncate">{{
        getGroupByID(groupID)?.name
      }}</span>
      <div class="flex gap-0.5 ml-auto">
        <UButton
          icon="i-heroicons-banknotes"
          variant="ghost"
          color="gray"
          @click="showSettlements = true"
        />
        <UButton
          icon="i-heroicons-chart-bar"
          variant="ghost"
          color="gray"
          @click="showStats = true"
        />
        <UButton
          @click="showGroupSettings = true"
          icon="i-heroicons-cog-6-tooth"
          variant="ghost"
          color="gray"
        />
      </div>
    </div>

    <div class="space-y-3 overflow-y-scroll pb-2 scroll-smooth">
      <!-- Unassigned Alert -->
      <div v-if="group && !group.myID">
        <UAlert
          variant="soft"
          color="primary"
          description="You don't have a member assigned in this group."
          :actions="[
            {
              click() {
                showGroupSettings = true;
              },
              variant: 'solid',
              label: 'Assign Member',
            },
          ]"
        />
      </div>

      <!-- Balance Card -->
      <YourBalances :groupID="groupID" />

      <!-- Action Buttons -->
      <div class="w-full flex text-center gap-2">
        <div class="flex-grow">
          <UButton
            @click="showExpenseEditor = true"
            block
            icon="i-heroicons-plus"
            class="shadow-sm"
          >
            Add Expense
          </UButton>
        </div>
        <div class="flex-grow">
          <UButton
            @click="showPaymentEditor = true"
            block
            variant="outline"
            icon="i-heroicons-arrow-right-left"
          >
            Payment
          </UButton>
        </div>
      </div>

      <!-- Search & Sort -->
      <div class="flex gap-2 items-center">
        <div class="flex-grow relative">
          <UInput
            v-model="searchQuery"
            placeholder="Search expenses..."
            size="sm"
            class="w-full"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <div class="flex items-center">
                <UIcon
                  v-if="!searchQuery"
                  name="i-heroicons-magnifying-glass-20-solid"
                  class="w-4 h-4 text-gray-400"
                />
                <UButton
                  v-else
                  @click="searchQuery = ''"
                  variant="ghost"
                  color="gray"
                  size="2xs"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-mr-1"
                />
              </div>
            </template>
          </UInput>
        </div>
        <USelectMenu
          v-model="sortBy"
          :options="sortOptions"
          value-attribute="id"
          option-attribute="label"
          size="sm"
          class="w-40 shrink-0"
        >
          <template #label>
            <div class="flex items-center gap-1.5 text-xs">
              <UIcon name="i-heroicons-arrows-up-down" class="w-3.5 h-3.5 text-gray-400" />
              <span>{{ sortOptions.find(o => o.id === sortBy)?.label || 'Sort' }}</span>
            </div>
          </template>
        </USelectMenu>
      </div>

      <!-- Date Range Filter -->
      <div v-if="hasTransactions" class="flex gap-2 items-center">
        <div class="flex items-center gap-1.5 flex-grow">
          <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-gray-400 shrink-0" />
          <UInput
            v-model="startDate"
            type="date"
            size="sm"
            class="flex-grow min-w-0"
            placeholder="From"
            :ui="{ base: 'block w-full' }"
          />
          <span class="text-xs text-gray-400 shrink-0">—</span>
          <UInput
            v-model="endDate"
            type="date"
            size="sm"
            class="flex-grow min-w-0"
            placeholder="To"
            :ui="{ base: 'block w-full' }"
          />
        </div>
        <UButton
          v-if="startDate || endDate"
          @click="startDate = ''; endDate = ''"
          variant="ghost"
          color="gray"
          size="xs"
          icon="i-heroicons-x-mark"
          class="shrink-0"
        />
      </div>

      <!-- Category Filter Chips -->
      <div v-if="hasTransactions" class="flex gap-1.5 overflow-x-auto pb-1" style="-ms-overflow-style: none; scrollbar-width: none;">
        <UBadge
          @click="activeCategory = null"
          :variant="activeCategory === null ? 'solid' : 'soft'"
          :color="activeCategory === null ? 'primary' : 'gray'"
          size="sm"
          class="cursor-pointer shrink-0 transition-all duration-200"
        >
          All
        </UBadge>
        <UBadge
          v-for="cat in EXPENSE_CATEGORIES"
          :key="cat.id"
          @click="activeCategory = activeCategory === cat.id ? null : cat.id"
          :color="activeCategory === cat.id ? cat.color : 'gray'"
          :variant="activeCategory === cat.id ? 'solid' : 'soft'"
          size="sm"
          class="cursor-pointer shrink-0 transition-all duration-200 flex items-center gap-1"
        >
          <span
            class="w-1.5 h-1.5 rounded-full"
            :style="{ backgroundColor: CATEGORY_DOT_HEX[cat.color] || '#6b7280' }"
          />
          {{ cat.label }}
        </UBadge>
      </div>

      <!-- Transaction Groups -->
      <div v-if="sortedFilteredTransactions.length > 0" class="space-y-3">
        <ExpenseGroup
          @edit="edit"
          :group="txGroup"
          v-for="txGroup in sortedFilteredTransactions"
        />
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
          <UIcon name="i-heroicons-receipt-percent" class="w-8 h-8 text-primary-400 dark:text-primary-500" />
        </div>
        <p class="text-gray-500 dark:text-gray-400 font-medium">
          {{ emptyStateTitle }}
        </p>
        <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">
          {{ emptyStateDescription }}
        </p>
        <UButton
          v-if="!hasActiveFilters"
          @click="showExpenseEditor = true"
          variant="soft"
          color="primary"
          class="mt-4"
          icon="i-heroicons-plus"
        >
          Add First Expense
        </UButton>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <UModal
    :ui="{
      transition: { enter: 'transition-all duration-300', leave: 'transition-all duration-200' },
    }"
    prevent-close
    v-model="showPaymentEditor"
  >
    <PaymentEditor
      v-model="ugly"
      :expenseItem="expense"
      @update="update"
      @record="add"
      @close="clearEditors"
      @delete="requestDel"
    />
  </UModal>
  <UModal
    :ui="{ transition: { enter: 'transition-all duration-300', leave: 'transition-all duration-200' } }"
    prevent-close
    v-model="showExpenseEditor"
  >
    <ExpenseEditor
      :expenseItem="expense"
      @update="update"
      @add="add"
      @close="clearEditors"
      @delete="requestDel"
    />
  </UModal>
  <UModal
    :ui="{ transition: { enter: 'transition-all duration-300', leave: 'transition-all duration-200' } }"
    v-model="showStats"
  >
    <ClientOnly>
      <Stats @close="showStats = false" />
    </ClientOnly>
  </UModal>
  <UModal
    :ui="{ transition: { enter: 'transition-all duration-300', leave: 'transition-all duration-200' } }"
    v-model="showSettlements"
  >
    <Settlements
      :groupID="groupID"
      @close="showSettlements = false"
      @settle="handleSettle"
    />
  </UModal>

  <UModal
    :ui="{ transition: { enter: 'transition-all duration-300', leave: 'transition-all duration-200' } }"
    v-model="showGroupSettings"
  >
    <GroupSettings @close="showGroupSettings = false" />
  </UModal>
  <UModal
    :ui="{ transition: { enter: 'transition-all duration-300', leave: 'transition-all duration-200' } }"
    v-model="showDeleteConfirmation"
  >
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-medium">Delete Expense</span>
          <UButton
            @click="showDeleteConfirmation = false"
            variant="ghost"
            color="gray"
            icon="i-heroicons-x-mark"
          />
        </div>
      </template>
      <div class="space-y-2">
        <UAlert
          color="rose"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          description="Are you sure you want to delete this expense? This action cannot be undone."
        />
      </div>
      <template #footer>
        <div class="flex gap-2">
          <UButton @click="del" color="rose" variant="solid">Yes, delete</UButton>
          <UButton @click="cancelDel" variant="ghost">Cancel</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { nanoid } from "nanoid";
import { EXPENSE_CATEGORIES } from "~/utils/constants";
import moment from "moment";

const CATEGORY_DOT_HEX = {
  rose: "#f43f5e", sky: "#0ea5e9", amber: "#f59e0b", violet: "#8b5cf6",
  emerald: "#10b981", pink: "#ec4899", indigo: "#6366f1", orange: "#f97316",
  teal: "#14b8a6", lime: "#84cc16", gray: "#6b7280",
};

const showExpenseEditor = ref(false),
  showPaymentEditor = ref(false),
  showGroupSettings = ref(false),
  showStats = ref(false),
  showSettlements = ref(false),
  showDeleteConfirmation = ref(false),
  ugly = ref({ hello: "" }),
  expense = ref(null),
  deleteExpense = ref(null),
  activeCategory = ref(null),
  searchQuery = ref(""),
  sortBy = ref("newest"),
  startDate = ref(""),
  endDate = ref("");

const sortOptions = [
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "highest", label: "Highest Amount" },
  { id: "lowest", label: "Lowest Amount" },
];

const { getGroupByID, loading } = storeToRefs(useGroups());

const groupID = useGroups().currentGroup;
const group = computed(() => getGroupByID.value(groupID));

const hasTransactions = computed(() => {
  const g = getGroupByID.value(groupID);
  return g && Object.keys(g.transactions || {}).length > 0;
});

const computeTotalCost = (tx) =>
  Object.values(tx.payers || {}).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0,
  );

const sortedFilteredTransactions = computed(() => {
  const group = getGroupByID.value(groupID);
  if (!group) return [];

  let transactions = Object.values(group.transactions || {});

  // Filter by search query
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    transactions = transactions.filter(
      (tx) => tx.description?.toLowerCase().includes(q),
    );
  }

  // Filter by category
  if (activeCategory.value) {
    transactions = transactions.filter(
      (tx) => tx.category === activeCategory.value,
    );
  }

  // Filter by date range
  if (startDate.value) {
    transactions = transactions.filter(
      (tx) =>
        tx.created_at &&
        tx.created_at.slice(0, 10) >= startDate.value,
    );
  }
  if (endDate.value) {
    transactions = transactions.filter(
      (tx) =>
        tx.created_at &&
        tx.created_at.slice(0, 10) <= endDate.value,
    );
  }

  // Sort
  const sorted = [...transactions].sort((a, b) => {
    switch (sortBy.value) {
      case "oldest":
        return a.created_at.localeCompare(b.created_at);
      case "highest": {
        const aCost = computeTotalCost(a);
        const bCost = computeTotalCost(b);
        return bCost - aCost;
      }
      case "lowest": {
        const aCost = computeTotalCost(a);
        const bCost = computeTotalCost(b);
        return aCost - bCost;
      }
      case "newest":
      default:
        return b.created_at.localeCompare(a.created_at);
    }
  });

  // Group by month, separating expenses and payments
  const groups = [];
  const monthMap = {};
  for (const tx of sorted) {
    const month = moment.utc(tx.created_at).format("MMMM YYYY");
    if (!monthMap[month]) {
      monthMap[month] = { month, expenses: [], payments: [] };
      groups.push(monthMap[month]);
    }
    if (tx.type === "payment") {
      monthMap[month].payments.push(tx);
    } else {
      monthMap[month].expenses.push(tx);
    }
  }

  return groups;
});

const hasActiveFilters = computed(
  () => !!searchQuery.value || !!activeCategory.value || !!startDate.value || !!endDate.value,
);

const emptyStateTitle = computed(() => {
  if (searchQuery.value) return "No matching expenses";
  if (activeCategory.value) return "No expenses in this category yet";
  if (startDate.value || endDate.value) return "No expenses in this date range";
  return "No expenses yet";
});

const emptyStateDescription = computed(() => {
  if (searchQuery.value) return "Try a different search term";
  if (activeCategory.value) return "Try a different category or add a new expense";
  if (startDate.value || endDate.value) return "Try a wider date range";
  return 'Tap "Add Expense" to get started';
});

watch(loading, () => {
  checkGroup();
});
onMounted(() => {
  checkGroup();
});

function checkGroup() {
  if (!loading.value && !group.value) {
    navigateTo("/app");
  }
}

function add(expense) {
  useGroups().addTransaction(groupID, expense);
  clearEditors();
}
function update(expense) {
  useGroups().updateTransaction(groupID, expense);
  clearEditors();
}
function edit(exp) {
  expense.value = exp;
  if (exp.type === "expense") {
    showExpenseEditor.value = true;
  } else {
    showPaymentEditor.value = true;
  }
}
function handleSettle(payment) {
  showSettlements.value = false;
  // Pre-fill PaymentEditor with the settle info
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

function clearEditors() {
  showExpenseEditor.value = false;
  showPaymentEditor.value = false;
  expense.value = null;
  ugly.value = { hello: "" };
}
function requestDel(expense) {
  deleteExpense.value = expense;
  showDeleteConfirmation.value = true;
}
function del() {
  useGroups().deleteTransaction(groupID, deleteExpense.value.id);
  showDeleteConfirmation.value = false;
  clearEditors();
}
function cancelDel() {
  showDeleteConfirmation.value = false;
  deleteExpense.value = null;
}
</script>
