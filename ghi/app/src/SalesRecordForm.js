import React, { useEffect, useState } from "react";

const SalesRecordForm = (props) => {

  // DropDown
  const [automobiles, setAutomobiles] = useState(props.automobile_list);
  const [salesPersons, setSalesPersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [warning, setWarning] = useState('');
  const [alert, setAlert] = useState('d-none');
  const [forSale, setForSale] = useState([]);



  // Fetching SalesPersons and Customers list
  const fetchData = async () => {
    const salesPersonRes = await fetch(
      "http://localhost:8090/api/sales_person/"
    );
    const customerRes = await fetch("http://localhost:8090/api/customer/");
    const autoVORes = await fetch("http://localhost:8090/api/automobileVO/")
    if (salesPersonRes.ok && customerRes.ok && autoVORes) {
      const salesPersonData = await salesPersonRes.json();
      const customerData = await customerRes.json();
      const autoVOData = await autoVORes.json();
      setSalesPersons(salesPersonData["sales_people"]);
      setCustomers(customerData["customers"]);
      let filteredList = []
      autoVOData["AutoVO"].forEach(auto => {if(auto.sold === false) filteredList.push(auto.vin)})
      setForSale(filteredList)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Data
  const [automobile, setAutomobile] = useState("");
  const [salesPerson, setSalesPerson] = useState("");
  const [customer, setCustomer] = useState("");
  const [salePrice, setSalePrice] = useState("");

  //#region : Handler Functions
  let vinTarget = null
  const handleAutomobile = (event) => {
    const value = event.target.value;
    setAutomobile(value);
    vinTarget = value
  };
  const handleSalesPerson = (event) => {
    const value = event.target.value;
    setSalesPerson(value);
  };
  const handleCustomer = (event) => {
    const value = event.target.value;
    setCustomer(value);
  };
  const handleSalePrice = (event) => {
    const value = event.target.value;
    setSalePrice(value);
  };
  //#endregion

  //#region : submission handler

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      automobile: automobile,
      sales_person: salesPerson,
      customer: customer,
      sale_price: salePrice,
    };
    const url = "http://localhost:8090/api/sales_records/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    };


    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setAutomobile("");
      setSalesPerson("");
      setCustomer("");
      setSalePrice("");
      setWarning("")
      setAlert("alert alert-info offset-3 col-6 mb-0 text-center")
      setForSale((prevState)=>{
        let index = prevState.indexOf(vinTarget)
        prevState.splice(index,1)
        return prevState
      })
    }
    else {
      let responseMessage = await response.json();
      setAlert("alert alert-danger offset-3 col-6 mb-0 text-center")
      setWarning(responseMessage.message)
    }
  };
  //#endregion

  return (
      <div className="row">
        <div className={alert} role="alert">
          {warning}
        </div>
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="mb-3">Create Sales Record</h1>
            <form onSubmit={handleSubmit} id="create-sales-person-form">
              <div className="mb-3">
                <select
                  required
                  name="automobile"
                  id="automobile"
                  className="form-select"
                  value={automobile}
                  onChange={handleAutomobile}
                >
                  <option value="">{forSale.length ? 'Choose an automobile' : 'No available automobiles'}</option>
                  {automobiles.filter((auto)=>{
                    return forSale.includes(auto.vin)
                  }).map((automobile) => {
                    return (
                      <option key={automobile["vin"]} value={automobile["vin"]}>
                        {automobile.name} {automobile.year}{" "}
                        {automobile.model.manufacturer.name}{" "}
                        {automobile.model.name} - {automobile.color}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  required
                  name="sales_person"
                  id="sales_person"
                  className="form-select"
                  value={salesPerson}
                  onChange={handleSalesPerson}
                >
                  <option value="">Choose a sales person</option>
                  {salesPersons.map((salesPerson) => {
                    return (
                      <option
                        key={salesPerson["href"]}
                        value={salesPerson["name"]}
                      >
                        {salesPerson.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                  value={customer}
                  onChange={handleCustomer}
                >
                  <option value="">Choose a customer</option>
                  {customers.map((customer) => {
                    return (
                      <option key={customer["href"]} value={customer["name"]}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  name="sale_price"
                  placeholder="Sale Price"
                  required
                  type="number"
                  id="sale_price"
                  className="form-control"
                  value={salePrice}
                  onChange={handleSalePrice}
                />
                <label htmlFor="sale_price">Sale Price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default SalesRecordForm;
