<template>
  <UCard class="max-h-[85vh] overflow-y-auto">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-medium text-lg">Settlements</span>
        <UButton
          @click="$emit('close')"
          variant="ghost"
          color="gray"
          icon="i-heroicons-x-mark"
        />
      </div>
    </template>

    <div class="space-y-4">
      <!-- Your Balance Summary -->
      <div
        v-if="myID"
        class="p-4 rounded-xl border"
        :class="
          netBalance === 0
            ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30'
            : netBalance > 0
              ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30'
              : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30'
        "
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
              {{ netBalance === 0 ? "You're settled up" : netBalance > 0 ? "You are owed" : "You owe" }}
            </p>
            <p
              class="text-2xl font-bold mt-0.5"
              :class="
                netBalance === 0
                  ? 'text-green-600 dark:text-green-400'
                  : netBalance > 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
              "
            >
              {{ currency }}{{ Math.abs(netBalance) }}
            </p>
          </div>
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center"
            :class="
              netBalance === 0
                ? 'bg-green-100 dark:bg-green-900/30'
                : netBalance > 0
                  ? 'bg-emerald-100 dark:bg-emerald-900/30'
                  : 'bg-amber-100 dark:bg-amber-900/30'
            "
          >
            <UIcon
              :name="
                netBalance === 0
                  ? 'i-heroicons-check-circle'
                  : netBalance > 0
                    ? 'i-heroicons-arrow-down-circle'
                    : 'i-heroicons-arrow-up-circle'
              "
              class="w-7 h-7"
              :class="
                netBalance === 0
                  ? 'text-green-500'
                  : netBalance > 0
                    ? 'text-emerald-500'
                    : 'text-amber-500'
              "
            />
          </div>
        </div>

        <!-- You owe breakdown -->
        <div v-if="netBalance < 0" class="mt-3 space-y-1.5 pt-3 border-t border-amber-200/50 dark:border-amber-800/20">
          <p
            v-for="payment in paymentsInvolvingMe.filter((p) => p.from === myID)"
            class="flex items-center justify-between text-sm"
          >
            <span class="text-gray-600 dark:text-gray-400">
              You owe <span class="font-medium text-gray-800 dark:text-gray-200">{{ memberName(payment.to) }}</span>
            </span>
            <span class="font-semibold text-amber-600 dark:text-amber-400">
              {{ currency }}{{ payment.value }}
            </span>
          </p>
        </div>

        <!-- You are owed breakdown -->
        <div v-if="netBalance > 0" class="mt-3 space-y-1.5 pt-3 border-t border-emerald-200/50 dark:border-emerald-800/20">
          <p
            v-for="payment in paymentsInvolvingMe.filter((p) => p.to === myID)"
            class="flex items-center justify-between text-sm"
          >
            <span class="text-gray-600 dark:text-gray-400">
              <span class="font-medium text-gray-800 dark:text-gray-200">{{ memberName(payment.from) }}</span> owes you
            </span>
            <span class="font-semibold text-emerald-600 dark:text-emerald-400">
              {{ currency }}{{ payment.value }}
            </span>
          </p>
        </div>
      </div>

      <!-- All Settlements -->
      <div>
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Outstanding Debts
        </p>

        <div v-if="allPayments.length === 0" class="text-center py-8">
          <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500" />
          </div>
          <p class="text-gray-500 dark:text-gray-400 font-medium">All settled up!</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">No outstanding debts in this group.</p>
        </div>

        <div v-else class="space-y-2">
          <div
            v-for="(payment, index) in allPayments"
            :key="index"
            class="group p-3 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-primary-200 dark:hover:border-primary-700/50 transition-all duration-200"
            :class="{ 'ring-2 ring-primary-100 dark:ring-primary-900/30': involvesMe(payment) }"
          >
            <div class="flex items-center gap-3">
              <!-- Avatar placeholder -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                :class="payment.from === myID ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'"
              >
                {{ payment.from === myID ? 'U' : memberName(payment.from).charAt(0).toUpperCase() }}
              </div>

              <div class="flex-grow min-w-0">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200">
                  <span :class="{ 'font-bold': payment.from === myID }">
                    {{ payment.from === myID ? 'You' : memberName(payment.from) }}
                  </span>
                  <span class="text-gray-400 mx-1">→</span>
                  <span :class="{ 'font-bold': payment.to === myID }">
                    {{ payment.to === myID ? 'you' : memberName(payment.to) }}
                  </span>
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {{ payment.from === myID ? 'Owes' : memberName(payment.from) + ' owes' }}
                  {{ payment.to === myID ? 'you' : memberName(payment.to) }}
                </p>
              </div>

              <div class="text-right shrink-0">
                <p class="text-lg font-bold tabular-nums"
                  :class="payment.from === myID ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'"
                >
                  {{ currency }}{{ payment.value }}
                </p>
                <UButton
                  @click.stop="settle(payment)"
                  size="2xs"
                  color="primary"
                  variant="soft"
                  class="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  Settle Up
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const emit = defineEmits(["close", "settle"]);
const { groupID } = defineProps(["groupID"]);

const { getGroupByID, getPaymentsByGroupID, getBalancesByGroupID } =
  storeToRefs(useGroups());

const group = computed(() => getGroupByID.value(groupID));
const myID = computed(() => group.value?.myID);
const currency = computed(() => useGroups().getGroupCurrency(groupID));

const allPayments = computed(() => getPaymentsByGroupID.value(groupID) || []);

const paymentsInvolvingMe = computed(() =>
  allPayments.value.filter(
    (p) => p.from === myID.value || p.to === myID.value,
  ),
);

const netBalance = computed(() => {
  const balances = getBalancesByGroupID.value(groupID);
  return balances[myID.value] || 0;
});

function involvesMe(payment) {
  return payment.from === myID.value || payment.to === myID.value;
}

function memberName(id) {
  return useGroups().getMemberName(groupID, id);
}

function settle(payment) {
  // Emit to parent to open PaymentEditor pre-filled
  emit("settle", {
    from: payment.from,
    to: payment.to,
    value: payment.value,
  });
}
</script>
