import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import RequestAuth from "../decorators/requireAuth";
import { GET, POST } from "../decorators/restful";
import { ADMIN, INSTRUCTOR, STUDENT } from "../lib/constant";
import UserService, { User } from "../services/UserService";
import AuthController from "./AuthController";

const saltRounds = 10;

@Injectable
export default class UserController {
    @Inject(UserService)
    private readonly userService: UserService;
    constructor() {}

    @RequestAuth(INSTRUCTOR)
    @GET("/user")
    async getAllUser(req: Request, res: Response) {
        return this.userService.getAll();
    }

    @RequestAuth(INSTRUCTOR)
    @GET("/user/student")
    async getStudent() {
        return this.userService.getBy("role", STUDENT);
    }

    @POST("/login")
    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        const user = await this.userService.getBy("username", username);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        return AuthController.login(user[0], password);
    }

    @RequestAuth(STUDENT)
    @POST("/logout")
    async logout(req: Request, res: Response) {
        const { token } = req.user;
        return AuthController.logout(token);
    }

    /**
     * A route handler function that creates a new user with the specified credentials and role.
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     */
    @RequestAuth(INSTRUCTOR)
    @POST("/user")
    async createUser(req: Request, res: Response): Promise<User> {
        const { username, password, email, firstName, lastName, role } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const user = { username, email, firstName, lastName, role, password: hash };
        const id = await this.userService.create(user);
        return id;
    }
}
