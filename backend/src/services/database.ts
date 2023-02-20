import "dotenv/config";
import Knex from "knex";
import Log from "log4fns";
import Injectable from "../decorators/injectable";
import config from "../knexfile"
@Injectable
class Database {
    private readonly _knex: any;

    constructor() {
        Log(`Initializing connection`);
        const option = {
            client: "pg",
            version: "7.2",
            connection: {
                host: "database",
                port: 5432,
                user: "admin",
                password: "admin",
            },
            fetchAsString: []
        };
        this._knex = Knex(config.development);
        this.testConnect()
    }
    async testConnect() {
        await this._knex.raw("SELECT 1+1 AS result");
        Log("Database connected!");
    }

    get knex() {
        return this._knex;
    }

    disconnect() {
        this._knex.destroy();
    }
}

export default Database;
