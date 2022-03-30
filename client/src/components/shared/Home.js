import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Card, Button} from "react-bootstrap";
import { Container, Row, Col, Image } from "react-bootstrap";

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
      console.log(res.data)
    } catch (err) {
      setError(err);
    }
  };

  // gets a random friend from our friends state
  const sample = () => {
    if (friends.length) {
      // come up with whole number 0 - friends.length -1
      const index = Math.floor(Math.random() * friends.length);
      return friends[index];
    }
    return null;
  };

  // this has no interaction with DB, only UI thing
  const removeFriendFromUI = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  // will interact with DB (update method in friends controller)
  const upVote = async (id) => {
    // this call add id to the liked_friendsin user model
    let res = await axios.put(`/api/friends/${id}`);
    // update UI
    removeFriendFromUI(id);
  };

  if (error) return <p>{JSON.stringify(error)}</p>;

  const friend = sample();
  //grab the auth state - if auth.user, then get friends
  if(!auth.user){
    return (
      <>
        <p>message: { message}</p>
        <p>please login to see friends!</p>
      </>
    )
  }
  if (friend) {
    return (
      <>
      <Link to="/my_friends">
      <Button variant="primary" size="sm" >My Friends</Button>
      </Link>
         <p>message: { message}</p>
        <br />
        <h1>Myspace</h1>
        <Container>
            <Row>
              <Col md={3}>
                <Card 
                  bg="light"
                  className="mb-3">
                <Image 
                  src={friend.avatar} 
                  className="card-img-top"
                  fluid
                  />
                  <Card.Body>
                    <Card.Title>{friend.name}</Card.Title>
                    <Card.Text>
                      <p>Age: {friend.age}</p>
                      <p>Location: {friend.location}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
        </Container>
        <div key={friend.id}>
          <section>
            
            
          </section>
          <section>
          <Button variant="primary" size="sm" onClick={() => upVote(friend.id)}>thumbs up</Button>{''} 
            <Button variant="primary" size="sm" onClick={() => removeFriendFromUI(friend.id)}>thumbs down</Button>
            
          </section>
        </div>
       
      </>
    );
  } else {
    return (
    <>
<h1>Sorry, no More Friends!</h1>;
       <Link to="my_friends">
          <Button variant="dark">My Friends</Button>
        </Link>
        </>
    );
  }
};
export default Home;