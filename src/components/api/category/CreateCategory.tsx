import useCreateCategory from "../../../hooks/api/category/useCreateCategory"
import CategoryForm from "./CategoryForm"

const CreateCategory = () => {

    const createCategory = useCreateCategory()

  return (
    <div>
        <CategoryForm 
            createCategory={createCategory}
        />
    </div>
  )
}

export default CreateCategory