import { Request, Response } from "express";
import { prisma } from "../app";

// const usersRouter = express.Router();

// GET /users - Get all users
export const getAll = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany({
    include: {
      albums: true,
      pictures: true,
    }
  });
  return res.json(allUsers);
}

// Get a single user by its id
export const getOne = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!user) return res.status(404).json({ error: "User not found" });
  else return res.json(user);
};

// Create  a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    if (!user) throw new Error("Failed to create user");
    else return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const updatedUser = await prisma.user.update({ where: { id }, data: req.body });
  if (!updatedUser) throw new Error(`No user with ID ${id}`);
  else return res.json(updatedUser);
};

// This route is used for deleting a single user by their ID
export const deleteUser =  async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const deletedUser = await prisma.user.delete({ where: { id } })
  
  if(!deletedUser) return res.status(404).send(`No user with the id ${id} was found.`);
  else return res.status(200).send(deletedUser);
};

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