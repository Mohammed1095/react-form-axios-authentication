import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <h1>Welcome to our Website!</h1>
      <p>Do you have an account?</p>
      <div className="container">
        <button
          className="btn-login"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </button>
        <h1>Or </h1>
        <button
          className="btn-register"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
