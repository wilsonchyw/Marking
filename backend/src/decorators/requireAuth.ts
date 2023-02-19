import { Request, Response } from "express";
import Log from "log4fns";
import AuthController from "../controller/AuthController";
import { User } from "../services/UserService";

export default function RequestAuth(level: number) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function (req: Request, res: Response) {
            const token = req.headers?.authorization;
            if (!token) {
                Log("No token");
                throw { code: 401, msg: "Unauthorized access" };
            }
            const authorized = await AuthController.verify(token);
            
            if (!authorized) throw { code: 401, msg: "invalid token" };
            const user = authorized.data
            Log(user)
            if (user.role < level) throw { code: 401, msg: "Not enough premission" };
            
            req.user=user
            let result = await fn.apply(target, [req]);
            return result;
        };
    };
}
