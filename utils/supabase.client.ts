import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.NUXT_PUBLIC_SUPABASE_URL || "https://exywmwjsqlotgxwtwvum.supabase.co";
const supabaseAnonKey = import.meta.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eXdtd2pzcWxvdGd4d3R3dnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzMyODksImV4cCI6MjA3OTMwOTI4OX0.RF2I4cTH0tfn4AAMYF0-dC5OnlHF__4F5NJ018kC6VY";

let client: ReturnType<typeof createClient> | null = null;

export const getSupabase = () => {
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
};

/** Build a member name → ID lookup map from a members array */
export const buildMemberNameToId = (members: Record<string, { id: string; name: string }>) => {
  const map: Record<string, string> = {};
  for (const member of Object.values(members)) {
    if (member.name) map[member.name.toLowerCase()] = member.id;
  }
  return map;
};

/** Build a member ID → name lookup map */
export const buildMemberIdToName = (members: Record<string, { id: string; name: string }>) => {
  const map: Record<string, string> = {};
  for (const member of Object.values(members)) {
    map[member.id] = member.name;
  }
  return map;
};
