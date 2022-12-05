import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Link from "next/link";
import { toast } from "react-toastify";
import { validateInputField } from "../util/validateInputField";
import { calculateRemainingTime } from "../util/expirationTime";
import { LogoutUser } from "../util/logout";

const Login = () => {
	const router = useRouter();

	const [loginInput, setLoginInput] = useState({ email: "", password: "" });
	const [error, setError] = useState({});
	const [requestLoading, setRequestLoading] = useState(false);

	const isError = Object.values(error).some((value) => value);

	const onInputChangeHandler = (e) => {
		const { name, value, type } = e.target;

		setLoginInput({ ...loginInput, [name]: value });

		if (isError) {
			const isValid = validateInputField(value, type);

			setError((prevState) => ({ ...prevState, [name]: isValid }));
		}
	};

	const onInputBlurHandler = (e) => {
		const { name, value, type } = e.target;

		const isValid = validateInputField(value, type);

		setError((prevState) => ({ ...prevState, [name]: isValid }));
	};

	const loginUser = async () => {
		try {
			setRequestLoading(true);
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginInput),
			});

			const response = await res.json();

			if (response.statusCode === 400) {
				toast.error(response.message);
				setRequestLoading(false);
				return;
			}

			console.log(response);

			localStorage.setItem("token", response.token);
			localStorage.setItem("email", response.email);
			localStorage.setItem("userName", response.userName);
			setRequestLoading(false);

			const expirationTime = new Date(
				new Date().getTime() + +"1200" * 1000
			).toISOString();

			localStorage.setItem("expirationTime", expirationTime);

			const remainingTime = calculateRemainingTime(expirationTime);

			console.log(remainingTime);

			setTimeout(() => {
				LogoutUser();
			}, remainingTime);

			router.push("/");
		} catch (error) {
			setRequestLoading(false);
			toast.error(error.message);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		loginUser();
	};
	return (
		<div className="auth">
			<form onSubmit={handleSubmit} className="auth-form">
				<p className="auth-form__heading">Login</p>
				<div>
					<Input
						label="Email"
						type="email"
						placeholder="john.doe@mail.com"
						name="email"
						id="email"
						onChange={onInputChangeHandler}
						onBlur={onInputBlurHandler}
						error={error}
						value={loginInput.email}
					/>
					<Input
						label="Password"
						type="password"
						placeholder="password"
						name="password"
						id="password"
						onChange={onInputChangeHandler}
						onBlur={onInputBlurHandler}
						error={error}
						value={loginInput.password}
					/>

					<div className="auth-controls">
						<button type="submit" className="auth-button">
							{requestLoading ? "Logging In..." : "Login"}
						</button>
						<Link href="/register">
							<a>Register Here</a>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
