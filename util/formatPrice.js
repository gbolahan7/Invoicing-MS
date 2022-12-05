export function formatPrice(price) {
	const formattedPrice = new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
		maximumFractionDigits: 2,
	}).format(price);

	return formattedPrice;
}
