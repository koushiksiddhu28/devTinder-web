import axios from "axios";
import { BASEURL } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASEURL + "/users/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) {
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  }
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10">No Connections Found!!</h1>
    );
  return (
    <div className="w-full max-w-md mx-auto bg-base-100 rounded-2xl shadow-md overflow-hidden">
      <div className="px-5 py-4">
        <h1 className="text-2xl font-bold">Connections</h1>
      </div>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photourl, age, gender, about } =
          connection;
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
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
