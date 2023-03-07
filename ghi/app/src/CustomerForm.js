import React, { useState } from "react";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //#region : Handlers
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  };
  //#endregion

  //#region : Submission Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      address: address,
      phone_number: phoneNumber,
    };

    const url = "http://localhost:8090/api/customer/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const test = await response.json();
      console.log(test);
      setName("");
      setAddress("");
      setPhoneNumber("");
    }
  };
  //#endregion

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="mb-3">Add a customer</h1>
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
              <label htmlFor="name">Customer Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="address"
                placeholder="Address"
                required
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={handleAddressChange}
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="phone_number"
                placeholder="Phone Number"
                required
                type="text"
                id="phone_number"
                className="form-control"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
