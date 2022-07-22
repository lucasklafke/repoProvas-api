var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
export function validateJWT(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            throw { type: "unauthorized", message: "Authorization missing, or invalid" };
        }
        const token = authorization.replace("Bearer ", "").trim();
        if (!token) {
            throw { type: "unauthorized", message: "No token provided" };
        }
        const jwtData = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtData = jwtData;
        next();
    });
}
//# sourceMappingURL=validateJWT.js.map