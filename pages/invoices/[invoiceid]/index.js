import React, {useRef} from 'react';
import {useRouter} from "next/router";
import {MongoClient, ObjectId} from "mongodb";
import { toast } from 'react-toastify';


const InvoiceDetails= (props) =>{

    const router = useRouter();
    const {data} = props;
    const modalRef = useRef(null);

    const goBack = () => router.push('/');


    const updateStatus = async(invoiceId)=>{
        const res = await fetch(`/api/invoices/${invoiceId}`, {
            method: 'PUT',
        });
        const data = await res.json();
    };

    const deleteInvoice = async invoiceId=>{
        try {
            const res = await fetch(`/api/invoices/${invoiceId}`, {
                method: 'DELETE'
            })

            const data = await res.json()
            toast.success(data.message);
            router.push('/')
        } catch (error) {
            toast.error('There is an error!');
        }
    }

    const modalToggle =()=> modalRef.current.classList.toggle('showModal');

    return(
        <div className="main__container">
            <div className="back__btn">
                <h5 onClick={goBack}> Go Back</h5>
            </div>
            <div className="invoice__details-header">
             <div className="details__status">
                <p>status</p>
                <button className={`${data.status === "paid"? "paid__status"
              :data.status ==="pending" ? "pending__status": "draft__status"}`}>{data.status}</button>
             </div>
             <div className="details__btns">
                <button className="edit__btn" onClick={()=> router.push(`/edit-invoice/${data.id}`)}>Edit</button>

                <div className="delete__modal" ref={modalRef}>
                    <div className="modal">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete invoice #{data.id.substr(0,6).
                        toUpperCase()}? This action cannot be reverted</p>
                        <div className="details__btns modal__btns">
                            <button className="edit__btn" onClick={modalToggle}>Cancel</button>
                            <button className="delete__btn" onClick={()=>deleteInvoice(data.id)}>Confirm</button>

                        </div>
                    </div>
                </div>

                <button className="delete__btn" onClick={modalToggle}>Delete</button>
                <button onClick={()=>updateStatus(data.id)}
                className={`${
                    data.status==="paid" || data.status==="draft" ?
                     "disable" : "" } mark__as-btn`}>Mark as Paid</button>

             </div>
            </div>

            <div className="invoice__details">
                <div className="details__box">
                    <div>
                        <h4>{data.id.substr(0,6).toUpperCase()}</h4>
                        <p>{data.description}</p>
                    </div>
                    <div>
                        <p>{data.senderAddress.street}</p>
                        <p>{data.senderAddress.city}</p>
                        <p>{data.senderAddress.postalCode}</p>
                        <p>{data.senderAddress.country}</p>
                    </div>
                </div>
                <div className="details__box">
                    <div>
                        <div className="invoice__date-created">
                            <p>Invoice date</p>
                            <h3>{data.createdAt}</h3>
                        </div>
                        <div>
                            <p className="invoice__payment">Payment Due</p>
                            <h4>{data.paymentDue}</h4>
                        </div>
                    </div>

                    <div className="invoice__customer-add">
                        <p>Bill to:</p>
                        <h4>{data.customerName}</h4>
                        <div>
                            <p>{data.customerAddress.street}</p>
                            <p>{data.customerAddress.city}</p>
                            <p>{data.customerAddress.postalCode}</p>
                            <p>{data.senderAddress.country}</p>
                        </div>
                    </div>

                    <div>
                        <p> Send to:</p>
                        <h4>{data.customerEmail}</h4>
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

                    {
                        data.items?.map((item, index)=>(
                            <li className="list__item" key={index}>
                        <div className="item__name-box">
                            <h5>{item.name}</h5>
                        </div>
                        <div className="list__item-box"><p> {item.quantity}</p></div>
                        <div className="list__item-box"><p> £{item.price}</p></div>
                        <div className="list__item-box"><h5> £{item.total}</h5></div>
                    </li>
                        ))
                    }
                </ul>
            </div>

            <div className="total__cost">
                <h5>Total Cost</h5>
                <h2>£{data.total}</h2>
            </div>
        </div>       
    </div>
    )
}

export default InvoiceDetails;

export async function getStaticPaths() {
    const client =  await MongoClient.connect(
        'mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority',
        {useNewUrlParser:true});
        const db = client.db();
        const collection = db.collection("allInvoices");
      
        const invoices = await collection.find({}, { _id: 1 }).toArray();
      
        return {
          fallback: "blocking",
          paths: invoices.map((invoice) => ({
            params: {
              invoiceId: invoice._id.toString(),
            },
          })),
        };
      }

export async function getStaticProps(context){

    const {invoiceId} = context.params

    const client =  await MongoClient.connect(
                    'mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority',
                    {useNewUrlParser:true});
    const db = client.db()
    const collection = db.collection('allInvoices');
    const invoice = await collection.findOne({_id: ObjectId(invoiceId)})

    return{
        props:{
            data: {
            id: invoice._id.toString(),
            senderAddress: invoice.senderAddress,
            customerAddress: invoice.customerAddress,
            customerName: invoice.customerName,
            customerEmail: invoice.customerEmail,
            description: invoice.description,
            createdAt: invoice.createdAt,
            paymentDue: invoice.paymentDue,
            items: invoice.items,
            total: invoice.total,
            status: invoice.status,
            },
        },
        revalidate:1,
    };

}