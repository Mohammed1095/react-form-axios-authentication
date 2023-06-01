import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const User_Regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const Email_Regex = /^[a-zA-Z][a-zA-Z0-9._-]*(?=.*[@]).{8,24}$/;
const Pwd_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%&]).{8,24}$/;

function Register() {
  const navigate = useNavigate();
  //to fucus on user input on component load
  const userRef = useRef();
  //to fucus on email input on component load
  const emailRef = useRef();
  //to fucus on error on component
  const errRef = useRef();

  //state for user input
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //state for email input
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  //state for password input
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //state for matching password input
  const [pwdMatch, setPwdMatch] = useState("");
  const [validPwdMatch, setValidPwdMatch] = useState(false);
  const [pwdMatchFocus, setPwdMatchFocus] = useState(false);

  //error and success messages
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //set focus on component loading
  useEffect(() => {
    userRef.current.focus();
    emailRef.current.focus();
  }, []);

  //check userName validation
  useEffect(() => {
    setValidName(User_Regex.test(user));
  }, [user]);

  //check email validation
  useEffect(() => {
    setValidEmail(Email_Regex.test(email));
  }, [email]);

  //check password validation
  useEffect(() => {
    setValidPwd(Pwd_Regex.test(pwd));
    const match = pwd === pwdMatch;
    setValidPwdMatch(match);
  }, [pwd, pwdMatch]);

  //check if there is an error
  useEffect(() => {
    setErrMsg("");
  }, [email, user, pwd, pwdMatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = User_Regex.test(user);
    const v2 = Email_Regex.test(email);
    const v3 = Pwd_Regex.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid entry");
      return;
    }
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <button
            onClick={() => {
              navigate("/home");
            }}
          >
            Sign In
          </button>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offScreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !user ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Use letters (a-z or A-Z), numbers (0-9), periods (.), underscores
              (_), or hyphens (-).
              <br />
              Include the "@" symbol.
              <br />
              Avoid spaces or special characters (!, #, $, %, etc.).
            </p>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwdMatch && pwdMatch ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwdMatch || !pwdMatch ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setPwdMatch(e.target.value)}
              value={pwdMatch}
              required
              aria-invalid={validPwdMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setPwdMatchFocus(true)}
              onBlur={() => setPwdMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                pwdMatchFocus && !validPwdMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Passwords doesn't match.
            </p>

            <button
              disabled={
                !validName || !validPwd || !validPwdMatch ? true : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </button>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
