import { uploadArticleImage, createMediaArticle } from "@/services/articlesService"
import { getImgPublicUrl } from "@/services/photoService"
import { useState } from "react";
import imageCompression from "browser-image-compression";
export const useArticleImages = () => {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    let url = null;

    const uploadStoreImages = async (slug, file, category, articleId, width, height, role) => {

        try {
            setLoading(true);
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

            const data = await uploadArticleImage(slug, compressedFile, category);
            console.log(data);
            if (data) {
                const { data: publicData } = await getImgPublicUrl("article images", data.path);
                url = publicData.publicUrl;                
            }
            

            const { createdData, error } = await createMediaArticle({
                article_id: articleId,
                url: url,
                type: "image",
                role: role,
                width: width,
                height: height
            });

            if (error) throw error;
            if(!createdData) return;
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    }

    return {
        loading,
        success,
        uploadStoreImages
    }

}

