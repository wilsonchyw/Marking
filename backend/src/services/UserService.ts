import Injectable from "../decorators/injectable";
import ModelService from "./ModelService";

export interface User {
    id: number;
    username: string;
    email: string;
    role: number;
    firstName: string;
    lastName: string;
    password: string;
}

@Injectable
export default class UserService extends ModelService<User> {
    id: number;
    type: string;
    content: string;
    assignment_id: number;

    constructor() {
        super("users");
    }

}
