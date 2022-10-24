import {MongoClient} from 'mongodb';

//database connection
async function handler(req, res){

    const client = await MongoClient.connect('mongodb+srv://abass037:8vBghtQnSuaAQS1T@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority',
     {useNewUrlParser:true});

     if (req.method === "POST") {
        const invoice = {
          senderAddress: {
            street: req.body.senderStreet,
            city: req.body.senderCity,
            postalCode: req.body.senderPostalCode,
            country: req.body.senderCountry,
          },
          customerName: req.body.customerName,
          customerEmail: req.body.customerEmail,
          customerAddress: {
            street: req.body.customerStreet,
            city: req.body.customerCity,
            postalCode: req.body.customerPostalCode,
            country: req.body.customerCountry,
          },
          createdAt: req.body.createdAt,
          paymentDue: req.body.createdAt,
          paymentTerms: req.body.paymentTerms,
          description: req.body.description,
          status: req.body.status,
          items: req.body.items,
          total: req.body.total,
        }

        const db = client.db();
        const collection = db.collection('allInvoices');
        await collection.insertOne(invoice)

        res.status(200).json({message:'Invoice successfully added'});
        client.close()
    }
}


export default handler;