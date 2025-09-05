import { Forward } from "lucide-react";
export const ShareButton = () => {
    return (
        <div className="flex items-center">
            <button
                // onClick={handleClick}
                // disabled={loading}
                className=" hover:text-red-800 text-gray-400 py-2 px-4 rounded mr-2"
            >
                <Forward />
            </button>
        </div>
    );
}