import { z } from "zod"

//creating the schema for create-board action

export const CreateBoard = z.object({
    title: z.string({
        required_error: "Title is required.",
        invalid_type_error: "Title is required.",
    })
    .min(3, {
        message: "Title must be atleast 3 characters long."
    }),
    image: z.string({
        required_error: "Please select an image.",
        invalid_type_error: "Image is required",
    })
})