import { supabase } from "@/supabaseClient";

export const getProfile = async (email) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}