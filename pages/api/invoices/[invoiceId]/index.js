import {MongoClient, ObjectId} from 'mongodb';


async function handler(req, res) {

    const {invoiceId} = req.query
    const client = await MongoClient.connect(
        'mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority',
        {useNewUrlParser:true});
        const db = client.db();
        const collection = db.collection("allInvoices");

        if(req.method ==="PUT"){
            await collection.updateOne({_id: ObjectId(invoiceId)}, {
                $set: {
                    status: "paid",
                },
            }
           );
           client.close()
        }

        if(req.method ==="DELETE") {
            await collection.deleteOne({_id: ObjectId(invoiceId)});

            res.status(200).json({message: "Invoice deleted successfully"});
            client.close();

        }
}


export default handler