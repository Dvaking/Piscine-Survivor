"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;
var axios_1 = require("axios");
var authApi_1 = require("./authApi");
var url = "https://soul-connection.fr/api/customers";
var headers = {
    accept: "application/json",
    "X-Group-Authorization": "e6e70c63639f039518f84a0f3c517837",
};
function getCustomers(token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1, newToken, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 9, , 10]);
                    response = void 0;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: __assign(__assign({}, headers), { Authorization: "Bearer ".concat(token.access_token) }),
                        })];
                case 2:
                    response = _c.sent();
                    return [3 /*break*/, 8];
                case 3:
                    error_1 = _c.sent();
                    if (!(axios_1.default.isAxiosError(error_1) && ((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) === 401)) return [3 /*break*/, 6];
                    return [4 /*yield*/, (0, authApi_1.login)()];
                case 4:
                    newToken = _c.sent();
                    return [4 /*yield*/, axios_1.default.get(url, {
                            headers: __assign(__assign({}, headers), { Authorization: "Bearer ".concat(newToken.access_token) }),
                        })];
                case 5:
                    response = _c.sent();
                    return [3 /*break*/, 7];
                case 6: throw error_1;
                case 7: return [3 /*break*/, 8];
                case 8: return [2 /*return*/, response];
                case 9:
                    error_2 = _c.sent();
                    if (axios_1.default.isAxiosError(error_2)) {
                        console.error("Request failed:", ((_b = error_2.response) === null || _b === void 0 ? void 0 : _b.data) || error_2.message);
                    }
                    else {
                        console.error("Unexpected error:", error_2);
                    }
                    throw new Error("Request failed");
                case 10: return [2 /*return*/];
            }
        });
    });
}
function getCustomerById(token, id) {
    return __awaiter(this, void 0, void 0, function () {
        var newUrl, response, error_3, newToken, error_4;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    newUrl = "https://soul-connection.fr/api/customers/".concat(id);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 10, , 11]);
                    response = void 0;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 9]);
                    return [4 /*yield*/, axios_1.default.get(newUrl, {
                            headers: __assign(__assign({}, headers), { Authorization: "Bearer ".concat(token.access_token) }),
                        })];
                case 3:
                    response = _c.sent();
                    return [3 /*break*/, 9];
                case 4:
                    error_3 = _c.sent();
                    if (!(axios_1.default.isAxiosError(error_3) && ((_a = error_3.response) === null || _a === void 0 ? void 0 : _a.status) === 401)) return [3 /*break*/, 7];
                    return [4 /*yield*/, (0, authApi_1.login)()];
                case 5:
                    newToken = _c.sent();
                    return [4 /*yield*/, axios_1.default.get(newUrl, {
                            headers: __assign(__assign({}, headers), { Authorization: "Bearer ".concat(newToken.access_token) }),
                        })];
                case 6:
                    response = _c.sent();
                    return [3 /*break*/, 8];
                case 7: throw error_3;
                case 8: return [3 /*break*/, 9];
                case 9: return [2 /*return*/, response];
                case 10:
                    error_4 = _c.sent();
                    if (axios_1.default.isAxiosError(error_4)) {
                        console.error("Request failed:", ((_b = error_4.response) === null || _b === void 0 ? void 0 : _b.data) || error_4.message);
                    }
                    else {
                        console.error("Unexpected error:", error_4);
                    }
                    throw new Error("Request failed");
                case 11: return [2 /*return*/];
            }
        });
    });
}
