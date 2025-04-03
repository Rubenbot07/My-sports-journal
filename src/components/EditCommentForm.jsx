export const EditCommentForm = ({ handlerFunction, comment}) => {
    return (
        <form
            onSubmit={(e) => handlerFunction(e)}
            className="flex flex-col gap-2"
        >
            <input
                className="border border-blue-600 rounded-xl p-2"
                type="text"
                defaultValue={comment}
            />    
            <button
                type="submit"
                className="bg-blue-500 text-white p-1 rounded-lg w-40 mx-auto"
            >
                Update
            </button>
        </form>
    )
}