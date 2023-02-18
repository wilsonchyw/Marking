import Injectable from "../decorators/injectable";
import ModelService from "./ModelService";

@Injectable
export default class ScoreService extends ModelService<AssignmentsScore> {
    id: number;
    published: boolean;
    publish_at: Date;

    constructor() {
        super("assignment_score");
    }

    async getAllScore(user_id: number) {
        return await this.db.knex
            .select("*")
            .from(this.tableName)
            .where("user_id", "=", user_id)
            .orderBy("assignment_id");
    }

    async getScoreById(assignment_id: number, user_id: number) {
        return await this.db.knex
            .select("*")
            .from(this.tableName)
            .where("assignment_id", "=", assignment_id)
            .andWhere("user_id", "=", user_id)
            .first();
    }

    async createScore(obj: AssignmentsScore) {
        console.log(obj)
        return this.db.knex(this.tableName).insert(obj).onConflict(["assignment_id", "user_id"]).merge().returning("*");
    }
}

export interface AssignmentsScore {
    assignment_id: number;
    user_id: number;
    score: string;
}
