import { toast } from "react-toastify";
import { getInvoice } from "./getInvoice";

export async function updateInvoiceStatus(
	invoiceId,
	setRequestLoading,
	token,
	setData
) {
	try {
		setRequestLoading(true);
		const res = await fetch(`/api/invoices/${invoiceId}`, {
			method: "PUT",
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

		toast.success(data.messagae);
		setRequestLoading(false);
		getInvoice(`/api/getOne-invoice/${invoiceId}`, setRequestLoading, setData);
	} catch (error) {
		setRequestLoading(false);
		console.log(error.message);
		toast.error(error.message);
	}
}
