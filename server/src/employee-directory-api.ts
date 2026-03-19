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

const validationMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, department, role } = req.body;

  if (!name || !department || !role)
    return res.status(400).send("Bad request missing input");

  next();
};

const app = express();

app.use(cors());
app.use(express.json());

// Your routes go here

app.get("/api/employees", (req, res, next) => {
  let filteredEmployees: Employee[] = employees;
  try {
    const { department, isRemote } = req.query;

    if (department) {
      filteredEmployees = employees.filter((e) => e.department === department);
    }

    if (isRemote === "true") {
      filteredEmployees = filteredEmployees.filter((e) => e.isRemote);
    }

    if (isRemote === "false") {
      filteredEmployees = filteredEmployees.filter((e) => !e.isRemote);
    }

    return res.status(200).send({ employees: filteredEmployees });
  } catch (e) {
    next(e);
  }
});

app.get("/api/employees/summary", (req, res, next) => {
  const employeesCount = employees.reduce(
    (acc, val) => {
      acc["total"] = (acc["total"] || 0) + 1;
      acc["byDepartment"] = acc["byDepartment"] || {};
      acc["byDepartment"][val.department] =
        (acc["byDepartment"][val.department] || 0) + 1;
      acc["remoteCount"] = (acc["remoteCount"] || 0) + (val.isRemote ? 1 : 0);
      return acc;
    },
    {} as {
      total: number;
      byDepartment: { [key: string]: number };
      remoteCount: number;
    },
  );

  return res.status(200).json({ employees, employeesCount });
});

app.get("/api/employees/search", (req, res, next) => {
  try {
    const q = req.query.q as string;
    if (!q) return res.status(400).send("Search word is missing");

    const filteredEmployees = employees.filter((e) => {
      return (
        e.name.toLowerCase().includes(q.toLowerCase()) ||
        e.department.toLowerCase().includes(q.toLowerCase()) ||
        e.role.toLowerCase().includes(q.toLowerCase())
      );
    });

    return res.status(200).json({ employees: filteredEmployees });
  } catch (e) {
    next(e);
  }
});

app.post("/api/employees", validationMiddleWare, (req, res, next) => {
  try {
    const body = req.body;

    const newEmployee = {
      id: Math.random().toString(),
      ...body,
    };

    employees = [...employees, newEmployee as Employee];
    return res.status(201).json({ employee: newEmployee });
  } catch (e) {
    next(e);
  }
});

app.get("/api/employees/:id", (req, res, next) => {
  try {
    const id = req.params.id;

    const emp = employees.find((e) => e.id === id);
    if (!emp) return res.status(404).send("Employee not found");

    return res.status(200).json({ employee: emp });
  } catch (e) {
    next(e);
  }
});

app.put("/api/employees/:id", validationMiddleWare, (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const employeeToUpdate = employees.find((e) => e.id === id);
    if (!employeeToUpdate)
      return res.status(404).send("Unable to find employee");

    employees = employees.map((e) => {
      return e.id === id ? { ...e, ...body } : e;
    });

    return res
      .status(200)
      .json({ employees: employees.find((e) => e.id === id) });
  } catch (e) {
    next(e);
  }
});

app.delete("/api/employees/:id", (req, res, next) => {
  try {
    const id = req.params.id;

    const emp = employees.find((e) => e.id === id);
    if (!emp) return res.status(404).send("Employee not found");

    employees = employees.filter((e) => e.id !== id);

    return res.status(200).json({ id });
  } catch (e) {
    next(e);
  }
});

app.patch("/api/employees/:id", (req, res, next) => {
  try {
    const id = req.params.id;

    const emp = employees.find((e) => e.id === id);
    if (!emp) return res.status(404).send("Unable to find user");

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

app.get("/api/external-users", async (req, res, next) => {
  try {
    const users = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!users.ok) throw new Error("Unable to fetch users");

    let result = await users.json();
    result = result.map((r) => {
      return {
        name: r.name,
        email: r.email,
      };
    });

    return res.status(200).json({ users: result });
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
