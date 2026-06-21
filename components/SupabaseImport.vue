<template>
  <UFormGroup
    :error="error ? error : null"
    label="Import from Supabase"
  >
    <!-- Loading / Importing state -->
    <UAlert
      v-if="loading || importing"
      :title="loading ? 'Fetching data...' : 'Importing...'"
      variant="soft"
      color="primary"
      :icon="loading || importing ? 'i-heroicons-arrow-path-20-solid' : 'i-heroicons-information-circle'"
      :ui="{ icon: { base: loading || importing ? 'animate-spin' : '' } }"
    />

    <!-- Input form (URL + key) -->
    <div v-else-if="!showConfirmation" class="space-y-2">
      <UInput
        v-model="supabaseUrl"
        type="url"
        size="sm"
        icon="i-heroicons-link"
        placeholder="Supabase URL (e.g. https://xxx.supabase.co)"
        :disabled="loading || importing"
      />
      <UInput
        v-model="anonKey"
        type="password"
        size="sm"
        icon="i-heroicons-key"
        placeholder="Supabase anon / service_role key"
        :disabled="loading || importing"
      />
      <UButton
        @click="fetchSupabaseData"
        :disabled="!supabaseUrl || !anonKey || loading || importing"
        color="primary"
        variant="soft"
        block
        size="sm"
        icon="i-heroicons-cloud-arrow-down"
      >
        Fetch Data
      </UButton>
    </div>

    <!-- Confirmation Alert -->
    <UAlert
      v-if="showConfirmation"
      :actions="[
        {
          variant: 'solid',
          color: 'primary',
          label: 'Confirm Import',
          onClick: confirmImport,
        },
        {
          variant: 'outline',
          color: 'primary',
          label: 'Cancel',
          onClick: cancelImport,
        },
      ]"
      title="Confirm Import"
      icon="i-heroicons-information-circle"
    >
      <template #description>
        You are about to import
        <span class="font-medium">{{ membersCount }}</span> members,
        <span class="font-medium">{{ expensesCount }}</span> expenses, and
        <span class="font-medium">{{ paymentsCount }}</span> payments.
        Proceed?
      </template>
    </UAlert>
  </UFormGroup>
</template>

<script setup>
const supabaseUrl = ref(""),
  anonKey = ref(""),
  loading = ref(false),
  importing = ref(false),
  error = ref(null),
  members = ref([]),
  expenses = ref([]),
  payments = ref([]),
  showConfirmation = ref(false),
  membersCount = ref(0),
  expensesCount = ref(0),
  paymentsCount = ref(0);

const fetchSupabaseData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const headers = {
      apikey: anonKey.value,
      Authorization: `Bearer ${anonKey.value}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let baseUrl = supabaseUrl.value.replace(/\/+$/, "");
    // Ensure the Supabase REST API path is included
    if (!baseUrl.includes("/rest/v1")) {
      baseUrl += "/rest/v1";
    }

    const limit = 5000; // safety limit to prevent fetching too many rows

    // Fetch all three tables in parallel
    const [membersRes, expensesRes, paymentsRes] = await Promise.all([
      fetch(`${baseUrl}/members?select=*&order=name.asc&limit=${limit}`, { headers }),
      fetch(`${baseUrl}/expenses?select=*&order=date.asc&limit=${limit}`, { headers }),
      fetch(`${baseUrl}/payments?select=*&order=date.asc&limit=${limit}`, { headers }),
    ]);

    if (!membersRes.ok)
      throw new Error(
        `Failed to fetch members: ${membersRes.status} ${membersRes.statusText}`,
      );
    if (!expensesRes.ok)
      throw new Error(
        `Failed to fetch expenses: ${expensesRes.status} ${expensesRes.statusText}`,
      );
    if (!paymentsRes.ok)
      throw new Error(
        `Failed to fetch payments: ${paymentsRes.status} ${paymentsRes.statusText}`,
      );

    members.value = await membersRes.json();
    expenses.value = await expensesRes.json();
    payments.value = await paymentsRes.json();

    membersCount.value = members.value.length;
    expensesCount.value = expenses.value.length;
    paymentsCount.value = payments.value.length;

    if (membersCount.value === 0) {
      error.value = "No members found in Supabase.";
      loading.value = false;
      return;
    }

    showConfirmation.value = true;
  } catch (err) {
    error.value = err.message || "Failed to connect to Supabase. Check your URL and key.";
  }

  loading.value = false;
};

const confirmImport = async () => {
  showConfirmation.value = false;
  importing.value = true;
  try {
    const groupID = useGroupID();
    await importSupabase(
      groupID,
      useGroups().getGroupByID(groupID).myID,
      members.value,
      expenses.value,
      payments.value,
    );
    error.value = null;
  } catch (err) {
    error.value = "Something went wrong during import.";
  }
  importing.value = false;
};

const cancelImport = () => {
  showConfirmation.value = false;
  members.value = [];
  expenses.value = [];
  payments.value = [];
};
</script>
