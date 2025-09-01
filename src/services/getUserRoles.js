import { supabase } from "@/supabaseClient";

export const getUserRoles = async (userId) => {
  const { data, error } = await supabase
    .from("user_roles")
    .select(`
      role_id,
      roles ( id, name )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user roles:", error.message);
    throw new Error(error.message);
  }

  // Devuelves un array más limpio con los nombres de roles
  return data.map((item) => ({
    id: item.roles.id,
    name: item.roles.name,
  }));
};