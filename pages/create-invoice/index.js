import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CreateInvoice = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  console.log(token);

  const senderStreet = useRef("");
  const senderCity = useRef("");
  const senderPostalCode = useRef("");
  const senderCountry = useRef("");
  const customerName = useRef("");
  const customerEmail = useRef("");
  const customerStreet = useRef("");
  const customerCity = useRef("");
  const customerPostalCode = useRef("");
  const customerCountry = useRef("");
  const description = useRef("");
  const createdAt = useRef("");
  const paymentTerms = useRef("");

  // add product

  const addItem = () => {
    setItems([...items, { name: "", quantity: 0, price: 0, total: 0 }]);
    console.log(items);
  };

  // handling of the item/product input added
  const handlerChange = (event, i) => {
    const { name, value } = event.target;
    const list = [...items];
    list[i][name] = value;
    list[i]["total"] = list[i]["quantity"] * list[i]["price"];
    setItems(list);
  };

  //delete item/product
  const deleteItem = (i) => {
    const inputData = [...items];
    inputData.splice(i, 1);
    setItems(inputData);
  };

  //total cost for invoice items created
  const totalCost = items.reduce((acc, curr) => acc + curr.total, 0);

  //posting to db
  const createNewInvoice = async (status) => {
    try {
      const res = await fetch("/api/create-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          senderStreet: senderStreet.current.value,
          senderCity: senderCity.current.value,
          senderPostalCode: senderPostalCode.current.value,
          senderCountry: senderCountry.current.value,
          customerName: customerName.current.value,
          customerEmail: customerEmail.current.value,
          customerStreet: customerStreet.current.value,
          customerCity: customerCity.current.value,
          customerPostalCode: customerPostalCode.current.value,
          customerCountry: customerCountry.current.value,
          description: description.current.value,
          createdAt: createdAt.current.value,
          paymentDue: createdAt.current.value,
          paymentTerms: paymentTerms.current.value,
          status: status,
          items: items,
          total: totalCost,
        }),
      });
      const data = await res.json();

      router.push("/");
      toast.success(data.message);
    } catch (error) {
      toast.error("There is an error!");
    }
  };

  return (
    <div className="main__container">
      <div className="new__invoice">
        <div className="new__invoice-header">
          <h3>New Invoice</h3>
        </div>
        <div className="new__invoice-body">
          <div className="invoice__from">
            <p className="invoice__heading"> Invoice From</p>
            <div className="form__group">
              <p>Street Address</p>
              <input type="text" ref={senderStreet}></input>
            </div>
            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input type="text" ref={senderCity} />
              </div>

              <div>
                <p>Postal Code</p>
                <input type="text" ref={senderPostalCode} />
              </div>

              <div>
                <p>Country</p>
                <input type="text" ref={senderCountry} />
              </div>
            </div>
          </div>

          <div className="invoice__to">
            <p className="invoice__heading"> Invoice to</p>
            <div className="form__group">
              <p>Customer Name</p>
              <input type="text" ref={customerName}></input>
            </div>
            <div className="form__group">
              <p>Customer Email</p>
              <input type="email" ref={customerEmail}></input>
            </div>

            <div className="form__group">
              <p>Street Address</p>
              <input type="text" ref={customerStreet}></input>
            </div>
            <div className="form__group inline__form-group">
              <div>
                <p>City</p>
                <input type="text" ref={customerCity} />
              </div>

              <div>
                <p>Postal Code</p>
                <input type="text" ref={customerPostalCode} />
              </div>

              <div>
                <p>Country</p>
                <input type="text" ref={customerCountry} />
              </div>
            </div>

            <div className="form__group inline__form-group">
              <div className="inline__group">
                <p>Invoice Date</p>
                <input type="date" ref={createdAt} />
              </div>

              <div className="inline__group">
                <p>Payment Terms</p>
                <input type="text" ref={paymentTerms} />
              </div>
            </div>

            <div className="form__group">
              <p>Descriptiom</p>
              <input type="text" ref={description}></input>
            </div>
          </div>

          <div className="invoice__items">
            <h3>Product List</h3>
            {items?.map((item, i) => (
              <div className="item" key={i}>
                <div className="form__group inline__form-group">
                  <div>
                    <p>Product Name</p>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Qty</p>
                    <input
                      type="number"
                      name="quantity"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Price</p>
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => handlerChange(e, i)}
                    />
                  </div>

                  <div>
                    <p>Total</p>
                    <h4>{item.total}</h4>
                  </div>
                  <div>
                    <button className="edit__btn" onClick={() => deleteItem()}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="add__item-btn" onClick={addItem}>
            Add New Item
          </button>
          <div className="new__invoice-btn">
            <button className="edit__btn" onClick={() => router.push("/")}>
              Discard
            </button>
            <div>
              <button
                className="draft__btn"
                onClick={() => createNewInvoice("draft")}
              >
                Save as draft
              </button>
              <button
                className="mark__as-btn"
                onClick={() => createNewInvoice("pending")}
              >
                Send & Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
