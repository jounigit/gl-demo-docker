"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../model/user.model");
// GET /users - Get all users
const getAll = async (req, res) => {
    const allUsers = await (0, user_model_1.getUsers)();
    return res.json(allUsers);
};
exports.getAll = getAll;
// Get a single user by its id
const getOne = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const user = await (0, user_model_1.getUser)(id);
    return res.json(user);
};
exports.getOne = getOne;
const create = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send("Missing data");
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
    const newUser = {
        username,
        email,
        password: passwordHash,
    };
    const created = await (0, user_model_1.createUser)(newUser);
    return res.status(201).json(created);
};
exports.create = create;
// Update an existing user
const update = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const updated = await (0, user_model_1.updateUser)(id, req.body);
    if (!updated) {
        return res.status(404).json({ message: 'No user found with that ID.' });
    }
    return res.json(updated);
};
exports.update = update;
// This route is used for deleting a single user by their ID
const remove = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const deleted = await (0, user_model_1.deleteUser)(id);
    if (!deleted)
        throw new Error(`No user with ID ${id}`);
    return res.status(200).send(deleted);
};
exports.remove = remove;
