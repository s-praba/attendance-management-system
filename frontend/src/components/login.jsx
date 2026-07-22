import { useState } from "react";
import "../Login.css";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  async function handleLogin(event) {

    event.preventDefault();

    setMessage("");


    if (email.trim() === "") {

      setMessage("Please enter your email");

      return;

    }


    if (password.trim() === "") {

      setMessage("Please enter your password");

      return;

    }


    setLoading(true);


    try {

      const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            email: email,

            password: password

          })

        }
      );


      const data = await response.json();


      if (response.ok) {

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );


        onLogin();

      } else {

        setMessage(data.message);

      }


    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );

    }


    setLoading(false);

  }


  return (

    <form
      className="login-box"
      onSubmit={handleLogin}
    >


      <div className="login-header">

        <header>
          Login
        </header>

      </div>


      <div className="input-box">

        <input

          type="email"

          id="email"

          name="email"

          className="input-field"

          placeholder="Email"

          autoComplete="off"

          value={email}

          onChange={(event) =>
            setEmail(event.target.value)
          }

        />

      </div>


      <div className="input-box">

        <input

          type="password"

          id="password"

          name="password"

          className="input-field"

          placeholder="Password"

          autoComplete="off"

          value={password}

          onChange={(event) =>
            setPassword(event.target.value)
          }

        />

      </div>


      {message && (

        <p className="login-message">

          {message}

        </p>

      )}


      <div className="input-submit">

        <button

          type="submit"

          className="submit-btn"

          disabled={loading}

        >

          {loading
            ? "Signing In..."
            : "Sign In"}

        </button>

      </div>


    </form>

  );

}

export default Login;