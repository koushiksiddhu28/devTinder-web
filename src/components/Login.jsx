import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASEURL } from "../utils/Constant";

const Login = () => {
  const [email, setEmail] = useState("koushik@gmail.com");
  const [password, setPassword] = useState("Koushik@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASEURL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-15">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center ">Login</h2>
          <label className="input">
            <input
              type="email"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label className="input">
            <input
              type="text"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
