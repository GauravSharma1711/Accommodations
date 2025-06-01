import { Link } from "react-router";


const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow bg-amber-200 rounded-md ">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.avatar} alt={friend.username} />
          </div>
          <h3 className=" truncate font-bold ">{friend.username}</h3>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full text-white border-r-amber-950 bg-amber-400 px-6 py-2 rounded-4xl ">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
