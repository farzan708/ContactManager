import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import {
  AddContact,
  EditContact,
  ViewContact,
  Navbar,
  Contacts,
} from "./components";

import {
  getAllContacts,
  getAllGroups,
  createContact,
  deleteContact,
} from "./services/contactsService";

import "./App.css";
import {
  CurrentLine,
  Foreground,
  Purple,
  Yellow,
  Comment,
} from "./helpers/colors";

const App = () => {
  const [loading, setLoading] = useState(false);

  const [forceRender, setForceRender] = useState(false);

  const [getContacts, setContacts] = useState([]);

  const [getFilteredContacts, setFilteredContacts] = useState([]);

  const [getgroups, setGroups] = useState([]);

  const [getContact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "",
  });

  const [query, setQuery] = useState({ text: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();

        setContacts(contactsData);
 
        setFilteredContacts(contactsData);
        setGroups(groupData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: contactsData } = await getAllContacts();

        setContacts(contactsData);

        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [forceRender]);

  const setContactInfo = (event) => {
    setContact({ ...getContact, [event.target.name]: event.target.value });
  };

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);

      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      const response = await deleteContact(contactId);
      if (response) {
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const confirm = (contactId, ContactFullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CurrentLine,
              border: `1px solid ${Purple}`,
              borderRadius: "1rem",
            }}
            className="p-4"
          >
            <h1 style={{ color: Yellow }}>فرم پاک کردن مخاطب</h1>
            <p style={{ color: Foreground }}>
              آیا مطمئن هستید می خواید {ContactFullname} رو پاک کنی؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: Purple }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: Comment }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const contactSearch = (event) => {
    const searchText = event.target.value; // مقدار جستجو را ذخیره کنید
    setQuery({ ...query, text: searchText });
  
   
    const allContacts = getContacts.filter((contact) => {
      console.log(contact)
      // بررسی کنید که آیا fullname وجود دارد و یک رشته است
      if (typeof contact.fullname === 'string') {
        return contact.fullname.toLowerCase().includes(searchText.toLowerCase());
      }
      // اگر fullname وجود ندارد یا نوع آن رشته نیست، false برگردانید
      return false;
    });
    
    setFilteredContacts(allContacts);
  };
  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={getFilteredContacts}
              loading={loading}
              confirmDelete={confirm}
            />
          }
        />
        <Route
          path="/contacts/add"
          element={
            <AddContact
              loading={loading}
              setContactInfo={setContactInfo}
              contact={getContact}
              groups={getgroups}
              createContactForm={createContactForm}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          }
        />
      </Routes>
      {/* <Contacts contacts={getContacts} loading={loading} /> */}
    </div>
  );
};

export default App;
