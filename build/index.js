"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* Libs
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan")); //* Lib for logging
const helmet_1 = __importDefault(require("helmet")); //* Lib for Security
const cors_1 = __importDefault(require("cors")); //* Lib for CORS
const compression_1 = __importDefault(require("compression"));
//* Routes
const CategoryRoutes_1 = __importDefault(require("./routers/CategoryRoutes"));
const MoneyLogRoutes_1 = __importDefault(require("./routers/MoneyLogRoutes"));
const UserRoutes_1 = __importDefault(require("./routers/UserRoutes"));
//* Main
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
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send('Hello World');
        });
        this.app.use('/categories', CategoryRoutes_1.default);
        this.app.use('/money-logs', MoneyLogRoutes_1.default);
        this.app.use('/users', UserRoutes_1.default);
    }
}
const app = new App().app;
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
