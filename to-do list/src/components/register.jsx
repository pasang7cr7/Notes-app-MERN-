import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleReg = async () => {
    const url = "https://notes-app-mern-x3rp.onrender.com/register";

    try {
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!req.ok) throw new Error("invalid credential");

      const data = await req.json();
      localStorage.setItem("token", data.token);
      window.location.reload();
      console.log("Registered successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h3>Register Page</h3>
      <input
        type="email"
        placeholder="Email"
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

      <button onClick={handleReg}>Register</button>
    </div>
  );
}

export default Register;
