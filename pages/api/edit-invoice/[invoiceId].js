import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  const { invoiceId } = req.query;
  const client = await MongoClient.connect(
      'mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority',
      { useNewUrlParser: true }
  );
  const db = client.db();
  const collection = db.collection("allInvoices");

  if (req.method === "PUT") {
    await collection.updateOne(
      {
        _id: ObjectId(invoiceId),
      },
      {
        $set: {
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
        },
      }
    );

    res.status(200).json({ message: "Invoice updated successfully" });
  }

  client.close();
}

export default handler;