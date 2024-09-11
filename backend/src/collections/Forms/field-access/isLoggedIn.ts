import { FieldAccess } from "payload/types";

export const isLoggedIn: FieldAccess = ({ req }) => {
    if (req?.user) {
        return true;
    }
    return false;
}