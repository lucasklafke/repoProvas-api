import express, { json } from 'express';
import errorHandler from './middlewares/errorHandler.js';
import globalRouter from './routers/globalRouter.js';
var app = express();
app.use(json());
app.use(globalRouter);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map