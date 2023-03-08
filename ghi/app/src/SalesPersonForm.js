import React, { useState } from "react";

const SalesPersonForm = () => {
  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");

  //#region : handler functions
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    setEmployeeNumber(value);
  };
  //#endregion

  //#region : form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      employee_number: employeeNumber,
    };

    const url = "http://localhost:8090/api/sales_person/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName("");
      setEmployeeNumber("");
    }
  };
  //#endregion

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="mb-3">Add a sales person</h1>
          <form onSubmit={handleSubmit} id="create-sales-person-form">
            <div className="form-floating mb-3">
              <input
                name="name"
                placeholder="Name"
                required
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={handleNameChange}
              />
              <label htmlFor="name">Employee Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="employee_number"
                placeholder="Name"
                required
                type="number"
                id="employee_number"
                className="form-control"
                value={employeeNumber}
                onChange={handleEmployeeNumberChange}
              />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalesPersonForm;
