import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";

import SalesPersonForm from "./SalesPersonForm";
import CustomerForm from "./CustomerForm";

function App() {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
