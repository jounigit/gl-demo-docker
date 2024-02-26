"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getOne = exports.getAll = void 0;
const app_1 = require("../app");
const bcrypt_1 = __importDefault(require("bcrypt"));
// GET /users - Get all users
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield app_1.prisma.user.findMany({});
    return res.json(allUsers);
});
exports.getAll = getAll;
// Get a single user by its id
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield app_1.prisma.user.findUnique({ where: { id: parseInt(id) } });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        return res.json(user);
    }
    catch (e) {
        console.log(e);
        next(e);
        // if ( e instanceof PrismaClientValidationError) {
        //   res.status(500).json({ error: 'an unknown error occured, check your server logs for more info' })
        // }
        // const error = errorHandler(e)
        // res.send(error)
    }
    // const user = await prisma.user.findUnique({
    //   where: { id: parseInt(id) },
    //   include: {
    //     albums: true,
    //     pictures: true,
    //   }
    // })
    // if (!user) return res.status(404).json({ error: 'User not found' })
    // else return res.json(user)
});
exports.getOne = getOne;
// Create  a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Missing data');
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const newUser = {
        name,
        email,
        password: passwordHash
    };
    try {
        const user = yield app_1.prisma.user.create({ data: newUser });
        if (!user)
            throw new Error('Failed to create user');
        else
            return res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});
exports.createUser = createUser;
// Update an existing user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updatedUser = yield app_1.prisma.user.update({ where: { id }, data: req.body });
    if (!updatedUser)
        throw new Error(`No user with ID ${id}`);
    else
        return res.json(updatedUser);
});
exports.updateUser = updateUser;
// This route is used for deleting a single user by their ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const deletedUser = yield app_1.prisma.user.delete({ where: { id } });
    if (!deletedUser)
        return res.status(404).send(`No user with the id ${id} was found.`);
    else
        return res.status(200).send(deletedUser);
});
exports.deleteUser = deleteUser;
// Create  a new user
// usersRouter.post("/", async (req: Request, res: Response) => {
//     try {
//       const user = await prisma.user.create({ data: req.body });
//       if (!user) throw new Error("Failed to create user");
//       else return res.status(201).json(user);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: err });
//     }
//   })
// GET /users - Get all users
// usersRouter.get("/", async (req: Request, res: Response) => {
//   const allUsers = await prisma.user.findMany({});
//   return res.json(allUsers);
// });
// Get a single user by its id
// usersRouter.get("/:id", async (req: Request, res: Response) => {
//   const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
//   if (!user) return res.status(404).json({ error: "User not found" });
//   else return res.json(user);
// });
// Update an existing user
// usersRouter.put("/:id", async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id as string);
//   const updatedUser = await prisma.user.update({ where: { id }, data: req.body });
//   if (!updatedUser) throw new Error(`No user with ID ${id}`);
//   else return res.json(updatedUser);
// });
// This route is used for deleting a single user by their ID
// usersRouter.delete("/:id", async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id as string);
//   const deletedUser = await prisma.user.delete({ where: { id } })
//   if(!deletedUser) return res.status(404).send(`No user with the id ${id} was found.`);
//   else return res.status(200).send(deletedUser);
// })
// export default usersRouter;
// const getUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await  prisma.user.findMany();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({  error: error });
//     }
// }
// const createUser = async (req: Request, res: Response) => {
//     try {
//         const { name, email, password } = req.body;
//         if (!name || !email || !password ) return res.status(400).send("Informe todos os dados.");
//         const newUser  = await prisma.user.create({
//              data: {
//                 name,
//                 email,
//                 password
//             }});
//             res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({  error: error });
//     }
// }
// export default {
//     getUsers,
//     createUser
// }
