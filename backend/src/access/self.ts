import { Access } from "payload/config";

export const self: Access = ({ req }) => {
    if (!req.user) {
        return false;
    }

    return {
        id: req.user.id,
    };
} 