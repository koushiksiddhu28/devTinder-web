const UserCard = ({ users }) => {
  const { firstName, lastName, age, gender, photourl, about } = users;
  return (
    <div className="card bg-base-100 w-96  shadow-sm">
      <figure className="h-70">
        <img src={users.photourl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary ">Interested</button>
          <button className="btn btn-secondary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
