export const LogoutUser = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("userName");
	localStorage.removeItem("email");
	localStorage.removeItem("expirationTime");
};
