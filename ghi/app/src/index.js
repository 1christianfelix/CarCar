import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Manufacturer data

// Vehicle data

// Automobile data

async function loadItems() {
  const manufacturerResponse = await fetch(
    "http://localhost:8100/api/manufacturers/"
  );
  const vehicleResponse = await fetch("http://localhost:8100/api/models/");
  const automobileResponse = await fetch(
    "http://localhost:8100/api/automobiles/"
  );

  if (manufacturerResponse.ok && vehicleResponse.ok && automobileResponse.ok) {
    const manufacturerData = await manufacturerResponse.json();
    const vehicleData = await vehicleResponse.json();
    const automobileData = await automobileResponse.json();

    root.render(
      <React.StrictMode>
        <App
          manufacturerData={manufacturerData}
          vehicleData={vehicleData}
          automobileData={automobileData}
        />
      </React.StrictMode>
    );
  }
}

loadItems();
