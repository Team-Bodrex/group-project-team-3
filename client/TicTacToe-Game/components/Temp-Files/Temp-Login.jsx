import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  async function handleLogin(event) {
    event.preventDefault();
    try {
      //   const response = await axios({
      //     method: "POST",
      //     url: import.meta.env.VITE_API_BASE_URL + "/login",
      //     data: input,
      //   });
      //   localStorage.access_token = response.data.access_token;
      localStorage.email = input.email;
      localStorage.username = input.email;

      navigate("/chat-temp");
    } catch (error) {
      console.log(error);
      const errMsg = error.response.data.message;
      Swal.fire({
        title: "Error!",
        text: errMsg,
        icon: "error",
      });
    }
  }

  return (
    <>
      <div className="container h-screen mx-auto">
        <div className="grid grid-cols-10 h-screen place-items-center">
          <div className="col-start-2 col-span-8 sm:col-start-2 sm:col-span-8 place-items-center">
            <h2 className="text-4xl tracking-widest text-white text-opacity-70 text-center uppercase mb-14">
              <p>
                <span className="text-white text-opacity-100 text-6xl font-bold">
                  Hacktiv Legends
                </span>
              </p>
            </h2>
            <div className="grid grid-cols-10">
              <div className="col-start-2 col-span-8">
                <h2 className="text-white text-opacity-80 text-2xl text-center mb-7">
                  Login Now
                </h2>
                <div className="card px-10 py-5 sm:px-20 sm:py-10 rounded-md">
                  <form className="mt-6 mb-6 space-y-6" onSubmit={handleLogin}>
                    <div className="mb-5">
                      <label htmlFor="email-address" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="off"
                        required=""
                        className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                        placeholder="Email address"
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        required=""
                        className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                        placeholder="Password"
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-sm text-purple-900 bg-white bg-opacity-90 hover:bg-white hover:bg-opacity-80 focus:outline-none focus:ring focus:border-purple-500 focus:ring-purple-500 text-lg tracking-wider flex font-bold"
                      >
                        Log In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
