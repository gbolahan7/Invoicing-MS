import { getToken } from "../hooks/useGetToken";
import { toast } from "react-toastify";

export const getInvoice = async (uri, setRequestLoading, setData) => {
	const token = getToken();

	try {
		setRequestLoading(true);
		const res = await fetch(uri, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		const responseData = await res.json();

		if (responseData.statusCode === 401) {
			setRequestLoading(false);
			toast.error(responseData.message);
			return;
		}

		const mappedData = responseData.data.map((value) => ({
			...value,
			id: value._id.toString(),
		}));

		setData(mappedData);
		setRequestLoading(false);
	} catch (error) {
		setRequestLoading(false);
		toast.error(error.message);
	}
};
