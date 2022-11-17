
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';
import {toast} from "react-toastify";


const EditInvoice = (props) => {
    const invoice = props.data;
    const router = useRouter();

    //invoice details still in form field when trying to edit
    const [items, setItems] = useState(invoice.items);

    const [senderStreet, setSenderStreet] = useState('');
    const [senderCity, setSenderCity] = useState('');
    const [senderPostalCode, setSenderPostalCode] = useState('');
    const [senderCountry, setSenderCountry] =useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] =useState('');
    const [customerStreet, setCustomerStreet] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerPostalCode, setCustomerPostalCode] = useState('');
    const [customerCountry, setCustomerCountry] = useState('');
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    

    // add product

    const addItem = ()=> {
        setItems([...items, {name:'', quantity:0, price:0, total:0}])
        console.log(items);
    }

    // handling of the item/product input added
    const handlerChange = (event, i)=>{
        const {name, value} = event.target;
        const list = [...items]
        list[i][name] = value;
        list[i]['total'] = list[i]['quantity'] * list[i]['price'];
        setItems(list)
    };

    //delete item/product
    const deleteItem =(i)=>{
        const inputData = [...items];
        inputData.splice(i, 1)
        setItems(inputData)
    }

   //total cost for invoice items created
   const totalCost = items.reduce((acc, curr) => acc + curr.total, 0);

   //update invoice in db

   const updateInvoice = async(invoiceId, status) => {
        try {
            console.log(invoiceId);
            const res = await fetch(`/api/edit-invoice/${invoiceId}`, {
                method: 'PUT',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderStreet:senderStreet,
                    senderCity:senderCity,
                    senderPostalCode:senderPostalCode,
                    senderCountry:senderCountry,
                    customerName: customerName,
                    customerEmail: customerEmail,
                    customerStreet: customerStreet,
                    customerCity: customerCity,
                    customerPostalCode: customerPostalCode,
                    customerCountry: customerCountry,
                    description: description,
                    createdAt: createdAt,
                    paymentDue: createdAt,
                    paymentTerms: paymentTerms,
                    status: status,
                    items: items,
                    total: totalCost,
                }),
            }, {new:true});

            const data = await res.json();
            router.push(`/invoices/${invoiceId}`);
            toast.success(data.message);
        } catch (error) {
                toast.error('There is an error!')
        }   
   };

   // retain default input 

   useEffect(() => {
    setSenderCity(invoice.senderAddress.city)
    setSenderStreet(invoice.senderAddress.street)
    setSenderPostalCode(invoice.senderAddress.postalCode)
    setSenderCountry(invoice.senderAddress.country)

    setCustomerCity(invoice.customerAddress.city)
    setCustomerStreet(invoice.customerAddress.street)
    setCustomerPostalCode(invoice.customerAddress.postalCode)
    setCustomerCountry(invoice.customerAddress.country)

    setCustomerName(invoice.customerName)
    setCustomerEmail(invoice.customerEmail)
    setDescription(invoice.description)
    setCreatedAt(invoice.createdAt)
    setPaymentTerms(invoice.paymentTerms)
   }, [invoice])

  return (
    <div className="main__container">
        <div className="new__invoice">
            <div className="new__invoice-header">
                <h3>Edit INV-{invoice.id.substr(0,6).toUpperCase()}</h3>
            </div>
            <div className="new__invoice-body">
                <div className="invoice__from">
                    <p className="invoice__heading"> Invoice From</p>
                    <div className="form__group">
                        <p>Street Address</p>
                        <input type="text" value={senderStreet} onChange={e=>setSenderStreet(e.target.value)}></input>
                    </div>
                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text" value={senderCity} onChange={e=>setSenderCity(e.target.value)}/>
                        </div>

                        <div>
                            <p>Postal Code</p>
                            <input type="text" value={senderPostalCode} onChange={e=>setSenderPostalCode(e.target.value)}/>
                        </div>

                        <div>
                            <p>Country</p>
                            <input type="text" value={senderCountry} onChange={e=>setSenderCountry(e.target.value)}/>
                        </div>
                    </div>
                </div>
            
                <div className="invoice__to">
                    <p className="invoice__heading"> Invoice to</p>
                    <div className="form__group">
                        <p>Customer Name</p>
                        <input type="text" value={customerName} onChange={e=>setCustomerName(e.target.value)}></input>
                    </div>
                    <div className="form__group">
                        <p>Customer Email</p>
                        <input type="email"  value={customerEmail} onChange={e=>setCustomerEmail(e.target.value)}></input>
                    </div>

                    <div className="form__group">
                        <p>Street Address</p>
                        <input type="text"  value={customerStreet} onChange={e=>setCustomerStreet(e.target.value)}></input>
                    </div>
                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text"  value={customerCity} onChange={e=>setCustomerCity(e.target.value)}/>
                        </div>

                        <div>
                            <p>Postal Code</p>
                            <input type="text"  value={customerPostalCode} onChange={e=>setCustomerPostalCode(e.target.value)}/>
                        </div>

                        <div>
                            <p>Country</p>
                            <input type="text"  value={customerCountry} onChange={e=>setCustomerCountry(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form__group inline__form-group">
                        <div className="inline__group">
                            <p>Invoice Date</p>
                            <input type="date"  value={createdAt} onChange={e=>setCreatedAt(e.target.value)}/>
                        </div>

                        <div className="inline__group">
                            <p>Payment Terms</p>
                            <input type="text"  value={paymentTerms} onChange={e=>setPaymentTerms(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form__group">
                        <p>Descriptiom</p>
                        <input type="text"  value={description} onChange={e=>setDescription(e.target.value)}></input>
                    </div>
                </div>


                <div className="invoice__items">
                    <h3>Product List</h3>
                    {
                        items?.map((item,i)=>(
                            <div className="item" key={i}>

                        <div className="form__group inline__form-group">
                            <div>
                                <p>Product Name</p>
                                <input type="text" name="name" value={item.name} onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Qty</p>
                                <input type="number" name="quantity" value={item.quantity} onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Price</p>
                                <input type="number" name="price" value={item.price} onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Total</p>
                                <h4>{item.total}</h4>
                            </div>
                            <div>
                            <button className="edit__btn" onClick={()=>deleteItem()}>Delete</button> 
                            </div> 
                    </div>
                </div>  
                        ))
                    }                 
            </div>
                <button className="add__item-btn" onClick={addItem}>Add New Item</button>
                <div className="new__invoice-btn" style={{justifyContent:'end'}}>
                   
                    <div>
                        <button className="draft__btn" onClick={()=> router.push(`/invoices/${invoice.id}`)}>Cancel</button>
                        <button className="mark__as-btn" onClick={()=> updateInvoice(invoice.id, invoice.status)}>Save Changes</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default EditInvoice

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

    const {invoiceId} = context.params;

    const client =  await MongoClient.connect(
                    'mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority',
                    {useNewUrlParser:true});
    const db = client.db()
    const collection = db.collection('allInvoices');
    const invoice = await collection.findOne({_id: ObjectId(invoiceId)});

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
            paymentTerms: invoice.paymentTerms
            },
        },
        revalidate:1,
    };

}