import ReactMarkdown from "react-markdown";

export function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: (props) => <h1 className="text-blue-500 text-2xl" {...props} />,
        h2: ( props) => <h2 className="text-black font-semibold text-xl" {...props} />,
        h3: ( props) => <h3 className="text-black font-semibold" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}