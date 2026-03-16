import { useEffect, useReducer, useState } from "react";

const ACTION = {
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
  SET: "set",
};

type ActionType = {
  type: string;
  payload: { id?: string; name?: string; email?: string } | UsersType[];
};

type UsersType = {
  id: string;
  name: string;
  email: string;
};

const reducer = (users: UsersType[], action: ActionType): UsersType[] => {
  switch (action.type) {
    case ACTION.ADD: {
      const payload = action.payload as {
        id: string;
        name: string;
        email: string;
      };
      return [
        ...users,
        {
          id: Math.random().toString(),
          email: payload.email,
          name: payload.name,
        },
      ];
    }

    case ACTION.DELETE: {
      const payload = action.payload as {
        id: string;
        name: string;
        email: string;
      };
      return users.filter((u) => u.id !== payload.id);
    }

    case ACTION.EDIT: {
      const payload = action.payload as {
        id: string;
        name: string;
        email: string;
      };

      return users.map((u) => {
        return u.id === payload.id
          ? { ...u, name: payload.name, email: payload.email }
          : u;
      });
    }

    case ACTION.SET: {
      const payload = action.payload as UsersType[];
      return payload;
    }

    default:
      return users;
  }
};

const UserManager = () => {
  const [users, dispatch] = useReducer(reducer, []);
  const [nameValue, setNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [editId, setEditId] = useState<null | string>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users");
        if (!response.ok) throw new Error("Unable to fetch");

        const { users } = await response.json();
        dispatch({ type: ACTION.SET, payload: users });
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId === null) {
      dispatch({
        type: ACTION.ADD,
        payload: { name: nameValue, email: emailValue },
      });
    } else {
      dispatch({
        type: ACTION.EDIT,
        payload: { name: nameValue, email: emailValue, id: editId },
      });
    }
    setNameValue("");
    setEmailValue("");
    setEditId(null);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          value={nameValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNameValue(e.target.value)
          }
        />
        <input
          value={emailValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmailValue(e.target.value)
          }
        />

        <button
          disabled={nameValue.trim() === "" || emailValue.trim() === ""}
          type="submit"
        >
          {editId ? "Edit" : "Add"}
        </button>
      </form>
      {users && users.length > 0 ? (
        <ul>
          {users.map((user) => {
            return (
              <div key={user.id}>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <button
                  onClick={() =>
                    dispatch({ type: ACTION.DELETE, payload: { id: user.id } })
                  }
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setNameValue(user.name);
                    setEmailValue(user.email);
                    setEditId(user.id);
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </ul>
      ) : (
        <div>No Users</div>
      )}
    </>
  );
};

export default UserManager;
