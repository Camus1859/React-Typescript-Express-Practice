// Build a User List using useReducer:
//
// Features:
// - Add a user (name + email inputs + submit button)
// - Edit an existing user (click edit, form pre-populates, save updates the user)
// - Delete a user
// - Display all users in a table
// - Show "No users yet" when the list is empty
//
// Requirements:
// - Use useReducer for the user list
// - Each user has: id (number), name (string), email (string)
// - Type everything: state, actions, reducer, component
// - Key prop on every table row
// - Don't allow adding a user with empty name or email
// - When editing, the form should show the current values and the submit button should say "Update" instead of "Add"

import { useReducer, useState } from "react";

type USER = {
  email: string;
  name: string;
  id: number;
};

type ACTIONTYPE = {
  type: string;
  payload: { name?: string; email?: string; id?: number };
};

const ACTION = {
  ADD: "add",
  DELETE: "delete",
  EDIT: "edit",
};

const reducer = (users: USER[], action: ACTIONTYPE) => {
  switch (action.type) {
    case ACTION.ADD:
      return [
        ...users,
        {
          email: action.payload.email,
          name: action.payload.name,
          id: Math.random(),
        },
      ];

    case ACTION.DELETE:
      return users.filter((u) => u.id !== action.payload.id);

    case ACTION.EDIT:
      return users.map((user) => {
        return user.id === action.payload.id
          ? {
              id: user.id,
              name: action.payload.name,
              email: action.payload.email,
            }
          : user;
      });

    default:
      return users;
  }
};

const UserReducer = () => {
  const [users, dispatch] = useReducer(reducer, []);
  const [nameValue, setNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [editId, setEditId] = useState<null | number>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(nameValue, emailValue);
    e.preventDefault();

    if (editId === null) {
      dispatch({
        type: ACTION.ADD,
        payload: {
          name: nameValue,
          email: emailValue,
        },
      });
    } else {
      dispatch({
        type: ACTION.EDIT,
        payload: {
          name: nameValue,
          email: emailValue,
          id: editId,
        },
      });
    }
    setNameValue("");
    setEmailValue("");
    setEditId(null);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditId(user.id);
                        setEmailValue(user.email);
                        setNameValue(user.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        dispatch({
                          type: ACTION.DELETE,
                          payload: {
                            id: user.id,
                          },
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td> No Users yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserReducer;
