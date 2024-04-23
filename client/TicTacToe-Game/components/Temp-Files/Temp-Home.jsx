import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import socket from "../../src/socket";

export default function Home() {
  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };
    socket.disconnect().connect();
  }, []);

  return (
    <>
      <h1>Temporary Chat Home</h1>
    </>
  );
}
