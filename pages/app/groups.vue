<template>
  <!-- No group exists yet — show first-time setup -->
  <div v-if="!loading && groupsList.length === 0" class="flex flex-col items-center justify-center h-full px-6 text-center">
    <div class="w-20 h-20 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-6">
      <UIcon name="i-heroicons-users" class="w-10 h-10 text-primary-400 dark:text-primary-500" />
    </div>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Your Group</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
      Set up your group to start tracking and splitting expenses.
    </p>
    <UCard class="w-full max-w-sm">
      <div class="space-y-4">
        <UFormGroup label="Group Name">
          <UInput v-model="newGroupName" placeholder="e.g., Roommates, Trip to Paris" />
        </UFormGroup>
        <UFormGroup label="Currency Symbol">
          <UInput v-model="newGroupCurrency" placeholder="₹" maxlength="3" class="w-20" />
        </UFormGroup>
        <UAlert
          v-if="!userName"
          variant="soft"
          color="primary"
          icon="i-heroicons-information-circle"
          description="You can set your name in Settings so group members can identify you."
        />
        <UButton
          @click="createFirstGroup"
          :disabled="!newGroupName.trim()"
          :loading="creating"
          color="primary"
          block
          size="lg"
        >
          Create Group
        </UButton>
      </div>
    </UCard>
  </div>

  <!-- Group exists — show it directly -->
  <Group v-else-if="!loading && selectedGroup" />

  <!-- Loading -->
  <SpinLoader v-else-if="loading" height="h-full" />
</template>

<script setup>
import { nanoid } from "nanoid";

const { groupsList, loading } = storeToRefs(useGroups());

const userName = computed(() => useName().value || "");
const newGroupName = ref("");
const newGroupCurrency = ref("₹");
const creating = ref(false);

// Auto-select the first (and only) group when groups load
onMounted(() => {
  autoSelectGroup();
});
watch(groupsList, () => {
  autoSelectGroup();
});

function autoSelectGroup() {
  if (groupsList.value.length > 0) {
    useGroups().setCurrentGroup(groupsList.value[0].id);
  }
}

const selectedGroup = computed(() => {
  if (groupsList.value.length > 0) {
    return groupsList.value[0];
  }
  return null;
});

async function createFirstGroup() {
  if (!newGroupName.value.trim()) return;
  creating.value = true;
  try {
    const id = nanoid();
    await createEmptyGroup(id);
    await updateGroup(id);
    await useGroups().setGroupName(id, newGroupName.value.trim());
    if (newGroupCurrency.value && newGroupCurrency.value !== "₹") {
      await useGroups().setGroupCurrency(id, newGroupCurrency.value);
    }
    // Assign the current user as a member
    const memberID = nanoid();
    await useGroups().addMember(id, { id: memberID, name: userName.value || "Me", siteID: null });
    await useGroups().assignMember(id, memberID);
  } catch (e) {
    console.error("Failed to create group:", e);
  } finally {
    creating.value = false;
  }
}
</script>
