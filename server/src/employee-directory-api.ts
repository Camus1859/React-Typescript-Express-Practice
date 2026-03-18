import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

type Employee = {
  id: string;
  name: string;
  department: string;
  role: string;
  isRemote: boolean;
};

let employees: Employee[] = [
  {
    id: "1",
    name: "Alice Chen",
    department: "Engineering",
    role: "Senior Developer",
    isRemote: true,
  },
  {
    id: "2",
    name: "Bob Martinez",
    department: "Engineering",
    role: "Junior Developer",
    isRemote: false,
  },
  {
    id: "3",
    name: "Charlie Kim",
    department: "Design",
    role: "UI Designer",
    isRemote: true,
  },
  {
    id: "4",
    name: "Dana Wilson",
    department: "Marketing",
    role: "Content Lead",
    isRemote: false,
  },
  {
    id: "5",
    name: "Eve Patel",
    department: "Design",
    role: "UX Researcher",
    isRemote: true,
  },
  {
    id: "6",
    name: "Frank Lopez",
    department: "Marketing",
    role: "SEO Specialist",
    isRemote: false,
  },
];

const app = express();

app.use(cors());
app.use(express.json());

// Your routes go here

app.get("/api/employees", (req, res, next) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(200).json({ employees });
    } else {
      const filteredDeptEmployees = employees.filter(
        (e) => e.department === department,
      );
      return res.status(200).json({ employees: filteredDeptEmployees });
    }
  } catch (e) {
    next(e);
  }
});

app.get("/api/employees/:id", (req, res, next) => {
  try {
    const id = req.params.id;

    const employee = employees.find((e) => e.id === id);
    if (!employee)
      return res.status(404).send(`Employee with id:${id} not found`);

    return res.status(200).json({ employee });
  } catch (e) {
    next(e);
  }
});

app.post("/api/employees", (req, res, next) => {
  try {
    const { name, department, role, isRemote } = req.body;

    const newEmployee: Employee = {
      name,
      department,
      role,
      isRemote,
      id: Math.random().toString(),
    };

    employees = [...employees, newEmployee];
    return res.status(201).json({ employee: newEmployee });
  } catch (e) {
    next(e);
  }
});

app.put("/api/employees/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const employeeToUpdate = employees.find((e) => e.id === id);
    if (!employeeToUpdate)
      return res.status(404).send(`Employee with id ${id} not found`);

    employees = employees.map((e) => {
      return e.id === id ? { ...e, ...body } : e;
    });

    res.status(200).json({ employee: employees.find((e) => e.id === id) });
  } catch (e) {
    next(e);
  }
});

app.delete("/api/employees/:id", (req, res, next) => {
  try {
    const id = req.params.id;

    const itemToDelete = employees.find((e) => e.id === id);
    if (!itemToDelete) return res.status(404).send("Unable to find");

    employees = employees.filter((e) => e.id !== id);

    return res.status(200).json({ id });
  } catch (e) {
    next(e);
  }
});

app.get("/api/external-users", async (req, res, next) => {
  try {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!users.ok) return res.status(500).send("Unable to fetch Users");

    const response = await users.json();
    const EmailandNameUsers = response.map((user: any) => {
      return {
        name: user.name,
        email: user.email,
      };
    });

    return res.status(200).json({ users: EmailandNameUsers });
  } catch (e) {
    next(e);
  }
});

app.patch("/api/employees/:id", (req, res, next) => {
  try {
    const id = req.params.id;

    const user = employees.find((e) => e.id === id);
    if (!user) return res.status(404).send("User not found for");

    employees = employees.map((e) => {
      return e.id === id ? { ...e, isRemote: !e.isRemote } : e;
    });


    return res
      .status(200)
      .json({ employee: employees.find((e) => e.id === id) });
  } catch (e) {
    next(e);
  }
});

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);

app.listen(3006, () => {
  console.log("employee directory api running on 3006");
});
