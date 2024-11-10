import { Link } from "react-router-dom";
import Contact from "./Contact";
import { CurrentLine, Orange, Pink } from "../../helpers/colors";
import Spinner from "../Spinner";
// import NotFound from "../../assets/no-found.gif";

const Contacts = ({ contacts, loading, confirmDelete}) => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3  float-end">
                <Link
                  to={"/contacts/add"}
                  className="btn m-2"
                  style={{ backgroundColor: Pink }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2"></i>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <section className="container">
          <div className="row">
            {contacts.length > 0 ? (
              contacts.map((c) => <Contact confirmDelete={()=>{confirmDelete(c.id,c.fullname)}} key={c.id} contacts={c} />)
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: CurrentLine }}
              >
                <p className="h3" style={{ color: Orange }}>
                  مخاطبی یافت نشد.
                </p>
                {/* <img src={NotFound} alt="پیدا نشد" /> */}
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="پیدا نشد"
                />
              </div>
            )}
            ;
          </div>
        </section>
      )}
    </>
  );
};
export default Contacts;
