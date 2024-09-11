import { z } from "zod";
import payload from "payload";
import { ValidationError } from "./errors/ValidationError";

export const formatError = (res, err): void => {
    if (err instanceof ValidationError) {
        return res.status(400).json({ success: false, data: null, issues: err.issues });
    } else if (err instanceof z.ZodError) {
        return res.status(400).json({
            success: false,
            data: null,
            issues: err.issues.reduce((acc, issue) => {
                acc[issue.path.join('.')] = issue.message;
                return acc;
            }, {})
        });
    }

    payload.logger.error(err);
    return res.status(500).json({ error: true });
};