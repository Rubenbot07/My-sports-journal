import { useState } from "react"
import { renameFile } from "@/utils/renameFile";
import { getRequiredSizes } from "@/utils/requiredSizes";
import { useArticleImages } from "@/hooks/useArticleImages";
export const UploadArticleImagesFrom = ({articleId, articleSlug, category}) => {
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState({});
    const { loading, error, success, uploadStoreImages } = useArticleImages();
    const handleFileChange = (e, inputName) => {
        const file = e.target.files[0];
        let renamedFile = null;
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
        renamedFile = renameFile(file, inputName);
        setFiles((prev) => ({ ...prev, [inputName]: renamedFile }));
            
        getRequiredSizes(inputName, setErrors, e, img);


        URL.revokeObjectURL(img.src);
            console.log(errors)
            console.log(renamedFile)
            uploadStoreImages(articleSlug, renamedFile, category);
        };
        console.log(success)
    };

    return (

    <div>
        <h1>{articleSlug} = {articleId} = {category}</h1>
      <div>
        <label htmlFor="thumbnail">Thumbnail (400x225):</label>
        <input
          type="file"
          id="thumbnail"
          accept="image/webp"
          onChange={(e) => handleFileChange(e, "thumbnail")}
        />
        {errors.thumbnail && <p style={{ color: "red" }}>{errors.thumbnail}</p>}
      </div>

      <div>
        <label htmlFor="cover" >Cover (1200x675):</label>
        <input
          type="file"
          id="cover"
          accept="image/webp"
          onChange={(e) => handleFileChange(e, "cover")}
        />
        {errors.cover && <p style={{ color: "red" }}>{errors.cover}</p>}
      </div>

      <div>
        <label>Banner (1920x1080):</label>
        <input
          type="file"
          accept="image/webp"
          onChange={(e) => handleFileChange(e, "banner")}
        />
        {errors.banner && <p style={{ color: "red" }}>{errors.banner}</p>}
      </div>
    </div>
    )
}