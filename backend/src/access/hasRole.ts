import { Role } from "../collections/Users";

export const hasRole = (allowedRoles: Role[]) => async ({ req: { user } }) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
}