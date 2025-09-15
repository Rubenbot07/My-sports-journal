import { useState } from "react";
import imageCompression from "browser-image-compression";
import { getImgPublicUrl } from "@/services/photoService";
import { uploadPhoto, removePhoto } from "@/services/photoService";
import { updateProfileImage, updateImageInternalPath } from "@/services/profileService";
import { useUserStore } from "@/stores/userStore";

export function useUploadImage(bucketName = "profile-images") {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setUser = useUserStore((s) => s.setUser);
  const uploadImage = async (file, userId, oldPath) => {
    try {
      setLoading(true);
      setError(null);
      setUrl(null);

      // Validar tipo
      if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed");
      }

      // Opciones de compresión
      const options = {
        fileType: "image/webp", 
        maxSizeMB: 1,           
        maxWidthOrHeight: 1200, 
        useWebWorker: true,     // improve performance
      };

      // convert and compress
      const compressedFile = await imageCompression(file, options);

      // single name
      const fileName = `${Date.now()}.webp`;

      // upload
      const { error: uploadError } = await uploadPhoto(compressedFile, bucketName, fileName);

      if (uploadError) throw uploadError;


      // get public url
      const { data, error: getError } = await getImgPublicUrl(
        bucketName,
        fileName
      );
      setUrl(data);

      if(data.publicUrl) {
        const { data: updateData, error: updateError } = await updateProfileImage({user_id: userId, image: data.publicUrl});
        if (updateError) throw updateError;
        if(!updateData) return;
        setUser(updateData);
      }
      if (getError) throw getError;
      
      const {error: updatePathError} = await updateImageInternalPath({user_id: userId, internalPath: fileName});
      if (updatePathError) throw updatePathError;

      await removePhoto(bucketName, oldPath);

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, url, loading, error };
}