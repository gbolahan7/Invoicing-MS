import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Link from "next/link";
import { toast } from "react-toastify";
import { validateInputField } from "../util/validateInputField";

const Register = () => {
	const router = useRouter();
	const [inputValue, setInputValue] = useState({
		email: "",
		password: "",
		userName: "",
	});
	const [error, setError] = useState({});
	const [requestLoading, setRequestLoading] = useState(false);
	const isError = Object.values(error).some((value) => value);

	const onInputChangeHandler = (e) => {
		const { name, value, type } = e.target;

		setInputValue({ ...inputValue, [name]: value });

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

	const createUser = async () => {
		try {
			setRequestLoading(true);
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputValue),
			});
			const response = await res.json();

			if (response.statusCode === 400) {
				toast.error(response.message);
				setRequestLoading(false);
				return;
			}
			setRequestLoading(false);
			router.push("/");
		} catch (error) {
			setRequestLoading(false);
			toast.error(error.message);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		createUser();
	};
	return (
		<div className="auth">
			<form onSubmit={handleSubmit} className="auth-form">
				<p className="auth-form__heading">Registration</p>

				<div>
					<Input
						label="Username"
						type="text"
						placeholder="John Doe"
						name="userName"
						id="userName"
						onChange={onInputChangeHandler}
						onBlur={onInputBlurHandler}
						error={error}
						value={inputValue.userName}
					/>
					<Input
						label="Email"
						type="email"
						placeholder="john.doe@mail.com"
						name="email"
						id="email"
						onChange={onInputChangeHandler}
						onBlur={onInputBlurHandler}
						error={error}
						value={inputValue.email}
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
						value={inputValue.password}
					/>

					<div className="auth-controls">
						<button type="submit" className="auth-button">
							{requestLoading ? "Registering..." : "Register"}
						</button>
						<Link href="/login">
							<a>Login here</a>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Register;
