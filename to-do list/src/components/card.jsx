import { useState } from "react";

function UserCard(props) {
  const { name, age } = props;

  const [myage, setmyAge] = useState(age);
  return (
    <div>
      <h2>{name}</h2>
      <p>{myage}</p>

      {myage < 20 && "Young"}
      {myage >= 20 && "Adult"}
      <button onClick={() => setmyAge(myage + 1)}>Age++</button>
      <button
        onClick={() => {
          if (myage > age) setmyAge(myage - 1);
        }}
      >
        age--
      </button>
      <br />
      <br />
    </div>
  );
}

export default UserCard;
