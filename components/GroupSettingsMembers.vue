<template>
  <div class="space-y-2">
    <div>
      <UFormGroup label="Add Member">
        <div class="flex w-full gap-2">
          <UInput
            class="flex-grow"
            v-model="name"
            placeholder="New member name"
          />
          <UButton variant="outline" @click="add" :disabled="name.length === 0"
            >Add</UButton
          >
        </div>
      </UFormGroup>
    </div>
    <div>
      <div class="flex gap-2 items-center">
        <span class="font-medium py-1 block">Members </span>
        <div v-if="myID && !assigning">
          <UButton @click="assigning = true" variant="link" class="p-0"
            >Assign</UButton
          >
        </div>
        <div v-if="myID && assigning">
          <UButton @click="assigning = false" variant="link" class="p-0"
            >Cancel</UButton
          >
        </div>
      </div>
      <div v-for="member in members">
        <div class="flex gap-2 items-center">
          <span
            :class="[
              'font-light text-primary-700 dark:text-primary-300',
              member.id === myID && 'font-medium',
            ]"
          >
            {{ member.name }}
            {{ member.id === myID ? " (You)" : "" }}
          </span>
          <div class="flex-1" />
          <UButton
            variant="link"
            class="p-0"
            v-if="(!myID || assigning) && myID !== member.id"
            @click="assign(member.id)"
            >That's me!</UButton
          >
          <UButton
            v-if="member.id !== myID"
            variant="link"
            color="red"
            class="p-0"
            icon="i-heroicons-trash"
            @click="remove(member.id)"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { nanoid } from "nanoid";
const groupID = useGroupID();
const assigning = ref(false);
const members = computed(() => useGroups().getMembersList(groupID));
const myID = computed(() => {
  const { myID } = useGroups().getGroupByID(groupID);
  return myID;
});
const name = ref("");
function add() {
  useGroups().addMember(groupID, { id: nanoid(), name: name.value });
  name.value = "";
}
function assign(id) {
  assigning.value = false;
  useGroups().assignMember(groupID, id);
}
function remove(id) {
  const member = members.value.find((m) => m.id === id);
  if (member && confirm(`Remove "${member.name}" from this group?`)) {
    useGroups().deleteMember(groupID, id);
  }
}
</script>
