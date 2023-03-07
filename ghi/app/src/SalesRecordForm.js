import React from "react";

const SalesRecordForm = () => {
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="mb-3">Record a new sale</h1>
          <form id="create-sales-person-form">
            <div className="mb-3">
              <select
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Choose an automobile</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Choose a sales person</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="">Choose a customer</option>
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                name="sales_price"
                placeholder="Sale Price"
                required
                type="number"
                id="sales_price"
                className="form-control"
              />
              <label htmlFor="sales_price">Sale Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalesRecordForm;
