"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
var mongoose_1 = require("mongoose");
var AdminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String, // already hashed from Excel
});
exports.Admin = mongoose_1.default.models.Admin || mongoose_1.default.model('Admin', AdminSchema);
