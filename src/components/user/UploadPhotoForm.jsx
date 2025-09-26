import { ImageUp } from "lucide-react"
import { useUploadImage } from "@/hooks/useUploadPhoto";

export const UploadPhotoForm = ({ userId, oldPath }) => {
    const { uploadImage, url, loading, error } = useUploadImage('profile-images');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            await uploadImage(file, userId, oldPath);
        }
    };

    return (
        <section className="flex flex-col justify-center items-center w-full h-full gap-4">
            {!url && (
                <>
                    <ImageUp size={120} color="gray" />
                    <input 
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        className="sr-only"
                    />
                    <label 
                        htmlFor="fileInput"
                        className="bg-primary text-white px-4 py-2 rounded-full cursor-pointer"
                    >
                        Upload Image
                    </label>
                </>
            )}

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {url && (
                <>
                    <p className="text-green-600">Image uploaded successfully</p>
                    <img src={url.publicUrl} alt="Uploaded" className="rounded-lg max-w-full h-auto" />
                </>
            )}
        </section>
    );
};