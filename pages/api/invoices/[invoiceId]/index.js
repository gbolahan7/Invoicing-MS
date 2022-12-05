import { MongoClient, ObjectId } from "mongodb";
const isAuth = require("../../middleware/isAuth");

async function handler(req, res, next) {
	isAuth(req, res, next);
	const { invoiceId } = req.query;
	const client = await MongoClient.connect(
		"mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority",
		{ useNewUrlParser: true }
	);
	const db = client.db();
	const collection = db.collection("allInvoices");
	const userCollection = await db.collection("users");
	const user = await userCollection.findOne({ _id: ObjectId(req.userId) });
	const invoice = await collection.findOne({ _id: ObjectId(invoiceId) });

	console.log(user);

	if (!req.isAuth) {
		return res.status(401).json({
			message: "You must be logged in to perform this operation!",
			statusCode: 401,
		});
	}

	if (user?._id.toString() !== invoice.createdBy.toString()) {
		return res.status(401).json({
			message: "You are not authorized to perform this operation!",
			statusCode: 401,
		});
	}

	if (req.method === "PUT") {
		await collection.updateOne(
			{ _id: ObjectId(invoiceId) },
			{
				$set: {
					status: "paid",
				},
			}
		);

		client.close();
		return res
			.status(201)
			.json({ message: "Update Successful", statusCode: 201 });
	}

	if (req.method === "DELETE") {
		await collection.deleteOne({ _id: ObjectId(invoiceId) });

		res
			.status(201)
			.json({ message: "Invoice deleted successfully", statusCode: 201 });
		client.close();
	}
}

export default handler;
