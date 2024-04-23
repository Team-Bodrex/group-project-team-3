import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import socket from "../../src/socket";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  function handleSendMessage(event) {
    event.preventDefault();

    socket.emit("messages:new", {
      from: localStorage.username,
      message: newMessage,
    });

    setNewMessage("");
  }
  //bisa juga pakai socket auth untuk menggantikan localStorage username
  // console.log(socket.auth.username);

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };
    socket.disconnect().connect();
  }, []);

  useEffect(() => {
    socket.on("users:online", (onlineUsers) => {
      setUsers(onlineUsers);
    });

    socket.on("messages:info", (message) => {
      setMessages((prevMessages) => {
        return [...prevMessages, message];
      });
    });

    return () => {
      socket.off("users:online");
      socket.off("messages:info");
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
