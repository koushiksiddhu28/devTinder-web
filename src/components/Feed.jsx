import axios from "axios";
import { BASEURL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) {
      return;
    }
    try {
      const res = await axios.get(BASEURL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-8">
        <UserCard users={feed[0]} />
      </div>
    )
  );
};

export default Feed;
