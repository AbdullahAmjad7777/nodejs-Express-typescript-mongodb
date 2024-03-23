"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.put("/Update/:id", user_controller_1.updateUser);
router.delete("/Delete/:id", user_controller_1.userDelete);
router.get("/findbyid/:id", user_controller_1.getUserbyId);
exports.default = router;
