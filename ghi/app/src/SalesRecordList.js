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

 // List aLL if no employee selected


  //#region : Handler functions

    const handleSalesPersonChange = (event) => {
      const value = event.target.value
      let filteredList = allSales.filter((record) => {return record['sales_person']['href']==value})
      setSalesPerson(value)
      setSalesRecords(filteredList)
    }


  //#endregion
  let listAll = 'table table-striped'
  let listRecord = 'table table-striped'
  let tableName = 'Displaying all records'
  if(salesPerson == ''){
    listAll = "table table-striped"
    listRecord = "table table-striped d-none"
    tableName = 'Displaying all records'
   } else{
    listAll = "table table-striped d-none"
    listRecord = "table table-striped"
    tableName = `Displaying records for employee: ${salesPerson.match(/(\d+)/)[0]}`
   }

  return (
    <div className="row">
      <h1 className="mt-3 mb-3 p-0">Sales Records</h1>
      <select className="mb-4" onChange={handleSalesPersonChange}>
        <option value="">(All Records) - Select a sales person</option>
        {salesPersons.map((person) => {
          return (
            <option key={person['href']} value={person['href']}>{person['name']}</option>
          )
        })}
      </select>
      <h3 className="p-0">{tableName}</h3>
      <table className={listRecord}>
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
      <table className={listAll}>
        <thead>
          <tr>
            <th scope="col">Sales person</th>
            <th scope="col">Employee number</th>
            <th scope="col">Customer</th>
            <th scope="col">VIN</th>
            <th scope="col">Sale price</th>
          </tr>
        </thead>
        <tbody>
          {allSales.map((record) => {
            return (
              <tr key={record['href']}>
                <td>{record.sales_person.name}</td>
                <td>{record.sales_person.employee_number}</td>
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
