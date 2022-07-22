var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from "../config/db.js";
export function createUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.create({ data: { email, password } });
        return user;
    });
}
export function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExist = yield client.user.findFirst({ where: {
                email
            } });
        return userExist;
    });
}
export function createSession(token, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            token,
            userId: user.id
        };
        const session = yield client.session.create({ data });
        return session;
    });
}
//# sourceMappingURL=authRepository.js.map