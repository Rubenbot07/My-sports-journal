import { supabase } from "@/supabaseClient";

export async function createProfile({ username, email, authId }) {
    console.log("Creating profile:", username, email, authId)
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