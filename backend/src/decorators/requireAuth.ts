import { Request, Response } from "express";
import AuthController from "../controller/AuthController";

/**
 * A decorator function that adds authentication and authorization to a route handler function.
 *
 * @function
 * @param {number} level - The minimum required authorization level for the route.
 * @returns {Function} The modified descriptor for the route handler function.
 */
export default function RequestAuth(level: number) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const fn = descriptor.value;
        descriptor.value = async function (req: Request, res: Response) {
            const token = req.headers?.authorization;
            if (!token) {
                throw { code: 401, msg: "Unauthorized access" };
            }
            const user = await AuthController.verify(token);
            
            if (!user) throw { code: 401, msg: "invalid token" };
    

            if (user.role < level) throw { code: 401, msg: "Not enough premission" };

            req.user = {...user,token};
            let result = await fn.apply(target, [req]);
            return result;
        };
    };
}
