var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
function verifyUserAlreadyExists(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authRepository.getUserByEmail(email);
        return user;
    });
}
function generateToken(email, userId) {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}
function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
function generateHashPassword(password) {
    const salt = Number(process.env.BCRYPT_SALT);
    return bcrypt.hashSync(password, salt);
}
export function signUp({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExist = yield verifyUserAlreadyExists(email);
        if (userExist) {
            throw { type: "conflict", message: "User already exists" };
        }
        const hashPassword = generateHashPassword(password);
        const user = yield authRepository.createUser(email, hashPassword);
        const token = generateToken(email, user.id);
        yield authRepository.createSession(token, user);
        return token;
    });
}
export function signIn({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield verifyUserAlreadyExists(email);
        const comparedPassword = yield comparePassword(password, user.password);
        if (!comparedPassword) {
            throw { type: "unauthorized", message: "Invalid password" };
        }
        const token = generateToken(email, user.id);
        yield authRepository.createSession(token, user);
        return token;
    });
}
//# sourceMappingURL=authService.js.map