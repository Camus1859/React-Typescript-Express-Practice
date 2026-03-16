import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { users as initialUsers, UsersType } from "./data";

let users = [...initialUsers];

const app = express();

const myLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method);
  console.log(req.path);
  console.log(Date.now().toString());
  next();
};

const myErrorCatcher = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({ error: "Internal server error" });
};

app.use(express.json());
app.use(myLogger);
app.use(cors());

app.get("/api/users", (req, res, next) => {
  try {
    return res.status(200).json({ users });
  } catch (e) {
    next(e);
  }
});

app.get("/api/users/:id", (req, res, next) => {
  try {
    const userId = req.params.id;

    const myUserId = users.find((u) => u.id === userId);
    if (!myUserId) throw new Error("User not found");

    res.status(200).json({ user: myUserId });
  } catch (e) {
    next(e);
  }
});

app.post("/api/users", (req, res, next) => {
  try {
    const body = req.body;
    const newUser = { id: Math.random().toString(), ...body };

    users = [...users, newUser];
    return res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

app.put("/api/users/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const user = users.find((u) => u.id === id);
    if (!user) return res.status(404).send("User not found");

    const updatedUsers = users.map((user) => {
      return user.id === id ? { ...user, ...body } : user;
    });

    users = updatedUsers;

    return res.status(200).json({ users: users.find((u) => u.id === id) });
  } catch (e) {
    next(e);
  }
});

app.delete("/api/users/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const removedUser = users.find((u) => u.id === id);
    if (!removedUser) return res.status(404).send("User not found");

    users = users.filter((u) => u.id !== id);
    return res.status(200).json({ id });
  } catch (e) {
    next(e);
  }
});

app.get("/api/posts", async (req, res, next) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Unable to fetch posts");

    const results = await response.json();

    return res.status(200).json({ result: results.slice(0, 10) });
  } catch (e) {
    next(e);
  }
});

app.use(myErrorCatcher);

app.listen(3001, () => {
  console.log("port running on 3001");
});
