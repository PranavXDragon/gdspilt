<template>
  <div class="px-4 py-2 flex flex-col h-full">
    <div class="space-y-3 flex-grow">
      <!-- Net Worth Summary -->
      <div class="p-4 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-gradient-to-br from-primary-50/50 via-transparent to-emerald-50/30 dark:from-primary-950/10 dark:via-transparent dark:to-emerald-950/10">
        <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Net Worth Across All Groups
        </p>
        <div class="grid grid-cols-3 gap-3">
          <div class="text-center">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Owed to you</p>
            <p class="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {{ netWorth.owedToMe }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">You owe</p>
            <p class="text-lg font-bold text-amber-600 dark:text-amber-400">
              {{ netWorth.iOwe }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Net</p>
            <p class="text-lg font-bold"
              :class="netWorth.net >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'"
            >
              {{ Math.abs(netWorth.net) }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div class="flex items-center gap-1.5 text-xs text-gray-400">
            <UIcon name="i-heroicons-user-group" class="w-3.5 h-3.5" />
            <span>{{ netWorth.groupCount }} group{{ netWorth.groupCount !== 1 ? 's' : '' }}</span>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-gray-400">
            <UIcon name="i-heroicons-receipt-percent" class="w-3.5 h-3.5" />
            <span>{{ netWorth.txCount }} transaction{{ netWorth.txCount !== 1 ? 's' : '' }}</span>
          </div>
        </div>
      </div>

      <SettingsName />
      <UFormGroup label="Color Mode">
        <DarkModeSwitch />
      </UFormGroup>
      <UAccordion :items="[{ label: 'Danger Zone', color: 'red' }]">
        <template #item>
          <UFormGroup label="Clear All Data">
            <UButton
              @click="confirmClear = true"
              label="Clear All Data"
              color="red"
              block
            />
          </UFormGroup>
        </template>
      </UAccordion>
    </div>

  </div>
  <UModal v-model="confirmClear">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="font-medium">Permanently Delete All Data</span>
          <UButton
            @click="confirmClear = false"
            variant="ghost"
            color="gray"
            icon="i-heroicons-x-mark"
          />
        </div>
      </template>
      <div class="space-y-3">
        <UAlert
          description="This will erase all your groups and transactions. This action cannot be undone."
          color="red"
          variant="subtle"
          icon="i-heroicons-exclamation-triangle"
        />
        <div class="flex gap-2">
          <UButton
            @click="del"
            color="rose"
            variant="outline"
            :loading="clearing"
            >Yes, delete everything</UButton
          >
          <UButton @click="confirmClear = false" variant="ghost"
            >Cancel</UButton
          >
        </div>
      </div>
    </UCard>
  </UModal>
</template>
<script setup>
const confirmClear = ref(false),
  clearing = ref(false);

const { groupsList } = storeToRefs(useGroups());

const netWorth = computed(() => {
  let owedToMe = 0;
  let iOwe = 0;
  let groupCount = 0;
  let txCount = 0;

  for (const group of groupsList.value) {
    if (!group.myID) continue;
    groupCount++;
    const balances = groupGetBalances(group);
    const myBalance = balances[group.myID] || 0;
    if (myBalance > 0) owedToMe += myBalance;
    else iOwe += Math.abs(myBalance);
    txCount += Object.keys(group.transactions || {}).length;
  }

  return {
    owedToMe: round(owedToMe),
    iOwe: round(iOwe),
    net: round(owedToMe - iOwe),
    groupCount,
    txCount,
  };
});

async function del() {
  clearing.value = true;
  await wipeData();
  window.location.reload();
}
</script>
