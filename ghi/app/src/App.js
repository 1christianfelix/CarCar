import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";

import SalesPersonForm from "./SalesPersonForm";
import CustomerForm from "./CustomerForm";
import SalesRecordForm from "./SalesRecordForm";
import SalesRecordList from "./SalesRecordList";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";

function App(props) {
  // Reference to inventory lsit
  const manufacturer_list = props.manufacturerData["manufacturers"];
  const vehicle_list = props.vehicleData["models"];
  const automobile_list = props.automobileData["autos"];

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales_person">
            <Route index element={<SalesPersonForm />} />
          </Route>
          <Route path="customer">
            <Route index element={<CustomerForm />} />
          </Route>
          <Route path="sales_record">
            <Route index element={<SalesRecordList />} />
            <Route
              path="new"
              element={<SalesRecordForm automobile_list={automobile_list} />}
            />
          </Route>
          <Route path="vehicle">
            <Route index element={<VehicleList vehicle_list={vehicle_list} />} />
            <Route
              path="new"
              element={<VehicleForm manufacturer_list={manufacturer_list} />}
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
