// Track which groups need refreshing and debounce
const refreshQueues: Record<string, ReturnType<typeof setTimeout>> = {};

const queueGroupRefresh = (groupID: string) => {
  if (refreshQueues[groupID]) clearTimeout(refreshQueues[groupID]);
  refreshQueues[groupID] = setTimeout(() => {
    delete refreshQueues[groupID];
    updateGroup(groupID);
  }, 300);
};

const supabaseChannel = () => {
  const supabase = getSupabase();
  const channel = supabase.channel("peersplit-realtime");

  // Listen for changes on all 5 tables
  channel
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "members" },
      (payload: any) => {
        const gid = payload.new?.group_id || payload.old?.group_id;
        if (gid) queueGroupRefresh(gid);
      },
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "expenses" },
      (payload: any) => {
        const gid = payload.new?.group_id || payload.old?.group_id;
        if (gid) queueGroupRefresh(gid);
      },
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "payments" },
      (payload: any) => {
        const gid = payload.new?.group_id || payload.old?.group_id;
        if (gid) queueGroupRefresh(gid);
      },
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "activity" },
      (payload: any) => {
        const gid = payload.new?.group_id || payload.old?.group_id;
        if (gid) queueGroupRefresh(gid);
      },
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "groups" },
      (payload: any) => {
        const gid = payload.new?.id || payload.old?.id;
        if (gid) queueGroupRefresh(gid);
      },
    );

  channel.subscribe((status: string) => {
    if (status === "SUBSCRIBED") {
      console.info("Supabase real-time connected");
    }
  });

  return channel;
};

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

        // Start real-time subscriptions
        supabaseChannel();

        // Auto-assign "Pranav navghare" as default member if none assigned
        const autoAssignMember = async () => {
          const gs = useGroups();
          const gid = gs.currentGroup;
          if (!gid) return;
          const group = gs.getGroupByID(gid);
          if (!group || group.myID) return; // already assigned

          // Find a member named "Pranav navghare" (case-insensitive)
          const targetName = "Pranav navghare";
          const member = Object.values(group.members || {}).find(
            (m: any) => m.name?.toLowerCase() === targetName.toLowerCase(),
          );
          if (member) {
            await gs.assignMember(gid, member.id);
          }
        };
        await autoAssignMember();
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    },
  },
});


