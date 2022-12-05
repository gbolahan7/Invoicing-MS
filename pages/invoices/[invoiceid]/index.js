import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getInvoice } from "../../../util/getInvoice";
import { getToken } from "../../../hooks/useGetToken";
import { deleteInvoice } from "../../../util/deleteInvoice";
import { updateInvoiceStatus } from "../../../util/updateInvoice";
import { formatPrice } from "../../../util/formatPrice";
import Modal from "../../../components/Modal";

const InvoiceDetails = () => {
	const router = useRouter();
	const token = getToken();
	const { invoiceId } = router.query;
	const modalRef = useRef(null);

	const [requestLoading, setRequestLoading] = useState(false);
	const [data, setData] = useState();

	const invoice = data && data[0];

	useEffect(() => {
		if (!token) return router.push("/login");

		if (invoiceId) {
			getInvoice(
				`/api/getOne-invoice/${invoiceId}`,
				setRequestLoading,
				setData
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invoiceId]);

	const modalToggle = () => modalRef.current.classList.toggle("showModal");

	return (
		<div className="main__container">
			{requestLoading && <p>LOADING....</p>}
			{invoice && (
				<>
					<div className="back__btn">
						<h5 onClick={router.back}> Go Back</h5>
					</div>
					<div className="invoice__details-header">
						<div className="details__status">
							<p>status</p>
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
						<div className="details__btns">
							<button
								className="edit__btn"
								onClick={() => router.push(`/edit-invoice/${invoice.id}`)}
							>
								Edit
							</button>

							<Modal
								invoice={invoice}
								modalRef={modalRef}
								requestLoading={requestLoading}
								modalToggle={modalToggle}
								deleteInvoice={() =>
									deleteInvoice(invoiceId, token, router, setRequestLoading)
								}
							/>

							<button className="delete__btn" onClick={modalToggle}>
								Delete
							</button>
							{invoice.status !== "paid" && (
								<button
									onClick={() =>
										updateInvoiceStatus(
											invoiceId,
											setRequestLoading,
											token,
											setData
										)
									}
									className="mark__as-btn"
								>
									{!requestLoading ? "Mark as Paid" : "Marking..."}
								</button>
							)}
						</div>
					</div>

					<div className="invoice__details">
						<div className="details__box">
							<div>
								<h4>{invoice.id.substr(0, 6).toUpperCase()}</h4>
								<p>{invoice.description}</p>
							</div>
							<div>
								<p>{invoice.senderAddress.street}</p>
								<p>{invoice.senderAddress.city}</p>
								<p>{invoice.senderAddress.postalCode}</p>
								<p>{invoice.senderAddress.country}</p>
							</div>
						</div>
						<div className="details__box">
							<div>
								<div className="invoice__date-created">
									<p>Invoice date</p>
									<h3>{invoice.createdAt}</h3>
								</div>
								<div>
									<p className="invoice__payment">Payment Due</p>
									<h4>{invoice.paymentDue}</h4>
								</div>
							</div>

							<div className="invoice__customer-add">
								<p>Bill to:</p>
								<h4>{invoice.customerName}</h4>
								<div>
									<p>{invoice.customerAddress.street}</p>
									<p>{invoice.customerAddress.city}</p>
									<p>{invoice.customerAddress.postalCode}</p>
									<p>{invoice.senderAddress.country}</p>
								</div>
							</div>

							<div>
								<p> Send to:</p>
								<h4>{invoice.customerEmail}</h4>
							</div>
						</div>
						<div className="invoice__item-box">
							<ul className="list">
								<li className="list__item">
									<p className="item__name-box">Item Name</p>
									<p className="list__item-box">Quantity</p>
									<p className="list__item-box">Price</p>
									<p className="list__item-box">Total</p>
								</li>

								{invoice.items?.map((item, index) => (
									<li className="list__item" key={index}>
										<div className="item__name-box">
											<h5>{item.name}</h5>
										</div>
										<div className="list__item-box">
											<p> {item.quantity}</p>
										</div>
										<div className="list__item-box">
											<p> £{item.price}</p>
										</div>
										<div className="list__item-box">
											<h5> £{item.total}</h5>
										</div>
									</li>
								))}
							</ul>
						</div>

						<div className="total__cost">
							<h5>Total Cost</h5>
							<h2>{formatPrice(invoice.total)}</h2>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default InvoiceDetails;
