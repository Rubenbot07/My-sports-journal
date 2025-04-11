export const EditCommentForm = ({ handlerFunction, comment}) => {
    return (
        <form
            onSubmit={(e) => handlerFunction(e)}
            className="flex flex-col gap-2"
        >
            <input
                className="border border-gray-400 rounded-xl p-2"
                type="text"
                defaultValue={comment}
            />    
            <button
                type="submit"
                className="bg-primary text-white p-1 rounded-lg w-full max-w-40 mx-auto"
            >
                Update
            </button>
        </form>
    )
}