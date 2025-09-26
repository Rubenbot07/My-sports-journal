import { useState } from "react"
import { Link } from "react-router-dom";
import { renameFile } from "@/utils/renameFile";
import { getRequiredSizes } from "@/utils/requiredSizes";
import { useArticleImages } from "@/hooks/useArticleImages";
import { ArticleHeroBanner } from "@/components/articles/ArticleHeroBanner";
import { CircleCheck, CircleX, ListCheck } from "lucide-react";
export const UploadArticleImagesFrom = ({articleId, articleSlug, category}) => {
    const [errors, setErrors] = useState({});
    const [files, setFiles] = useState({});
    const { loading, uploadStoreImages } = useArticleImages();
    const inputs = [
      {
        name: "thumbnail",
        title: "Thumbnail Image (400x225)"
      },
      {
        name: "cover",
        title: "Cover Image (1200x675)"
      },
      {
        name: "banner",
        title: "Banner Image (1920x1080)"
      }
    ]


    const handleFileChange = (e, inputName) => {
        const file = e.target.files[0];
        let renamedFile = null;
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
          
          const isValid = getRequiredSizes(inputName, setErrors, e, img);
          if (!isValid) return;
          renamedFile = renameFile(file, inputName);
          setFiles((prev) => ({ ...prev, [inputName]: renamedFile }));
          URL.revokeObjectURL(img.src);
          console.log(img.width, img.height, inputName);
          uploadStoreImages(articleSlug, renamedFile, category, articleId, img.width, img.height, inputName);
        };
      };

      console.log(Object.keys(files).length);

    return (
      
    <section>
        <ArticleHeroBanner title={'Upload Article Images'} />
        <form className="flex flex-col gap-8 py-8">
          {
            inputs.map((input) => (
              <div key={input.name} className="flex flex-col gap-3">
                <div className="flex justify-center w-1/2 mx-auto gap-2 items-center">                  
                  <input
                    className="hidden"
                    type="file"
                    id={input.name}
                    accept="image/webp"
                    disabled={loading}
                    onChange={(e) => handleFileChange(e, input.name)}
                  />
                  <label className="bg-primary text-white px-4 py-2 w-1/2 min-w-72 rounded-full flex justify-between" htmlFor={input.name}>
                    {input.title}
                    {files[input.name] && (
                      <CircleCheck className="text-white" size={25} />
                    )}
                  </label>
                </div>
                {errors[input.name] && 
                <div className="text-primary text-sm flex items-center justify-center gap-2">
                    <CircleX size={25} />
                    <p>
                      {errors[input.name]}
                    </p>
                </div>}
              </div>
            ))
          }
          {
            Object.keys(files).length >= 3 && (
              <>
                <div className="text-primary text-sm flex items-center justify-center gap-2">
                  <p>All images have been uploaded</p>
                  <ListCheck size={30} />
                </div>
                <Link to={'/'} className="bg-primary text-white px-4 py-2 w-1/2 min-w-72 rounded-full mx-auto ">
                  Finish Upload
                </Link>
              </>
            )
          }
        </form>
    </section>
    )
}