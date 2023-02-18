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

    async findByUsername(username: string): Promise<User | null> {
        const result = await this.db.knex(this.tableName).select("*").where({ username }).first();
        return result;
    }

    async getByRole(role: number): Promise<User[]> {
        return await this.db
            .knex(this.tableName)
            .select(["id", "username", "email", "firstName", "lastName"])
            .where({ role:role });
    }
}
