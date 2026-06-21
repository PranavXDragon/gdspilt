<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <span class="font-medium"
          >{{ expenseItem ? "Update" : "Add" }} Expense</span
        >
        <UButton
          @click="$emit('close')"
          variant="ghost"
          color="gray"
          icon="i-heroicons-x-mark"
        />
      </div>
    </template>
    <div class="space-y-2">
      <UFormGroup label="Description">
        <UInput v-model="expense.description" placeholder="ex: Groceries" />
      </UFormGroup>
      <UFormGroup label="Date">
        <UInput v-model="expenseDate" type="date" />
      </UFormGroup>
      <UFormGroup label="Category">
        <USelectMenu
          v-model="expense.category"
          :options="EXPENSE_CATEGORIES"
          value-attribute="id"
          option-attribute="label"
          placeholder="Select category"
        >
          <template #option="{ option: cat }">
            <div class="flex items-center gap-2">
              <span
                class="w-2 h-2 rounded-full"
                :style="{ backgroundColor: CATEGORY_COLOR_HEX[cat.color] || '#6b7280' }"
              />
              <span>{{ cat.label }}</span>
            </div>
          </template>
          <template #label>
            <div v-if="expense.category" class="flex items-center gap-2">
              <span
                class="w-2 h-2 rounded-full"
                :style="{ backgroundColor: CATEGORY_COLOR_HEX[getCategoryColor(expense.category)] || '#6b7280' }"
              />
              <span>{{ getCategoryLabel(expense.category) }}</span>
            </div>
            <span v-else>Select category</span>
          </template>
        </USelectMenu>
      </UFormGroup>
      <UFormGroup>
        <template #label>
          <span>Paid By</span
          ><span class="font-normal color-positive" v-if="paid !== 0">
            &middot; {{ paid }}</span
          >
        </template>
        <MemberValueEdit
          :members="members"
          addLabel="Add Payers"
          v-model="expense.payers"
        />
      </UFormGroup>
      <UFormGroup label="Split Type">
        <USelectMenu
          v-model="expense.splitType"
          value-attribute="id"
          option-attribute="name"
          placeholder="Select split type"
          :options="splitTypes"
        />
      </UFormGroup>
      <UFormGroup>
        <template #label>
          <span>Split Between</span
          ><span class="font-normal color-negative" v-if="remaining !== 0">
            &middot; {{ remaining }} remaining</span
          >
          <span
            class="font-normal color-neutral"
            v-if="expense.splitType === 4"
          >
            &middot; {{ split }} total shares</span
          >
        </template>
        <MemberValueEdit
          v-model="expense.splitters"
          :members="members"
          addLabel="Add Members"
          :noValues="expense.splitType === 1"
        />
      </UFormGroup>
      <UFormGroup>
        <UCheckbox v-model="saveAsDefaultSplit" label="Save as default split" />
      </UFormGroup>
    </div>
    <template #footer>
      <div class="flex gap-2">
        <UButton
          @click="onSubmit"
          :loading="adding"
          variant="outline"
          :disabled="
            Object.keys(expense.splitters).length === 0 ||
            (expense.splitType === 4 && split === 0) ||
            paid === 0 ||
            !expense.description ||
            remaining !== 0
          "
          >{{ expenseItem ? "Update" : "Add" }} Expense</UButton
        >
        <UButton
          v-if="expenseItem"
          @click="$emit('delete', expense)"
          variant="ghost"
          color="rose"
          >Delete</UButton
        >
      </div>
    </template>
  </UCard>
</template>

<script setup>
import moment from "moment";
import { nanoid } from "nanoid";
import { EXPENSE_CATEGORIES } from "~/utils/constants";

const getCategoryColor = (id) => {
  const cat = EXPENSE_CATEGORIES.find((c) => c.id === id);
  return cat?.color || "gray";
};
const getCategoryLabel = (id) => {
  const cat = EXPENSE_CATEGORIES.find((c) => c.id === id);
  return cat?.label || "Other";
};

const CATEGORY_COLOR_HEX = {
  rose: "#f43f5e", sky: "#0ea5e9", amber: "#f59e0b", violet: "#8b5cf6",
  emerald: "#10b981", pink: "#ec4899", indigo: "#6366f1", orange: "#f97316",
  teal: "#14b8a6", lime: "#84cc16", gray: "#6b7280",
};

const emit = defineEmits(["update", "add"]);

const groupID = useGroupID();

const getDefaultSplit = () => {
  const json = localStorage.getItem(`peersplit.${groupID}.defaultSplit`);
  if (json) {
    return JSON.parse(json);
  }
  return { splitters: {}, splitType: 1 };
};

const onSubmit = () => {
  if (saveAsDefaultSplit.value) {
    localStorage.setItem(
      `peersplit.${groupID}.defaultSplit`,
      JSON.stringify({
        splitters: expense.value.splitters,
        splitType: expense.value.splitType,
      }),
    );
  }
  emit(expenseItem ? "update" : "add", expense.value);
};

const getDefaultExpense = () => {
  const e = {
    id: nanoid(),
    type: "expense",
    description: "",
    created_at: new Date().toISOString(),
    ...getDefaultSplit(),
  };
  const myID = useGroups().getGroupByID(groupID)?.myID;
  e.payers = myID ? { [myID]: "" } : {};
  return e;
};

const expenseDate = computed({
  get: () =>
    expense.value.created_at
      ? moment.utc(expense.value.created_at).format("YYYY-MM-DD")
      : moment.utc().format("YYYY-MM-DD"),
  set: (val) => {
    expense.value.created_at = moment.utc(val).startOf("day").toISOString();
  },
});

const { expenseItem } = defineProps(["expenseItem"]);
const expense = ref(
  expenseItem ? JSON.parse(JSON.stringify(expenseItem)) : getDefaultExpense(),
);
const saveAsDefaultSplit = ref(false);
const paid = computed(() =>
  Object.values(expense.value.payers).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0,
  ),
);
const split = computed(() =>
  Object.values(expense.value.splitters).reduce(
    (a, b) => round(Number(a) + Number(b)),
    0,
  ),
);
const remaining = computed(() => {
  if (expense.value.splitType === 4 || expense.value.splitType === 1) return 0; // shares or split equally
  const total = expense.value.splitType === 2 ? paid.value : 100;
  return round(total - split.value);
});
const adding = ref(false);
const members = computed(() => useGroups().getMembersList(groupID));
</script>
