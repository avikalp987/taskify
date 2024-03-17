import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"
import { FormInput } from "lucide-react"

export const Form = () => {
    const {
        execute,
        fieldErrors,
    } = useAction(createBoard, {
        onSuccess(data) {
            console.log(data, "SUCCESS")
        },
        onError(error) {
            console.log(error, "ERROR")
        },
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string

        execute({ title })
    }

    return (
        <form>
            <div className="flex flex-col space-y-2">
                <FormInput errors={fieldErrors} />
            </div>

            <FormButton />
        </form>
    )
}