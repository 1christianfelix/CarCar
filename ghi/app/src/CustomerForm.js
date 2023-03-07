import React, { useState } from "react";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="mb-3">Add a customer</h1>
          <form id="create-sales-person-form">
            <div className="form-floating mb-3">
              <input
                name="name"
                placeholder="Name"
                required
                type="text"
                id="name"
                className="form-control"
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
