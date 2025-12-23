import supabase from "../supabaseClient";

function Login() {
  const loginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/profile",
      },
    });
    if (error) {
      console.error("error", error);
    }
  };
  return (
    <div>
      <div className="row-1 h-[30vh] bg-[#25d366] flex gap-[0.4rem]">
        <img
          src="/Assets/WhatsApp.svg"
          alt="Whatsapp logo"
          className="logo h-[5vh] relative left-[20vw] top-[14vh]"
        />
        <div className="heading h-[5vh] w-[12vw] text-lg relative left-[20vw] top-[15vh]">
          Whatsapp
        </div>
      </div>
      <div className="signIn absolute w-[60vw] h-[60vh] top-[20vh] left-[20vw] border-[0.1rem] border-solid border-black rounded-[1rem] bg-white flex justify-center items-center flex-col">
        <img
          src="/Assets/Fingerprint.gif"
          alt="Fingerprint Image"
          className="fingerprint w-[5vw] absolute top-[5rem]"
        />
        <div className="logIn-text text-lg">Log In</div>
        <button
          className="logIn-btn ring-[0.1rem] mt-[6vh] w-[5vw] bg-[darkgrey] cursor-pointer"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
      <div className="row-2 ring-2 ring-black h-[70vh]"></div>
    </div>
  );
}

export default Login;
