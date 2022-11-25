import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]); // <--- this is the state variable that will hold the users data

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData(); // <--- this is the function that will be called when the component is mounted
  }, []); // <--- this is the dependency array that will trigger the function to be called again if the userId changes

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;