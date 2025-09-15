import { supabase } from "@/supabaseClient";


export const uploadPhoto = async (file, bucketName, fileName) => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });
    if (error) {
        throw error;
    }
    return { data, error };
};




export const getImgPublicUrl = async (bucketName, fileName) => {
    const { data, error } = await supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName)
    if (error) {
        throw error;
    }
    return { data, error };
};

export const removePhoto = async (bucketName, filePath) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);

  if (error) throw error;

  return data; 
};