import { Endpoint } from "payload/config";
import { InputValidationSchema, InputValidationVariant, validate } from "../util/inputValidation";
import payload from "payload";
import { FormBuilderConfig } from "..";
import { Form, FormField } from "../../../payload-types";

type Input = {
    id?: string | null;
    name: string;
    label: string;
    type: "email" | "text" | "textarea" | "tel";
    required?: boolean | null;
}

export type FormEmail = {
    sendTo?: 'submitter' | 'custom';
    emailField?: string | null;
    email?: string | null;
    subject: string;
    body: string;
    id?: string | null;
};

export const generateFormEndpoint = (config: FormBuilderConfig): Endpoint => ({
    path: '/forms/send',
    method: 'post',
    handler: async (req, res) => {
        // Check if basic requirements are met
        if (!req.body) {
            return res.status(400).json({
                message: 'No body provided'
            })
        }

        const { id, fields } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'No form ID provided'
            })
        }

        if (!fields || Object.keys(fields).length === 0) {
            return res.status(400).json({
                message: 'No fields provided'
            })
        }

        // Find form
        const form = await req.payload.findByID({
            id: id,
            collection: 'forms',
        });

        if (!form) {
            return res.status(404).json({
                message: 'Form not found'
            })
        }

        if (!form.fields || form.fields.length === 0) {
            return res.status(400).json({
                message: 'Form has no fields'
            })
        }
        // Validation
        const schema = generateValidationSchema(form.fields.map((field) => field.value));
        const validation = validate(fields, schema);

        if (!validation.valid) {
            return res.status(400).json({
                message: 'Invalid input',
                errors: validation.errors
            })
        }

        // Send email
        form.emails?.forEach((email: FormEmail) => sendMail(fields, email));

        // Save submission
        if (config.saveToCollection) {
            await addFormSubmission(form, fields);
        }
        res.status(200).json({ message: 'ok' });
    }
});

function addFormSubmission(form: Form, fields: Record<string, any>) {
    const title = form.formSubmissionTitle.replace(/{(.*?)}/g, (match: string, p1: string) => {
        return fields[p1] || match;
    });

    return payload.create({
        collection: 'form-submissions',
        data: {
            title: title,
            form: form.id,
            fields: Object.keys(fields).map((key: string) => ({
                label: form.fields?.find((field) => field.value.name === key)?.value.label || key,
                value: fields[key],
            })),
        },
    });
}

function generateValidationSchema(fields: FormField[]) {
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

async function sendMail(fields: Record<string, any>, email: FormEmail): Promise<boolean> {
    const { sendTo, emailField, email: customEmail, subject, body } = email;
    const to = sendTo === 'submitter' ? fields[emailField] : customEmail;

    if (!to) {
        return false;
    }

    try {
        await payload.sendEmail({
            from: 'website@volcano.nl',
            to,
            subject,
            text: generateEmailBody(fields, body),
        });

        return true;
    } catch (error) {
        return false;
    }
}

function generateEmailBody(fields: Record<string, any>, body: string) {
    return body.replace(/{(.*?)}/g, (match: string, p1: string) => {
        return fields[p1] || match;
    });
}