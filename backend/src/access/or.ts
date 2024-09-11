import { Access, AccessArgs, AccessResult } from "payload/config";
import { Where } from "payload/types";

export const or = (validations: Access[]): Access => async (args: AccessArgs): Promise<AccessResult | boolean> => {
    let validationResults: boolean[] = [];
    let where: Where = {
        or: [],
    }

    for (let i = 0; i < validations.length; i++) {
        const valid = await validations[i](args);
        if (typeof valid === "boolean") {
            validationResults.push(valid);

            if (valid === true) {
                return true;
            }
        } else {
            where.or.push(valid);
        }
    };

    if (validationResults.length > 0 && validationResults.some((result) => result)) {
        return true;
    }

    if (where.or.length > 0) {
        return where;
    }

    return false;
}