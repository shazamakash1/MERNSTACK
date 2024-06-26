import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminContacts = () => {
  const { authorizationToken, API } = useAuth();
  const [contactData, setContactData] = useState([]);

  const getContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      //   console.log('Contact Data',data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete the contact by user id

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        toast.success("Contact Deleted");
        getContactsData();
      } else toast.error("Contact Deletion Failed");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <div className="container">
          <h1>Admin Contact Data</h1>
        </div>
        <div className="container admin-contacts">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((currContactData, index) => {
                const { username, email, message, _id } = currContactData;
                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{message}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteContactById(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
