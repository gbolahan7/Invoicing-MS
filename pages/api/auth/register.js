import { MongoClient } from "mongodb";
const bcrypt = require("bcrypt")


async function Register(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const { userName, email, password } = req.body;

  const db = client.db();
  const collection = db.collection("users");

  const existingUser = await collection.findOne({ email: email });
  const existingUserName = await collection.findOne({ userName: userName });
  const hashedPassword = await bcrypt.hash(password, 12)


  if (existingUser) {
    return res.status(400).json({ message: "User already exists!", statusCode: 400 });
  }

  if (existingUserName) {
    return res.status(400).json({ message: "Username already taken", statusCode: 400 });
  }

  const newUser = {
    email: email,
    password: hashedPassword,
    userName: userName,
  };

  await collection.insertOne(newUser);
  res.status(201).json({message: "User Created!", statusCode: 201})

  client.close()
}

export default Register;
