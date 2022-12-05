import React from "react";

const Modal = (props) => {
	const { modalRef, invoice, modalToggle, deleteInvoice, requestLoading } =
		props;

	return (
		<div className="delete__modal" ref={modalRef}>
			<div className="modal">
				<h2>Confirm Deletion</h2>
				<p>
					Are you sure you want to delete invoice #
					{invoice.id.substr(0, 6).toUpperCase()}? This action cannot be
					reverted
				</p>
				<div className="details__btns modal__btns">
					<button className="edit__btn" onClick={modalToggle}>
						Cancel
					</button>
					<button
						className="delete__btn"
						onClick={() => deleteInvoice(invoice.id)}
					>
						{!requestLoading ? "Confirm" : "Deleting..."}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
