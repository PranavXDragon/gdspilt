export default defineNuxtPlugin({
  hooks: {
    async "app:beforeMount"() {
      try {
        useName().value = localStorage.getItem("peersplit.name");
        await dbInit();
        await updateGroups();

        // Auto-create a default group if none exists
        const groupsStore = useGroups();
        const groupIDs = Object.keys(groupsStore.groups);
        if (groupIDs.length === 0) {
          const id = await createGroup("Data Scientist", "₹");
          groupsStore.setCurrentGroup(id);
        } else if (!groupsStore.currentGroup) {
          groupsStore.setCurrentGroup(groupIDs[0]);
        }
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    },
  },
});
