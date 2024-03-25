import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchRecords({ dataObject, url, bearer }) {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${bearer}` } });
        const results = response.data?.data;
        setTableData(results);
      } catch (error) {
        console.error(error);
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeneficiaries();
  }, [url, bearer]);

  return { tableData, isLoading };
}

export default FetchRecords;
