import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import { useEffect } from "react";

function Profile(props) {
  const setisLoggedIn = props.setisLoggedIn;
  const userData = props.userData;
  const navigate = useNavigate();

  console.log("userData", userData);

  // Create user in database when component mounts (after OAuth)
  useEffect(() => {
    const manageUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from("users").upsert({
          id: user.id,
          name: user.user_metadata?.full_name || user.email,
          profile_pic: user.user_metadata?.avatar_url,
        });

        if (error) {
          console.error("error managing user upsert", error.message);
        } else {
          console.log("user managed (created or updated)");
        }
      }
    };

    manageUser();
  }, []);

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

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    const filePath = `${userData.id}/dp.jpg`;
    if (file) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      if (error) {
        console.error("error uploading profile picture");
      } else {
        console.log("profile picture uploaded");
      }
    }
  };

  return (
    <>
      <div> User Profile</div>
      {/* <div> User Data: {JSON.stringify(userData)}</div> */}
      <div>Hello, {userData.user_metadata.full_name}!</div>
      <img src={userData.user_metadata.avatar_url} alt="DP" />
      <div>Email: {userData.email}</div>
      <div>
        Upload Profile Picture:{" "}
        <input
          type="file"
          filetype="image/png image/jpeg image/webp"
          onChange={handleProfilePictureChange}
        />
      </div>
      <button
        className="logOut-btn ring-[0.1rem] mt-[6vh] w-[6vw] bg-[darkgrey] cursor-pointer"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </>
  );
}

export default Profile;
