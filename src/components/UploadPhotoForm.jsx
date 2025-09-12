import { ImageUp } from "lucide-react"
import { useUploadImage } from "@/hooks/useUploadPhoto";

export const UploadPhotoForm = ({ userId }) => {
    const { uploadImage, url, loading, error } = useUploadImage('profile-images');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
        await uploadImage(file, userId);
    }
}

    return (
        <section className="flex flex-col justify-center items-center w-full h-full gap-4">
            
            {!url && (
                <>
                    <ImageUp size={120} color="gray"/>
                    <input 
                        onChange={handleFileChange}
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        className="hidden"/>
                        <label className="bg-primary text-white px-4 py-2 rounded-full" htmlFor="fileInput">Upload Image</label>
                </>
            )}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {url && 
                <>
                    <p>Image uploaded successfully</p>
                    <img src={url.publicUrl} alt="Uploaded" />
                </>
            }
        </section>
    )
}