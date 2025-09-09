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

export async function createRole(roleId = 2, userId) {
    try {
        const { data, error } = await supabase
            .from('user_roles')
            .insert([{ role_id: roleId, user_id: userId }])
            .select();

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
   
}