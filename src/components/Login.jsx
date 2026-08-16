import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASEURL } from "../utils/Constant";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogginForm, setIsLogginForm] = useState(true);
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
      setError("");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASEURL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      setError("");
      return navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-15">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center ">
            {isLogginForm ? "Login" : "SignUp"}
          </h2>
          {!isLogginForm && (
            <>
              <label className="input">
                <input
                  type="text"
                  className="grow"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </label>
              <label className="input">
                <input
                  type="text"
                  className="grow"
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </label>
            </>
          )}

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
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center  my-2">
            <button
              className="btn btn-primary"
              onClick={isLogginForm ? handleLogin : handleSignUp}
            >
              {isLogginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="flex justify-center cursor-pointer font-semibold"
            onClick={() => setIsLogginForm((value) => !value)}
          >
            {isLogginForm
              ? "New User? Signup here"
              : "Existing user, Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
