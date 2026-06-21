<template>
  <div class="space-y-1.5">
    <div class="flex items-center gap-3 px-1">
      <span class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ group.month }}</span>
      <div class="flex-grow h-px bg-gray-100 dark:bg-gray-800" />
    </div>

    <!-- Expenses -->
    <div v-if="group.expenses.length > 0" class="space-y-1.5">
      <div class="flex items-center gap-2 px-1">
        <span class="text-xs font-medium text-gray-400 dark:text-gray-500">Expenses</span>
        <div class="flex-grow h-px bg-gray-100 dark:bg-gray-800/50" />
      </div>
      <ExpenseItem
        :expense="expense"
        v-for="expense in group.expenses"
        @edit="$emit('edit', expense)"
      />
    </div>

    <!-- Payments -->
    <div v-if="group.payments.length > 0" class="space-y-1.5">
      <div class="flex items-center gap-2 px-1">
        <span class="text-xs font-medium text-gray-400 dark:text-gray-500">Payments</span>
        <div class="flex-grow h-px bg-gray-100 dark:bg-gray-800/50" />
      </div>
      <ExpenseItem
        :expense="payment"
        v-for="payment in group.payments"
        @edit="$emit('edit', payment)"
      />
    </div>
  </div>
</template>

<script setup>
const { group } = defineProps(["group"]);
</script>
