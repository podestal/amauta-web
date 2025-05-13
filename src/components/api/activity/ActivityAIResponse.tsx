import MDEditor from "@uiw/react-md-editor"

interface Props {
    // activityType: string
    markdown: string
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
}

const ActivityAIResponse = ({ markdown, setMarkdown }: Props) => {

  return (
    <MDEditor
        value={markdown}
        onChange={(value) => setMarkdown(value || "")}
        height={600}
        preview="edit"
    /> 
  )
}

export default ActivityAIResponse