import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function Chat(props) {
  const params = useParams();
  const setisLoggedIn = props.setisLoggedIn;
  const userData = props.userData;
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      console.log("Logged out");
      setisLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <>
      <div>Chat : {params.uniqueID}</div>
      <button
        className="logOut-btn ring-[0.1rem] mt-[6vh] w-[6vw] bg-[darkgrey] cursor-pointer"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  );
}

export default Chat;
