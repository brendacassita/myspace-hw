import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

// this page should show unliked cats for a logged in user
const Home = () => {
  const auth = useContext(AuthContext)
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // load friends on mount
  useEffect(() => {
   
   
    // only if user
    if(auth.user){
      getFriends();
    }
  }, []);



  // axios call to get friends
  const getFriends = async () => {
    try {
      let res = await axios.get("/api/friends");
      setFriends(res.data);
    } catch (err) {
      setError(err);
    }
  };

  // gets a random cat from our cat state
  const sample = () => {
    if (friends.length) {
      // come up with whole number 0 - cats.length -1
      const index = Math.floor(Math.random() * friends.length);
      return friends[index];
    }
    return null;
  };

  // this has no interaction with DB, only UI thing
  const removeFriendFromUI = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  // will interact with DB (update method in cats controller)
  const upVote = async (id) => {
    // this call add id to the liked_cats in user model
    let res = await axios.put(`/api/friends/${id}`);
    // update UI
    removeFriendFromUI(id);
  };

  if (error) return <p>{JSON.stringify(error)}</p>;

  const friend = sample();
  if(!auth.user){
    return (
      <>
        <p>message: { message}</p>
        <p>you need to log in to see friends</p>
      </>
    )
  }
  if (friend) {
    return (
      <>
         <p>message: { message}</p>
        <br />
        <h1>Myspace</h1>
        <br />
        <div key={friend.id}>
          <img src={friend.avatar} />
          <section>
            <h3>{friend.name}</h3>
            
          </section>
          <section>
            <button onClick={() => removeFriendFromUI(friend.id)}>thumbs down</button>
            <button onClick={() => upVote(friend.id)}>thumbs up</button>
          </section>
        </div>
        <Link to="/my_friends">
          <button>My Friends</button>
        </Link>
      </>
    );
  } else {
    return (
      <>
        <h1>No More Friends</h1>
        <Link to="/my_friends">
          <button>My Friends</button>
        </Link>
      </>
    );
  }
};
export default Home;