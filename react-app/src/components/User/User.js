import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const User = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({}); // <--- this is the state variable that will hold the user data

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })(); // <--- this is the function that will be called when the component is mounted
    }, [userId]); // <--- this is the dependency array that will trigger the function to be called again if the userId changes

    return (
        <ul>
            <li>
                <strong>User Id:</strong> {userId}
            </li>
            <li>
                <strong>Username:</strong> {user.username}
            </li>
            <li>
                <strong>Email:</strong> {user.email}
            </li>
        </ul>
    );
};

export default User;