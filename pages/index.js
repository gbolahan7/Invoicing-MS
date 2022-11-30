import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { LogoutUser } from "../util/logout";
// import { MongoClient } from "mongodb";

export default function Home(props) {
	const router = useRouter();
	const [data, setData] = useState([]);
	const [requestLoading, setRequestLoading] = useState(false);

	let token;
	if (typeof window !== "undefined") {
		token = localStorage.getItem("token");
	} else {
		console.log("server");
	}

	const getInvoices = async () => {
		try {
			setRequestLoading(true);
			const res = await fetch("/api/get-invoice", {
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
				id: value._id.toString(),
				customerName: value.customerName,
				createdAt: value.createdAt,
				total: value.total,
				status: value.status,
			}));

			setData(mappedData);
			setRequestLoading(false);
		} catch (error) {
			setRequestLoading(false);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		if (!token) router.push("/login");
		getInvoices();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="main__container">
				<div className="invoice__header">
					<div className="invoice__header-logo">
						<h3>Invoices</h3>
						<p>There are total {data.length} invoice(s)</p>
					</div>

					<p
						onClick={() => {
							LogoutUser();
							router.push("/login");
						}}
					>
						Logout
					</p>

					<Link href="/create-invoice">
						<a className="btn">Add New</a>
					</Link>
				</div>
				<div className="invoice__container">
					{requestLoading && <p>LOADING....</p>}
					{data.length > 0 ? (
						data?.map((invoice) => (
							<Link href={`/invoices/${invoice.id}`} passRef key={invoice.id}>
								<div className="invoice__item">
									<div>
										<h5 className="invoice__id">
											{invoice.id.substr(0, 6).toUpperCase()}
										</h5>
									</div>

									<div>
										<h6 className="invoice__customer">
											{invoice.customerName}
										</h6>
									</div>
									<div>
										<p className="invoice__created">{invoice.createdAt}</p>
									</div>
									<div>
										<p className="invoice__total">{invoice.total}</p>
									</div>

									<div>
										<button
											className={`${
												invoice.status === "paid"
													? "paid__status"
													: invoice.status === "pending"
													? "pending__status"
													: "draft__status"
											}`}
										>
											{invoice.status}
										</button>
									</div>
								</div>
							</Link>
						))
					) : (
						<p>You have not created an invoice!</p>
					)}
				</div>
			</div>
		</>
	);
}
