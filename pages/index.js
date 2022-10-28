import Link from "next/link";
import { useRouter } from "next/router";
import {MongoClient} from 'mongodb';


export default function Home(props) {

  const router = useRouter();
  const {data} = props;

  const navigatePage=()=> router.push('/create-invoice')
  return (
    <>
    <div className="main__container">
      <div className="invoice__header">
        <div className="invoice__header-logo">
          <h3>Invoices</h3>
          <p>There are total {data.length} invoice(s)</p>
        </div>

        <button className="btn" onClick={navigatePage}>Add New</button>
      </div>
      <div className="invoice__container">
        {
          data?.map(invoice=>(
            <Link href={`/invoices/${invoice.id}`} passRef key={invoice.id}>
          <div className="invoice__item">
            <div>
              <h5 className="invoice__id">{invoice.id.substr(0,6).toUpperCase()}</h5>
            </div>

            <div>
              <h6 className="invoice__customer">{invoice.customerName}</h6>
            </div>
            <div>
              <p className="invoice__created">{invoice.createdAt}</p>
            </div>
            <div>
              <p className="invoice__total">{invoice.total}</p>
            </div>

            <div>
              <button className="pending__status">{invoice.status}</button>
            </div>
          </div>
          
        </Link>
          ))
        }
      </div>
    </div></>
  );
}


export async function getStaticProps(){
  const client =  await MongoClient.connect(
                   'mongodb+srv://abass037:91nGVauCFFA3WNe7@cluster0.8chddws.mongodb.net/invoices?retryWrites=true&w=majority',
                  {useNewUrlParser:true});
  const db = client.db()
  const collection = db.collection('allInvoices')
  const invoices = await collection.find({}).toArray()

  return {
    props:{
      data:invoices.map(invoice=>{
        return{
          id: invoice._id.toString(),
          customerName: invoice.customerName,
          createdAt: invoice.createdAt,
          total: invoice.total,
          status: invoice.status

        }
      })
    }
  }
}