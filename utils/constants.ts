export const splitTypes = [
  "Split Equally",
  "Split by Amount",
  "Split by Percentages",
  "Split by Shares",
].map((x, i) => ({ id: i + 1, name: x }));

export const EXPENSE_CATEGORIES = [
  { id: "food", label: "Food & Drinks", icon: "i-heroicons-shopping-bag", color: "rose" },
  { id: "transport", label: "Transport", icon: "i-heroicons-truck", color: "sky" },
  { id: "utilities", label: "Utilities", icon: "i-heroicons-home", color: "amber" },
  { id: "entertainment", label: "Entertainment", icon: "i-heroicons-ticket", color: "violet" },
  { id: "shopping", label: "Shopping", icon: "i-heroicons-archive-box", color: "emerald" },
  { id: "health", label: "Health", icon: "i-heroicons-heart", color: "pink" },
  { id: "education", label: "Education", icon: "i-heroicons-academic-cap", color: "indigo" },
  { id: "bills", label: "Bills & Fees", icon: "i-heroicons-document-text", color: "orange" },
  { id: "travel", label: "Travel", icon: "i-heroicons-globe-alt", color: "teal" },
  { id: "groceries", label: "Groceries", icon: "i-heroicons-shopping-cart", color: "lime" },
  { id: "other", label: "Other", icon: "i-heroicons-ellipsis-horizontal", color: "gray" },
];
