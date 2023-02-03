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
const AuthRoutes_1 = __importDefault(require("./routers/AuthRoutes"));
//* Middleware
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
//* Main
dotenv_1.default.config();
const PORT = 3000;
//* -----------------------------------------------------------------------------------
//* Contoh Function App
// const app: Express = express();
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server edit");
// });
// app.listen(port, () => {
//   console.log(alex);
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
//* End
//* -----------------------------------------------------------------------------------
//* -----------------------------------------------------------------------------------
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
        /**
         * Cara kerja APP Class Base.
         * 1. Saat APP pertama kali menyala dia akan membuat New Class Routes (hanya 1x new class saat turn on app)
         * 2. Kemudian membuat New Class Controller (hanya 1x new class saat turn on app).
         */
        /**
         * Notes !
         * Penulisan category routes sama dengan penulisan routes yang lain, hanya lebih effisien penulisan routes yang lain.
         */
        this.app.use('/v1/auth', AuthRoutes_1.default);
        this.app.use('/v1/categories', authMiddleware_1.default, new CategoryRoutes_1.default().router);
        this.app.use('/v1/money-logs', authMiddleware_1.default, MoneyLogRoutes_1.default);
        this.app.use('/v1/users', authMiddleware_1.default, UserRoutes_1.default);
    }
}
const app = new App().app;
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
