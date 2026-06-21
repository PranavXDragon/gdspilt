<template>
  <div
    @click="$emit('edit')"
    class="group px-3 py-3 flex gap-3 bg-white dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
  >
    <!-- Category Color Dot -->
    <div class="flex flex-col items-center justify-center shrink-0">
      <div
        v-if="expense.category"
        class="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium"
        :style="categoryBgStyle"
      >
        <UIcon :name="categoryIcon" class="w-5 h-5" />
      </div>
      <div
        v-else
        class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
      >
        <UIcon name="i-heroicons-receipt-percent" class="w-5 h-5 text-gray-400" />
      </div>
    </div>

    <div class="flex-grow flex justify-between items-center gap-2 min-w-0">
      <div v-if="expense.type === 'expense'" class="flex flex-col min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-medium text-gray-900 dark:text-gray-100 truncate">{{ expense.description }}</span>
          <UBadge
            v-if="expense.category"
            :color="categoryData?.color || 'gray'"
            variant="soft"
            size="xs"
          >
            {{ categoryLabel }}
          </UBadge>
          <span class="text-xs text-gray-400 dark:text-gray-500 shrink-0">{{
            moment.utc(expense.created_at).format("MMM DD")
          }}</span>
        </div>
        <div class="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
          <span
            v-for="[payer, val] in Object.entries(expense.payers)"
            class="text-xs text-gray-500 dark:text-gray-400"
          >
            <span class="font-medium text-gray-600 dark:text-gray-300">{{ useGroups().getMemberName(groupID, payer) }}</span>
            paid {{ useGroups().getGroupCurrency(groupID) }}{{ val }}
          </span>
        </div>
      </div>
      <div v-else class="flex flex-col min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-medium text-gray-900 dark:text-gray-100">
            {{ useGroups().getMemberName(groupID, Object.keys(expense.payers)[0]) }}
            paid
            {{ useGroups().getMemberName(groupID, Object.keys(expense.splitters)[0], true) }}
          </span>
          <span class="text-xs text-gray-400 dark:text-gray-500">{{
            moment.utc(expense.created_at).format("MMM DD")
          }}</span>
        </div>
      </div>
      <span
        :class="[
          'text-lg font-semibold tabular-nums shrink-0 transition-colors',
          getColorForValue(value),
        ]"
      >
        {{ useGroups().getGroupCurrency(groupID) }}{{ Math.abs(value) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { EXPENSE_CATEGORIES } from "~/utils/constants";

const groupID = useGroupID();
const { expense } = defineProps(["expense"]);

const CATEGORY_BG_HEX = {
  rose: "#f43f5e1a", sky: "#0ea5e91a", amber: "#f59e0b1a", violet: "#8b5cf61a",
  emerald: "#10b9811a", pink: "#ec48991a", indigo: "#6366f11a", orange: "#f973161a",
  teal: "#14b8a61a", lime: "#84cc161a", gray: "#6b72801a",
};
const CATEGORY_TEXT_HEX = {
  rose: "#f43f5e", sky: "#0ea5e9", amber: "#f59e0b", violet: "#8b5cf6",
  emerald: "#10b981", pink: "#ec4899", indigo: "#6366f1", orange: "#f97316",
  teal: "#14b8a6", lime: "#84cc16", gray: "#6b7280",
};

const categoryData = computed(() =>
  EXPENSE_CATEGORIES.find((c) => c.id === expense.category),
);
const categoryLabel = computed(() => categoryData.value?.label || "");
const categoryIcon = computed(
  () => categoryData.value?.icon || "i-heroicons-ellipsis-horizontal",
);
const categoryBgStyle = computed(() => {
  const color = categoryData.value?.color || "gray";
  return {
    backgroundColor: CATEGORY_BG_HEX[color] || "#6b72801a",
    color: CATEGORY_TEXT_HEX[color] || "#6b7280",
  };
});

const myID = computed(() => {
  const { myID } = useGroups().getGroupByID(groupID);
  return myID;
});
const value = computed(() => {
  const computedExpense = computeTransaction(expense);
  return round(
    (computedExpense.payers[myID.value] || 0) -
      (computedExpense.splits[myID.value] || 0),
  );
});
</script>
