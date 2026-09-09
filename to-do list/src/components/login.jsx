import React, { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async () => {
    const url = "https://notes-app-mern-x3rp.onrender.com/login";
    try {
      const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!req.ok) throw new Error("Invalid Credential");

      const data = await req.json();
      localStorage.setItem("token", data.token);
      console.log("Logged-in successfully");
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h3>Login Page</h3>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
