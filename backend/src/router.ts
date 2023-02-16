import * as Controllers from "./controller";
import express from "express";
import apiWrapper from "./lib/apiWrapper";
import injectManager from "./services/injectManager";
import Log from "log4fns";

export default class Router {
    private routeMap: any;
    private router: any;
    constructor() {
        this.router = express.Router();
        
    }

    /**
     * Builds the routes for the router.
     * @param {Object} Controllers - An object containing all the controllers.
     * @returns {Object[]} An array of route objects. Each object has the following properties:
     *                    - method: The HTTP method of the route.
     *                    - path: The path of the route.
     *                    - handler: The handler function for the route.
     *                    - controller: The name of the controller that the route belongs to.
     */
    buildRoute() {
        this.routeMap =  Object.values(Controllers)
            .map(Controller => {
                const controllerInstance = injectManager.get(Controller.name)//new Controller();
                const routes = Reflect.getMetadata('ROUTERS', Controller);
                return routes.map(({ method, path, handler }) => {
                    const resolver = apiWrapper(controllerInstance[handler].bind(controllerInstance));
                    this.router[method](path, resolver);
                    return {
                        method,
                        path,
                        handler,
                        controller: Controller.name
                    };
                });
            })
            .flat();
    }

    /**
     * Logs the routes.
     * @returns {void}
     */
    log() {
        console.table(this.routeMap);
    }

    /**
     * Gets the router instance.
     * @returns {any} The router instance.
     */
    get route() {
        return this.router;
    }
}
