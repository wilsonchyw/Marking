import Knex from "knex";
import DB from "../src/model/constant";
import UserService from "../src/services/UserService";
import { IUser } from "../src/model/Question";

const option = {
    client: "pg",
    version: "7.2",
    connection: {
        host: "database",
        port: 5432,
        user: "admin",
        password: "admin",
    },
};

describe("UserService", () => {
    let userService= new UserService();

   

    describe("getAll", () => {
        it("should retrieve all users from the database", async () => {
            const mockUsers: IUser[] = [
                {
                    id: "1",
                    role: 1,
                    username: "user1",
                    firstName: "John",
                    lastName: "Doe",
                    email: "john.doe@example.com",
                    password: "password123",
                },
                {
                    id: "2",
                    role: 2,
                    username: "user2",
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "jane.doe@example.com",
                    password: "password456",
                },
            ];

            // insert mock users into database
            await userService.db.knex(DB.USER).insert(mockUsers);

            const retrievedUsers = await userService.getAll();

            expect(retrievedUsers).toEqual(mockUsers);
        });
    });

    describe("createUser", () => {
        it("should insert a new user into the database", async () => {
            const newUser = {
                id: "3",
                role: 1,
                username: "newuser",
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                password: "password123",
            };

            await userService.createUser(newUser);

            const [userFromDb] = await userService.db.knex(DB.USER).where({ id: newUser.id });

            expect(userFromDb).toEqual(newUser);
        });
    });
});
