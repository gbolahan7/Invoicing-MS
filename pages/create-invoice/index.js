import React from 'react'

const CreateInvoice = () => {
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

            </div>
        </div>
    </div>
  )
}

export default CreateInvoice