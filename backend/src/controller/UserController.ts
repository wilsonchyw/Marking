import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { DELETE, GET, POST, PUT } from "../decorators/restful";
import UserService from "../services/UserService";
import { User } from "../services/UserService";

@Injectable
export default class UserController {
    @Inject(UserService)
    private readonly userService: UserService;
    constructor(){}

    @GET("/user")
    async getAllUser() {
        return this.userService.getAll();
    }

    @POST("/user")
    async createUser(firstName: string, email: string): Promise<User> {
        const user = await this.userService.create({ firstName, email });
        return user;
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
}
