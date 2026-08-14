const UserCard = ({ users }) => {
  const { firstName, lastName, age, gender, photourl, about } = users || {};
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
          <button className="btn btn-success text-white">Interested</button>
          <button className="btn btn-error text-white ">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
