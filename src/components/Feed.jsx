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
  if (!feed) {
    return <h1 className="flex justify-center my-10">Loading...</h1>;
  }
  if (feed.length <= 0) {
    return (
      <h1 className="flex justify-center my-10 text-2xl">
        No new users found!🙋‍♂️
      </h1>
    );
  }
  return (
    Array.isArray(feed) &&
    feed.length > 0 && (
      <div className="flex justify-center my-6">
        <UserCard users={feed[0]} />
      </div>
    )
  );
};

export default Feed;
