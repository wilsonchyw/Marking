import jwt from "jsonwebtoken";
import Log from "log4fns";

export default class AuthController {
    private static userMap: Map<string, any> = new Map();
    private readonly expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 48; // 48 Hour

    /**
     * Verifies the validity of a given token.
     * @param {string} token - The token to verify.
     * @returns {Promise<boolean>} A promise that resolves to `true` if the token is valid, or `false` if it is invalid.
     */
    static async verify(token: string) {
        if (!/Bearer/.test(token)) return false;
        token = token.split(" ")[1];
        if (AuthController.userMap.get(token)) return true;
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (e) {
            Log("invalid token");
            return false;
        }
    }
}
