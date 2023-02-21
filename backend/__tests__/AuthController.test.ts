import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthController from "../src/controller/AuthController";
import { User } from "../src/services/UserService";

describe("AuthController", () => {
    let user: User;
    let token: string;

    beforeAll(() => {
        // Set up any necessary data
        process.env.SECRET_KEY ="secret"
        let password = "password"
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user = { id: 1,username:"John Don", firstName: "John", lastName: "Doe", email: "johndoe@example.com", password: hash,role:1 };
        token = jwt.sign(
            { exp: AuthController["expireTime"], data: { ...user, password: null } },
            "secret"
        );
        AuthController["userMap"].set(token, user);
    });

    afterAll(() => {
        // Clean up any data
        AuthController["userMap"].clear();
    });

    describe("login()", () => {
        it("should return a valid token when given correct credentials", async () => {
            const result = await AuthController.login(user, "password");
            expect(typeof result).toBe("string");
        });

        it("should throw an error when given incorrect credentials", async () => {
            await expect(AuthController.login(user, "wrong_password")).rejects.toThrow("Invalid credentials");
        });
    });

    describe("verify()", () => {
        it("should return true for a valid token", async () => {
            const result = await AuthController.verify(`Bearer ${token}`);
            expect(result).toEqual(expect.objectContaining(user));
        });

        it("should return false for an invalid token", async () => {
            const result = await AuthController.verify("Bearer invalid_token");
            expect(result).toBe(false);
        });
    });

    describe("logout()", () => {
        it("should remove the token from the user map", async () => {
            await AuthController.logout(`Bearer ${token}`);
            expect(AuthController["userMap"].has(token)).toBe(false);
        });
    });
});
