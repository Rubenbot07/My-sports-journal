import { uploadArticleImage } from "@/services/articlesService"
import { useState } from "react";
import imageCompression from "browser-image-compression";
export const useArticleImages = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const uploadStoreImages = async (slug, file, category) => {

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);

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

            const { data } = await uploadArticleImage(slug, compressedFile, category);
            console.log(data);
            setSuccess(data);
        } catch (err) {
            console.error(err);
        }
    }

    return {
        loading,
        error,
        success,
        uploadStoreImages
    }

}

