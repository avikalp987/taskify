import { z } from "zod";

// creating the generics for all types of errors we can have


export type FieldErrors<T> = {
    [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>,
    error?: string | null,
    data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const validationResult = schema.safeParse(data)

        //if the schema validation fails, just return the field errors
        if(!validationResult.success) {
            return {
                fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>
            }
        }

        return handler(validationResult.data)
    }
}