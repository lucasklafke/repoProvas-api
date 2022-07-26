var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as authService from "../services/authService.js";
export function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const token = yield authService.signUp({ email, password });
        res.status(201).send({ token });
    });
}
export function signIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log("entrei");
        const token = yield authService.signIn({ email, password });
        res.status(200).send({ token });
    });
}
//# sourceMappingURL=authController.js.map