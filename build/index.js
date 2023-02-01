"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = 3000;
//* Function App
// const app: Express = express();
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server edit");
// });
// app.listen(port, () => {
//   console.log(alex);
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
//* End
//* Class Base App / OOP
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        // for parsing application/json
        this.app.use(express_1.default.json());
        // for parsing application/xwww-
        // this.app.use(express.urlencoded());
        // for parsing application//form-data
        // this.app.use(express.static("public"));
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("Hello World");
        });
        this.app.route("/categories").post((req, res) => {
            console.log("Routes : add category");
            console.log(req.body);
            res.send(req.body);
        });
    }
}
const app = new App().app;
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
