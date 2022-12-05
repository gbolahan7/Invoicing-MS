import { toast } from "react-toastify";

export async function deleteInvoice(
	invoiceId,
	token,
	router,
	setRequestLoading
) {
	try {
		setRequestLoading(true);
		const res = await fetch(`/api/invoices/${invoiceId}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		const data = await res.json();

		if (data.statusCode === 401) {
			toast.error(data.message);
			setRequestLoading(false);
			return;
		}

		toast.success(data.message);
		setRequestLoading(false);
		router.push("/");
	} catch (error) {
		toast.error(error.message);
		setRequestLoading(false);
	}
}
