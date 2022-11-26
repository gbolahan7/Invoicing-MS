import React, { useState } from "react";
import Input from "../components/Input";

const Register = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const onInputChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };

  const createUser = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });
      const response = await res.json();

      console.log(response)

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser();
  };
  return (
    <div>
      <h1>Registration page</h1>
      <form onSubmit={handleSubmit}>
        <p>Registration</p>

        <div>
          <Input
            label="Username"
            type="text"
            placeholder="John Doe"
            name="userName"
            id="userName"
            onChange={onInputChangeHandler}
            value={inputValue.userName}
          />
          <Input
            label="Email"
            type="email"
            placeholder="john.doe@mail.com"
            name="email"
            id="email"
            onChange={onInputChangeHandler}
            value={inputValue.email}
          />
          <Input
            label="Password"
            type="password"
            placeholder="password"
            name="password"
            id="password"
            onChange={onInputChangeHandler}
            value={inputValue.password}
          />

          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
