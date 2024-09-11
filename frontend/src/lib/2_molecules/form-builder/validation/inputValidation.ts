export type InputValidationVariant = "required" | "email" | "string" | "phone"
export type InputValidationErrorVariant = InputValidationVariant | "unexpected"
export type InputValidationErrors = {
    [key: string]: InputValidationErrorVariant[]
}
export type InputValidationSchema = {
    [key: string]: InputValidationVariant[]
}
export type InputValidationResult = {
    valid: boolean
    errors?: InputValidationErrors
}
export type Input = {
    id?: string | null;
    name: string;
    label: string;
    type: "email" | "text" | "textarea" | "tel";
    required?: boolean | null;
}

export function validate(input: any, schema: InputValidationSchema): InputValidationResult {
    const errors: InputValidationErrors = {}
    const inputKeys = Object.keys(input)
    const schemaKeys = Object.keys(schema)

    for (const key of inputKeys) {
        if (!schemaKeys.includes(key)) {
            errors[key] = ["unexpected"]
            break
        }

        const invalidVariants = validateInput(input[key], schema[key])
        if (invalidVariants) {
            errors[key] = invalidVariants
        }
    }

    // Missing keys
    for (const key of schemaKeys) {
        if (!inputKeys.includes(key)) {
            errors[key] = schema[key]
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : undefined
    }
}

export function validateFormData(formData: FormData, schema: InputValidationSchema): InputValidationResult {
    const errors: InputValidationErrors = {}
    const schemaKeys = Object.keys(schema)

    for (const key of schemaKeys) {
        const input = formData.get(key)
        if (input === null) {
            errors[key] = schema[key]
            continue
        }

        const invalidVariants = validateInput(input, schema[key])
        if (invalidVariants) {
            errors[key] = invalidVariants
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors: Object.keys(errors).length > 0 ? errors : undefined
    }
}

function validateInput(input: any, variants: InputValidationVariant[]): InputValidationErrorVariant[] | false {
    const invalidVariants: InputValidationErrorVariant[] = []

    for (const variant of variants) {
        switch (variant) {
            case "required":
                if (input === undefined || input === null || input === "") {
                    invalidVariants.push(variant)
                }
                break
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input)) {
                    invalidVariants.push(variant)
                }
                break
            case "string":
                if (typeof input !== "string") {
                    invalidVariants.push(variant)
                }
                break
            case "phone":
                const phoneRegex = /^(\+31|0031|0)([1-9][0-9]{8})$/;
                if (!phoneRegex.test(input) && input !== "") {
                    invalidVariants.push(variant)
                }
                break
        }
    }

    return invalidVariants.length > 0
        ? invalidVariants
        : false
}

export function generateValidationSchema(fields: Input[] | undefined | null): InputValidationSchema | undefined {
    if (!fields) return undefined;
    return fields.reduce((acc: InputValidationSchema, field: Input) => {
        const rules: InputValidationVariant[] = [];

        switch (field.type) {
            case 'text':
            case 'textarea':
                rules.push('string');
                break;
            case 'email':
                rules.push('email');
                break;
            case 'tel':
                rules.push('phone');
                break;
        }

        if (field.required) {
            rules.push('required');
        }

        acc[field.name] = rules;
        return acc;
    }, {});
}
