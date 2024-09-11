export class ValidationError extends Error {
    public issues: Record<string, string>;

    constructor(name: string, issues: Record<string, string>) {
        super(name);
        Object.setPrototypeOf(this, ValidationError.prototype);

        this.issues = issues;
        Error.captureStackTrace(this, this.constructor);
    }
}
