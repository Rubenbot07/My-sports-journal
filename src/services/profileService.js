import { supabase } from "@/supabaseClient";

export const getProfile = async (email) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function createProfile({ username, email, authId }) {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .insert([
                { auth_uid: authId, display_name: username, email: email }
            ])
            .select()
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error("Error creating profile:", error);
        throw error;
    }

}     

export async function updateProfile({ user_id, display_name, bio }) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ display_name, bio })
      .eq("id", user_id)   // 👈 filtro por la PK o user_id
      .select()
      .single();           // 👈 asegura que devuelve 1 fila

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}