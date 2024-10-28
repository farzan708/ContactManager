import {Purple} from '../../helpers/colors'
const SerachContact = () => {
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-addon1"
        style={{ backgroundColor: Purple }}
      >
        <i className="fas fa-search"></i>
      </span>
      <input
        dir="rtl"
        type="text"
        style={{  borderColor: Purple }}
        className="form-control"
        placeholder="جستجوی مخاطب"
        aria-label="Search"
        aria-description="basic-addon1"
      />
    </div>
  );
};
export default SerachContact;
