import axios from "axios";
import { BASEURL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ users }) => {
  const { _id, firstName, lastName, age, gender, photourl, about } =
    users || {};
  const dispatch = useDispatch();
  const handleSendRequests = async (status, _id) => {
    await axios.post(
      BASEURL + "/request/send/" + status + "/" + _id,
      {},
      {
        withCredentials: true,
      },
    );
    dispatch(removeUserFeed(_id));
  };
  return (
    <div className="card bg-base-100 w-96  shadow-sm">
      <figure className="h-80">
        <img
          src={photourl}
          alt="photo"
          className="w-full h-full object-contain"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-success text-white"
            onClick={() => handleSendRequests("intrested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-error text-white "
            onClick={() => handleSendRequests("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
