import React from "react";

const Input = ({
	type,
	placeholder,
	name,
	label,
	id,
	onChange,
	onBlur,
	error,
	value,
}) => {
	return (
		<div>
			<div className="input-group">
				<label
					htmlFor={id}
					className={error && error[name] ? "auth-inputLabel__error" : null}
				>
					{label}
				</label>
				<input
					type={type}
					name={name}
					onChange={onChange}
					value={value}
					onBlur={onBlur}
					placeholder={placeholder}
					className={error && error[name] ? "auth-input__error" : null}
				/>
				<p className="input-errorMessage">{error && error[name]}</p>
			</div>
		</div>
	);
};

export default Input;
