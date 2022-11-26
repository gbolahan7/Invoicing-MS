import React, { useState } from "react";
import Input from "../components/Input";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [error, setError] = useState({ isError: false, errorMessage: "" });

  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;

    setLoginInput({ ...loginInput, [name]: value });
  };

  const loginUser = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInput),
      });

      const response = await res.json();

      if (response.statusCode === 400) {
        setError({ isError: true, errorMessage: response.message });
        return;
      }

      console.log(response)

      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);
      localStorage.setItem("userName", response.userName);
      setError({isError: false, errorMessage: ""})
    } catch (error) {
      console.log(error.message);
      setError({isError: false, errorMessage: error.message})
    }
  };

  console.log(error)

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser();
  };
  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <p>Login</p>

        <div>
          <Input
            label="Email"
            type="email"
            placeholder="john.doe@mail.com"
            name="email"
            id="email"
            onChange={onInputChangeHandler}
            value={loginInput.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="password"
            name="password"
            id="password"
            onChange={onInputChangeHandler}
            value={loginInput.password}
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
