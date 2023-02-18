import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import Database from "./database";

interface Model<T> {
    get(id: number): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: number, data: Partial<T>): Promise<T>;
    delete(id: number): Promise<void>;
    getById(id: number): Promise<T | null>;
}

@Injectable
export default abstract class ModelService<T> implements Model<T> {
    @Inject(Database)
    protected db: Database;
    protected readonly tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async getAll(): Promise<T[]> {
        const result = await this.db.knex.select("*").from(this.tableName);
        return result;
    }

    async get(id: number|string): Promise<T | null> {
        const result = await this.db.knex(this.tableName).where({ id }).first();
        return result ? (result as T) : null;
    }

    async create(data: Partial<T>): Promise<T> {
        const result = await this.db.knex(this.tableName).insert(data).returning("*");
        return result[0] as T;
    }

    async update(id: number|string, data: Partial<T>): Promise<T> {
        await this.db.knex(this.tableName).where({ id }).update(data);
        return (await this.get(id))!;
    }

    async delete(id: number|string): Promise<void> {
        await this.db.knex(this.tableName).where({ id }).delete();
    }

    async getById(id: number|string): Promise<T | null> {
        return this.get(id);
    }
}
