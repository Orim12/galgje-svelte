import { Access } from "payload/config";

export const isLoggedIn: Access = ({ req: { user } }) => {
    if (user) {
        return true;
    }
    return false;
}