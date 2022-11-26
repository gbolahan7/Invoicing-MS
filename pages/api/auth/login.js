import { Collection, MongoClient } from "mongodb";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function Login(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://abass02:TNZnU2PwM2bxIvS7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );

  const { email, password } = req.body;

  const db = client.db();
  const collection = db.collection("users");

  const user = await collection.findOne({ email: email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "User does not exist!", statusCode: 400 });
  }

  const userPassword = await bcrypt.compare(password, user.password);

  if (!userPassword) {
    return res
      .status(400)
      .json({ message: "Username or Password is invalid", statusCode: 400 });
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    "secret",
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login Successful!",
    token: token,
    userName: user.userName,
    email: user.email
  })
}
