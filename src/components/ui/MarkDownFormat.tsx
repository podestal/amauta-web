import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

interface Props {
    content: string
}

const MarkDownFormat = ({ content }: Props) => {
  return (
    <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      h2: ({ node, ...props }) => (
        <h2 className="mt-10 mb-4 text-2xl font-bold flex items-center gap-2 text-bule-700 dark:text-blue-300">
          <span {...props} />
        </h2>
      ),
      h3: ({ node, ...props }) => (
        <h3 className="mt-6 mb-2 text-xl font-semibold text-gray-800 dark:text-slate-100" {...props} />
      ),
      ul: ({ node, ...props }) => (
        <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 dark:text-slate-100" {...props} />
      ),
      ol: ({ node, ...props }) => (
        <ol className="list-decimal space-y-2 ml-4 text-gray-700 dark:text-slate-100" {...props} />
      ),
      li: ({ node, ...props }) => (
        <li className="text-base leading-relaxed" {...props} />
      ),
      p: ({ node, ...props }) => (
        <p className="text-base text-gray-800 dark:text-slate-100 leading-relaxed mb-4" {...props} />
      ),
      strong: ({ node, ...props }) => (
        <strong className="font-semibold text-blue-700 dark:text-blue-300" {...props} />
      ),
      table: ({ node, ...props }) => (
        <table className="table-auto border-collapse w-full my-4 text-left text-sm text-gray-800 dark:text-slate-100" {...props} />
      ),
      thead: ({ node, ...props }) => (
        <thead className="bg-gray-100 dark:bg-slate-700" {...props} />
      ),
      tbody: ({ node, ...props }) => (
        <tbody className="divide-y divide-gray-200 dark:divide-slate-600" {...props} />
      ),
      tr: ({ node, ...props }) => (
        <tr className="border-b border-gray-200 dark:border-slate-600" {...props} />
      ),
      th: ({ node, ...props }) => (
        <th className="px-4 py-2 font-semibold text-gray-900 dark:text-slate-100" {...props} />
      ),
      td: ({ node, ...props }) => (
        <td className="px-4 py-2" {...props} />
      ),
      blockquote: ({ node, ...props }) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-slate-300" {...props} />
      ),
      code: ({ node, className, children, ...props }) => (
        <code
          className={`bg-gray-100 dark:bg-slate-800 px-1 py-0.5 rounded text-sm font-mono ${className || ''}`}
          {...props}
        >
          {children}
        </code>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
  )
}

export default MarkDownFormat