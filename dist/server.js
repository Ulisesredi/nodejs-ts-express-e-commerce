"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const user_router_1 = require("./user/user.router");
class Server extends config_1.ConfigServer {
    constructor() {
        super();
        this.app = (0, express_1.default)();
        this.port = this.getNumberEnvironment("PORT") || 9999;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.dbConnect();
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use("/api", this.routers());
        this.listen();
    }
    routers() {
        const userRouter = new user_router_1.UserRouter().router;
        return [userRouter];
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port => ${this.port}`);
        });
    }
}
new Server();
