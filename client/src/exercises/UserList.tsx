// Build a UserList component that:
// - Fetches users from "https://jsonplaceholder.typicode.com/users" on mount
// - Shows "Loading..." while the fetch is in progress
// - Shows an error message if the fetch fails
// - Displays the list of user names when successful
// - Each list item needs a key prop
// - Type the user data (at minimum: id, name, email)
// - Handle all three states: loading, error, success

import { useEffect, useState } from "react";

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
};

type User = {
  id: number;
  name: string;
  userName: string;
  email: string;
  address: Address;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Unable to fetch");

        const data = await res.json();
        setUsers(data);
      } catch (e) {
        setError(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading ....</div>;
  }

  if (error) {
    return <div>Error ...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length > 0 &&
          users.map((user) => {
            return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default UserList;
