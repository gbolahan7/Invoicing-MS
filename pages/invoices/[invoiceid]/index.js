import React from 'react';
import {useRouter} from "next/router";


const InvoiceDetails= () =>{

    const router = useRouter();
    const goBack = () => router.push('/');
    return(
        <div className="main__container">
            <div className="back__btn">
                <h5 onClick={goBack}> Go Back</h5>
            </div>
            <div className="invoice__details-header">
             <div className="details__status">
                <p>status</p>
                <button className="pending__status">pending</button>
             </div>
             <div className="details__btns">
                <button className="edit__btn">Edit</button>
                <button className="delete__btn">Delete</button>
                <button className="mark__as-btn">Mark as Paid</button>

             </div>
            </div>

            <div className="invoice__details">
                <div className="details__box">
                    <div>
                        <h4>INV-2234</h4>
                        <p>Playstation 5 Console</p>
                    </div>
                    <div>
                        <p>135, Gresham Road</p>
                        <p>Middlesbrough</p>
                        <p>TS1 4LR</p>
                        <p>United Kingdom</p>
                    </div>
                </div>
                <div className="details__box">
                    <div>
                        <div className="invoice__date-created">
                            <p>Invoice date</p>
                            <h3>14-10-2022</h3>
                        </div>
                        <div>
                            <p className="invoice__payment">Payment Due</p>
                            <h4>17-11-2022</h4>
                        </div>
                    </div>

                    <div className="invoice__customer-add">
                        <p>Bill to:</p>
                        <h4>Abass Durodola</h4>
                        <div>
                            <p>121, Enfield Street</p>
                            <p>Middlesbrough</p>
                            <p>TS1 4TJ</p>
                            <p>United Kingdom</p>
                        </div>
                    </div>

                    <div>
                        <p> Send to:</p>
                        <h4>abass@gmail.com</h4>
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
                    <li className="list__item">
                        <div className="item__name-box">
                            <h5>iPhone 14 Pro</h5>
                        </div>
                        <div className="list__item-box"><p> 3</p></div>
                        <div className="list__item-box"><p> £500</p></div>
                        <div className="list__item-box"><h5> £1500</h5></div>
                    </li>
                </ul>
            </div>

            <div className="total__cost">
                <h5>Total Cost</h5>
                <h2>£1500</h2>
            </div>
        </div>       
    </div>
    )
}

export default InvoiceDetails;