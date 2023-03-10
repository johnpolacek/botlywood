import EditGraphic from "./graphics/Edit"

const EditButton = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <button
      className="bg-indigo-600 text-lg px-8 py-2 rounded-lg"
      onClick={(e) => {
        e.preventDefault()
        onEdit()
      }}
    >
      <EditGraphic />
      <span>Edit</span>
    </button>
  )
}

export default EditButton
