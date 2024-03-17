"use client"

import { createBoard } from "@/actions/create-board"
import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { useAction } from "@/hooks/use-action"

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
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput
                    label="Name your board"
                    id={"title"}
                    errors={fieldErrors} 
                    placeholder={"Name your board"}
                    />
            </div>

            <FormSubmit>
                Save
            </FormSubmit>
        </form>
    )
}