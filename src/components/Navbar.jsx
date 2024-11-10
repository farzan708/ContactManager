import { useLocation } from "react-router-dom";
import SerachContact from "./contact/SearchContact";

import { Purple, Background } from "../helpers/colors.js";

const Navbar = ({ query, search }) => {
  const location = useLocation();
  return (
    <nav
      className="nabbar navbar-dark navbar-expand-sm shadow-lg mt-2"
      style={{ backgroundColor: Background }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: Purple }} />
              وب اپلیکیشن مدیریت <span style={{ color: Purple }}>مخاطبین</span>
            </div>
          </div>
          {location.pathname === "/contacts" ? (
            <div className="col">
              <SerachContact query={query} search={search} />
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
