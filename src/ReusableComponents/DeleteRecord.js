import React from 'react';
import axios from 'axios';

function DeleteRecord({ url, bearer, fetchCustomers }) {
  const handleTrashClick = async (id) => {
    try {
      await axios.get(`${url}/destroy?id=${id}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${bearer}` } });
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleTrashClick };
}

export default DeleteRecord;
