import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoutUser } from "../util/logout";
import { getInvoice } from "../util/getInvoice";
import { getToken } from "../hooks/useGetToken";

export default function Home() {
	const router = useRouter();
	const token = getToken();

	const [requestLoading, setRequestLoading] = useState(false);
	const [data, setData] = useState();

	useEffect(() => {
		if (!token) router.push("/login");

		getInvoice("/api/get-invoice", setRequestLoading, setData);
	}, []);

	return (
		<>
			<div className="main__container">
				<div className="invoice__header">
					<div className="invoice__header-logo">
						<h3>Invoices</h3>
						<p>There are total {data?.length} invoice(s)</p>
					</div>

					<p className="logout-btn" onClick={() => {
							LogoutUser();
							router.push("/login");
						}}>Logout</p>

					<Link href="/create-invoice">
						<a className="btn">Add New</a>
					</Link>
				</div>
				<div className="invoice__container">
					{requestLoading && <p>LOADING....</p>}
					{data?.length > 0
						? data?.map((invoice) => (
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
						: !requestLoading && <p>You have not created an invoice!</p>}
				</div>
			</div>
		</>
	);
}
