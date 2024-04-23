import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import socket from "../../src/socket";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };
    socket.disconnect().connect();
  }, []);

  useEffect(() => {
    socket.on("users:online", (onlineUsers) => {
      setUsers(onlineUsers);
      // console.log(users);
    });
    return () => {
      socket.off("users:online");
    };
  }, []);

  return (
    <>
      <h1>Temporary Chat Home</h1>
      <h2>Online Users:</h2>
      {users.map((user) => {
        return (
          <p>
            <b>{user.username}</b>
          </p>
        );
      })}
    </>
  );
}
