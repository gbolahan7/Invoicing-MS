import React, {useState, useRef} from 'react'
import { useRouter } from 'next/router';

const CreateInvoice = () => {

    const router = useRouter();
    const [items, setItems] = useState([]);

    // add product

    const addItem = ()=> {
        setItems([...items, {name:'', quantity:0, price:0, total:0}])
        // console.log(items);
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
                        <input type="text"></input>
                    </div>
                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text"/>
                        </div>

                        <div>
                            <p>Postal Code</p>
                            <input type="text"/>
                        </div>

                        <div>
                            <p>Country</p>
                            <input type="text"/>
                        </div>
                    </div>
                </div>
            
                <div className="invoice__to">
                    <p className="invoice__heading"> Invoice to</p>
                    <div className="form__group">
                        <p>Customer Name</p>
                        <input type="text"></input>
                    </div>
                    <div className="form__group">
                        <p>Customer Email</p>
                        <input type="email"></input>
                    </div>

                    <div className="form__group">
                        <p>Street Address</p>
                        <input type="text"></input>
                    </div>
                    <div className="form__group inline__form-group">
                        <div>
                            <p>City</p>
                            <input type="text"/>
                        </div>

                        <div>
                            <p>Postal Code</p>
                            <input type="text"/>
                        </div>

                        <div>
                            <p>Country</p>
                            <input type="text"/>
                        </div>
                    </div>

                    <div className="form__group inline__form-group">
                        <div className="inline__group">
                            <p>Invoice Date</p>
                            <input type="date"/>
                        </div>

                        <div className="inline__group">
                            <p>Payment Terms</p>
                            <input type="text"/>
                        </div>
                    </div>

                    <div className="form__group">
                        <p>Descriptiom</p>
                        <input type="text"></input>
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
                                <input type="text" name="name" onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Qty</p>
                                <input type="number" name="quantity" onChange={e=>handlerChange(e,i)}/>
                            </div>

                            <div>
                                <p>Price</p>
                                <input type="number" name="price" onChange={e=>handlerChange(e,i)}/>
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
                <div className="new__invoice-btn">
                    <button className="edit__btn" onClick={ () => router.push('/')}>Discard</button>
                    <div>
                        <button className="draft__btn">Save as draft</button>
                        <button className="mark__as-btn">Send & Save</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  );
};

export default CreateInvoice