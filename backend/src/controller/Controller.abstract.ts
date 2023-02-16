import { RequestHandler } from "express";
import { DELETE, GET, POST, PUT } from "../decorators/restful";
import ModelService from "../services/ModelService";
import { Request, Response } from "express";
import Log from "log4fns";
import Injectable from "../decorators/injectable";

export default abstract class Controller<T> {
    protected service: ModelService<T>;

    //@GET(`/${Controller.defaultPath}`)
    async getAll(): Promise<T[]> {
        // Get all examples
        return this.service.getAll();
    }

    //@GET(`/${Controller.defaultPath}/:id`)
    async getOne(id) {
        // Get one example
        return this.service.getById(id);
    }

   // @POST(`/${Controller.defaultPath}`)
    async create() {
        // Create a new example
        return this.service.create(req.body);
    }

    //@PUT(`/${Controller.defaultPath}/:id`)
    async update() {
        // Update an example
        const example = await this.service.getById(req.params.id);
        if (!example) {
            return new Error("id not found");
        }
        const newObj = { ...example, ...req.body };
        return this.service.update(req.params.id, newObj);
    }

    //@DELETE(`/${Controller.defaultPath}/:id`)
    async delete() {
        // Delete an example
        return this.service.delete(req.params.id);
    }
}
