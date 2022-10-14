import Link from "next/link";
import { useRouter } from "next/router";


export default function Home() {

  const router = useRouter();

  const navigatePage=()=> router.push('/add-new')
  return (
    <>
    <div className="main__container">
      <div className="invoice__header">
        <div className="invoice__header-logo">
          <h3>Invoices</h3>
          <p>There are no invoices</p>
        </div>

        <button className="btn" onClick={navigatePage}>Add New</button>
      </div>
      <div className="invoice__container">
        <Link href={`/invoices/id`} passRef>
          <div className="invoice__item">
            <div>
              <h5 className="invoice__id">INV-2234</h5>
            </div>

            <div>
              <h6 className="invoice__customer"></h6>
            </div>
            <div>
              <p className="invoice__created">13/10/2022</p>
            </div>
            <div>
              <p className="invoice__total">£550</p>
            </div>

            <div>
              <button className="pending__status">Pending</button>
            </div>
          </div>
        </Link>
      </div>
    </div></>
  )
}
