import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASEURL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photourl, setphotourl] = useState(user.photourl || "");
  const [age, setage] = useState(user.age || "");
  const [gender, setgender] = useState(user.gender || "");
  const [about, setabout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  async function saveChanges() {
    setError("");
    try {
      const res = await axios.patch(
        BASEURL + "/profile/edit",
        {
          firstName,
          lastName,
          photourl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  }
  return (
    <>
      <div className="flex justify-center px-4 py-6">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-4">
          <legend className="fieldset-legend text-xl">Edit Profile</legend>

          <label className="fieldset-legend ">First Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label className="fieldset-legend ">Last Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="fieldset-legend ">Photo Url</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Photo Url"
            value={photourl}
            onChange={(e) => setphotourl(e.target.value)}
          />
          <label className="fieldset-legend ">Age</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Age"
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <select
              className="select w-full"
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            >
              <option disabled={true} value="">
                Select Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="others">others</option>
            </select>
            <span className="label">Optional</span>
          </fieldset>
          <label className="fieldset-legend ">About</label>
          <input
            type="text"
            className="input w-full"
            placeholder="About"
            value={about}
            onChange={(e) => setabout(e.target.value)}
          />
          <p className="text-red-500">{error}</p>
          <button className="btn btn-neutral mt-2" onClick={saveChanges}>
            Save Profile
          </button>
        </fieldset>
        <UserCard
          users={{ firstName, lastName, photourl, age, gender, about }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
