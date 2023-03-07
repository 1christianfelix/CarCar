import React, { useState, useEffect } from "react";

const SalesRecordList = (props) => {
  const [salesPersons, setSalesPersons] = useState([]);
  const [salesPerson, setSalesPerson] = useState('');
  const [salesRecords, setSalesRecords] = useState([])
  const [allSales, setAllSales] = useState([]);

  const fetchData = async () => {
    const salesPersonRes = await fetch(
      "http://localhost:8090/api/sales_person/"
    );
    const salesRecordsRes = await fetch(
      "http://localhost:8090/api/sales_records/"
    );
    if (salesPersonRes.ok) {
      const salesPersonData = await salesPersonRes.json();
      const salesRecordsData = await salesRecordsRes.json();
      setSalesPersons(salesPersonData["sales_people"]);
      setAllSales(salesRecordsData["sales_records"])
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //#region : Handler functions

    const handleSalesPersonChange = (event) => {
      const value = event.target.value
      let filteredList = allSales.filter((record) => {return record['sales_person']['href']==value})
      console.log(filteredList)
      setSalesPerson(value)
      setSalesRecords(filteredList)
    }


  //#endregion

  return (
    <div className="row">
      <h1 className="mt-3 mb-3 p-0">Sales person history</h1>
      <select className="mb-4" onChange={handleSalesPersonChange}>
        <option value="">Select a sales person</option>
        {salesPersons.map((person) => {
          return (
            <option key={person['href']} value={person['href']}>{person['name']}</option>
          )
        })}
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sales person</th>
            <th scope="col">Customer</th>
            <th scope="col">VIN</th>
            <th scope="col">Sale price</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record) => {
            return (
              <tr key={record['href']}>
                <td>{record.sales_person.name}</td>
                <td>{record.customer.name}</td>
                <td>{record.automobile.vin}</td>
                <td>{record.sale_price}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesRecordList;
