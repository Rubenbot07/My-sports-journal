import { supabase } from "@/supabaseClient.js";
export const getMostBookmarkedArticles = async (limit = 10) => {
  const { data, error } = await supabase
    .rpc("most_bookmarked_articles", { limit_count: limit });

  if (error) throw error;
  return data;
};