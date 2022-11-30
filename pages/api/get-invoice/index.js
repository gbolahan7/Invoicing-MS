import { MongoClient } from "mongodb";
const isAuth = require("../middleware/isAuth");

export default async function handler(req, res, next) {
	const client = await MongoClient.connect(
		"mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority",
		{ useNewUrlParser: true }
	);

	isAuth(req, res, next);

	if (!req.isAuth) {
		return res.status(401).json({
			message: "You must be logged in to see invoices",
			statusCode: 401,
		});
	}

	const db = client.db();
	const collection = db.collection("allInvoices");
	const invoices = await collection.find({ createdBy: req.userId }).toArray();

	return res.status(200).json({ data: invoices, statusCode: 200 });
}
