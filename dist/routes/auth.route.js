"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/Register", auth_controller_1.createUser);
router.post("/Login", auth_controller_1.loginUser);
exports.default = router;
