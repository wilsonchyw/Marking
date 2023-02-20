import jwt from "jsonwebtoken";
import Log from "log4fns";
import bcrypt from "bcrypt";
import { User } from "../services/UserService";

export default class AuthController {
    private static userMap: Map<string, User> = new Map();
    private static readonly expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 48; // 48 Hour

    static async login(user: User, password: String) {
        Log(user);
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error("Invalid credentials");
        }
        const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 48; // 48 Hour

        const token = jwt.sign({ exp: expireTime, data: { ...user, password: null } }, process.env.SECRET_KEY);
        AuthController.userMap.set(token, user);
        return token;
    }

    /**
     * Verifies the validity of a given token.
     * @param {string} token - The token to verify.
     * @returns {Promise<boolean>} A promise that resolves to `true` if the token is valid, or `false` if it is invalid.
     */
    static async verify(token: string) {
        if (!/Bearer/.test(token)) return false;
        token = token.split(" ")[1];
        if (AuthController.userMap.has(token)) return AuthController.userMap.get(token);
        try {
            return jwt.verify(token, process.env.SECRET_KEY).data;
        } catch (e) {
            Log("invalid token");
            return false;
        }
    }

    static async logout(token: string) {
        token = token.split(" ")[1];
        AuthController.userMap.delete(token);
        return true;
    }
}
