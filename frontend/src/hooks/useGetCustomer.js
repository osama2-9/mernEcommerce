import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";

const useGetCustomer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerNumber, setCustomerNumber] = useState(0);
  const getUsersData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/users/get`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      }
      const dataWithoutAdmin = data.filter((user) => !user.isAdmin);
      const customerNumber = dataWithoutAdmin.length;
      setCustomerNumber(customerNumber);
      setUsers(dataWithoutAdmin);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return { users, loading, customerNumber };
};

export default useGetCustomer;
