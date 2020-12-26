"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
// const router = require("./routes/router");
// const errorHandler = require("./services/error-handler");
// const database = require("./utils/database");
const app = express_1.default();
app.listen(5000);
app.use(helmet_1.default());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/', (req, res) => {
    res.send(process.env);
});
// router(app);
// errorHandler.set(app);
//
// database.startDB(() => {
//   const server = app.listen(config.get("port"));
//   const io = require('./utils/socket').init(server);
//
//   io.on('connection', socket => {
//     console.log('Client connected');
//   })
// });
//# sourceMappingURL=app.js.map