import cors from "cors";
import express, { Express, Request, Response } from "express";
import Log from "log4fns";
import "reflect-metadata";
import Router from "./router";
import { types } from "pg";
types.setTypeParser(20, function (val) {
    return parseInt(val, 10);
});

class App {
    private instance: Express;

    constructor() {
        this.instance = express();
    }

    async init() {
        const PORT = process.env.NODE_ENV ?? 3000;

        this.instance.use(cors());
        this.instance.use(express.json());
        this.instance.use(express.urlencoded({ extended: true }));
        this.instance.use(function (req: Request, res: Response, next: Function) {
            Log(req.path, req.query);
            next();
        });
        const router = new Router();

        router.buildRoute();
        router.log();

        this.instance.use("/", router.route);
        this.instance.listen(PORT);

        Log(`🚀  Server ready on port ${PORT}`);
        //console.log(injectManager.test())
    }
}

const app = new App();
app.init();
