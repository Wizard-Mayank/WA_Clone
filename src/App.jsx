import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";
import PageNotFound from "./Components/PageNotFound.jsx";
import Chat from "./Components/Chat.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Profile from "./Components/Profile.jsx";
import supabase from "./supabaseClient";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      // const { data: { session }, } = await supabase.auth.getSession();

      // above line means the same, its just object destructuring
      const response = await supabase.auth.getSession();
      const data = response.data;
      const session = data.session;

      setisLoggedIn(!!session); // convert to boolean
      setLoading(false);
    };
    checkSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setisLoggedIn(!!session);

      // Handle OAuth callback
      if (event === "SIGNED_IN" && session) {
        // User successfully signed in via OAuth
        // The redirectTo in loginHandler will handle navigation

        // console.log("session", session);
        setUserData(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile
                setisLoggedIn={setisLoggedIn}
                userData={userData}
              ></Profile>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/chat/:uniqueID"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Chat setisLoggedIn={setisLoggedIn} userData={userData}></Chat>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
