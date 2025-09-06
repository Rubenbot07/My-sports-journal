import { supabase } from "@/supabaseClient";

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