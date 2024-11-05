import Contact from "./Contact";
import { CurrentLine, Orange, Pink } from "../../helpers/colors";
import Spinner from '../Spinner';
// import NotFound from "../../assets/no-found.gif";

const Contacts = ({ contacts, loading }) => {
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3">
                <button
                  className="btn mx-2 mt-2"
                  style={{ backgroundColor: Pink }}
                >
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2"></i>
                </button>
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
              contacts.map((c) => <Contact key={c.id} contacts={c} />)
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
