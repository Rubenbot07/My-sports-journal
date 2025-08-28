import { supabase } from "@/supabaseClient.js"

export const logOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw new Error(error.message)
    }
}