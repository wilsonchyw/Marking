import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { DELETE, GET, POST, PUT } from "../decorators/restful";
import UserService from "../services/UserService";
import { User } from "../services/UserService";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Log from 'log4fns';

const saltRounds = 10;

@Injectable
export default class UserController {
    @Inject(UserService)
    private readonly userService: UserService;
    private readonly expireTime: number = 3600;
    private static userCache: Map<string, any> = new Map();
    constructor() {
    }

    @GET("/user")
    async getAllUser() {
        return this.userService.getAll();
    }

    @GET("/student")
    async getStudent(){
        return this.userService.getByRole(0)
    }

    @POST("/login")
    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        console.log({ username, password } )
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Invalid credentials");
        }
        const expireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 48; // 48 Hour
        const token = jwt.sign(
            { exp: expireTime, data: { user: user.username, role: user.role,id:user.id } },
            process.env.SECRET_KEY
        );
        // return some user data, like a token or user profile information
        UserController.userCache.set(token, true);
        Log(token)
        return token;
    }

    @POST("/user")
    async createUser(req: Request, res: Response): Promise<User> {
        const { username, password,email,firstName,lastName,role } = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const user = { username, email,firstName,lastName,role,password:hash }
        const id = await this.userService.create(user);
        return id;
    }

    @PUT("/user")
    async updateUser(id: number, name?: string, email?: string): Promise<User> {
        const user = await this.userService.get(id);
        if (user) {
            const updates = {};
            if (name) updates["name"] = name;
            if (email) updates["email"] = email;
            const updatedUser = await this.userService.update(id, updates);
            return updatedUser;
        } else {
            return null;
        }
    }

    @DELETE("/user")
    async deleteUser(id: number): Promise<boolean> {
        const deleted = await this.userService.delete(id);
        return true;
    }

    static verify(token:string){
        return UserController.userCache.get(token);
    }
}
