import { User } from "services/UserService";
declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}

