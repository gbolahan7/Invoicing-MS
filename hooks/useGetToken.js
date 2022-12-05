export function getToken() {
	let token;
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token");
	} else {
		return;
	}

	return token;
}
