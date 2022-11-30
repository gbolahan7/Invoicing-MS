export const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjustedExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjustedExpirationTime - currentTime;

	return remainingDuration;
};
