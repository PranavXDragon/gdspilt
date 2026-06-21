<template>
  <!-- Visual Balance Overview -->
  <div v-if="maxAbsBalance > 0" class="mb-4 space-y-2">
    <p class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Balance Overview</p>
    <div class="space-y-1.5">
      <div v-for="member in members" :key="member.id"
        class="flex items-center gap-2"
      >
        <span class="text-xs w-20 truncate shrink-0 text-gray-600 dark:text-gray-400">
          {{ useGroups().getMemberName(groupID, member.id) }}
        </span>
        <div class="flex-grow h-5 rounded-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
          <div
            v-if="balances[member.id]">
            <!-- Positive bar (from right) -->
            <div
              v-if="balances[member.id] > 0"
              class="absolute right-0 top-0 h-full rounded-full bg-emerald-400/60 dark:bg-emerald-500/40 transition-all duration-500"
              :style="{ width: (balances[member.id] / maxAbsBalance * 100) + '%' }"
            />
            <!-- Negative bar (from left) -->
            <div
              v-else
              class="absolute left-0 top-0 h-full rounded-full bg-amber-400/60 dark:bg-amber-500/40 transition-all duration-500"
              :style="{ width: (Math.abs(balances[member.id]) / maxAbsBalance * 100) + '%' }"
            />
          </div>
        </div>
        <span class="text-xs w-16 text-right shrink-0 tabular-nums"
          :class="balances[member.id] > 0 ? 'text-emerald-600 dark:text-emerald-400' : balances[member.id] < 0 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'"
        >
          {{ balances[member.id] > 0 ? '+' : '' }}{{ useGroups().getGroupCurrency(groupID) }}{{ balances[member.id] || 0 }}
        </span>
      </div>
    </div>
  </div>

  <UAccordion
    :items="
      members.map((member) => ({
        label: useGroups().getMemberName(groupID, member.id),
        name: useGroups().getMemberName(groupID, member.id),
        id: member.id,
      }))
    "
  >
    <template #item="{ item: member }">
      <span v-if="!balances[member.id]"
        >{{ member.name }} {{ member.name === "You" ? "are" : "is" }} settled up
        in this group.</span
      >
      <div v-else>
        <span class="flex items-center gap-2"
          >{{ member.name }}
          {{
            balances[member.id] > 0
              ? `${member.id === myID ? "are" : "is"} owed`
              : `${member.id === myID ? "owe" : "owes"}`
          }}
          <span
            :class="[
              'text-lg',
              balances[member.id] > 0 ? 'color-positive' : 'color-negative',
            ]"
            >{{ useGroups().getGroupCurrency(groupID)
            }}{{ Math.abs(balances[member.id]) }}</span
          ></span
        >
        <div>
          <span
            v-for="payment in payments[member.id]"
            class="flex items-center gap-1 text-sm"
            >- {{ useGroups().getMemberName(groupID, payment.from) }}
            {{ payment.from === myID ? "owe" : "owes" }}
            {{ useGroups().getMemberName(groupID, payment.to, true) }}
            <span
              :class="[
                'text-md',
                balances[member.id] > 0 ? 'color-positive' : 'color-negative',
              ]"
              >{{ useGroups().getGroupCurrency(groupID)
              }}{{ payment.value }}</span
            ></span
          >
        </div>
      </div>
    </template>
  </UAccordion>
</template>

<script setup>
const groupID = useGroupID();
const { getGroupByID, getPaymentsByGroupID } = storeToRefs(useGroups());
const myID = computed(() => {
  const { myID } = getGroupByID.value(groupID);
  return myID;
});
const members = computed(() => useGroups().getMembersList(groupID));
const payments = computed(() => {
  const paymentsByUser = {};
  const payments = getPaymentsByGroupID.value(groupID);
  for (const payment of payments) {
    paymentsByUser[payment.from] ||= [];
    paymentsByUser[payment.from].push(payment);
    paymentsByUser[payment.to] ||= [];
    paymentsByUser[payment.to].push(payment);
  }
  return paymentsByUser;
});
const balances = computed(() => {
  const balancesByUser = {};
  const payments = getPaymentsByGroupID.value(groupID);
  for (const payment of payments) {
    balancesByUser[payment.from] ||= 0;
    balancesByUser[payment.from] = round(
      balancesByUser[payment.from] - payment.value,
    );
    balancesByUser[payment.to] ||= 0;
    balancesByUser[payment.to] = round(
      balancesByUser[payment.to] + payment.value,
    );
  }
  return balancesByUser;
});
const maxAbsBalance = computed(() => {
  return Math.max(...Object.values(balances.value).map(Math.abs), 1);
});
</script>
