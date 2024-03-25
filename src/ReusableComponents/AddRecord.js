import React, { useState } from 'react';
import axios from 'axios';

function AddRecord({ dataObject, url, bearer, fetchCustomers }) {
  const [loading, setLoading] = useState(false);

  const createCustomer = async () => {
    setLoading(true);
    try {
      await axios.post(url, dataObject, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${bearer}` } });
      fetchCustomers();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createCustomer };
}

export default AddRecord;
