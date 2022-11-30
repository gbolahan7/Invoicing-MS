function validateText(inputValue) {
	if (inputValue.length <= 4) {
		return "Min. 5 Characters";
	} else {
		return "";
	}
}

function validateEmail(inputValue) {
	const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (!mailFormat.test(inputValue)) {
		return "Wrong Format";
	} else {
		return "";
	}
}

export function validateInputField(inputValue, inputType) {
	if (inputValue === "") return "Can't be empty!";

	if (inputType === "text") return validateText(inputValue);

	if (inputType === "email") return validateEmail(inputValue);

	return "";
}
