import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../utils/Constant";
import axios from "axios";
import { addrequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASEURL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addrequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) {
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  }
  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests Found!!</h1>;

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASEURL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="w-full max-w-md mx-auto bg-base-100 rounded-2xl shadow-md overflow-hidden">
      <div className="px-5 py-4">
        <h1 className="text-2xl font-bold">Requests</h1>
      </div>
      {requests.map((request) => {
        const { _id, firstName, lastName, photourl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex items-center gap-3 px-5 py-3 hover:bg-base-200 transition"
          >
            <img
              className="w-14 h-14 rounded-full object-cover shrink-0"
              src={photourl}
              alt="photo"
            />

            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-500 truncate">
                  {age + ", " + gender}
                </p>
              )}
              <p className="text-sm text-gray-500 truncate">{about}</p>
            </div>
            <button
              className="btn btn-active btn-info text-white"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-active"
              onClick={() => reviewRequest("rejected", request._id)}
            >
              Reject
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
