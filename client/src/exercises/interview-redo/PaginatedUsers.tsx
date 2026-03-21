import { useEffect, useState } from "react";
import "./PaginatedUsers.css";

// Fetch user data from the API and render it in a table
// When a user clicks a row, hide the table and show that user's details
// Add a "Back" button that returns to the table view
// Style it — center the content on the page, and alternate row colors (grey/white)
// Add pagination — the API supports ?page=1&limit=20 query parameters

type User = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  age?: number;
  company: string;
};

const PaginatedUsers = () => {
  // fetch("http://localhost:3001/api/users?page=1&limit=1")
  const [users, setUsers] = useState<User[]>([]);
  const [isTableVisible, setIsTableVisible] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch(`http://localhost:3001/api/users?page=${page}&limit=2`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, [page]);

  console.log(users);
  return (
    <>
      {isTableVisible ? (
        <div className="container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => {
                  return (
                    <tr
                      className={index % 2 === 0 ? "gray" : "white"}
                      key={user.id}
                      onClick={(e) => {
                        setIsTableVisible(false);
                        setUser({
                          id: user.id,
                          firstName: user.firstName,
                          email: user.email,
                          company: user.company,
                          phone: user.phone,
                        });
                      }}
                    >
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.company}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Users</td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            <button onClick={() => setPage(page - 1)}>Prev</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      ) : (
        <div className="userInfoContainer">
          <button
            onClick={() => {
              setIsTableVisible(true);
            }}
          >
            {"<"}
          </button>
          <h2>User Info</h2>
          <p>Name</p>
          <p>{user?.firstName}</p>
          <p>Email</p>
          <p>{user?.email}</p>
          <p>Phone</p>
          <p>{user?.phone}</p>
          <p>Company</p>
          <p>{user?.company}</p>
        </div>
      )}
    </>
  );
};

export default PaginatedUsers;
