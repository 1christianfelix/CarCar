import { useEffect, useState } from "react";



const AutomobileList = () => {
	const [automobileList, setAutomobileList] = useState([]);

	useEffect(() => {
		async function fetchSalesList() {
			const url = "http://localhost:8100/api/automobiles/";
			const response = await fetch(url);

			if (response.ok) {
				const data = await response.json();
				setAutomobileList(data.autos);
			}
		}
		fetchSalesList();
	}, []);

	return (
		<div>
			<h1 className="mt-3 mb-3 p-0">Automobile List</h1>
			<table className="table table-striped mt-4 table-hover">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Color</th>
						<th>Year</th>
						<th>Model</th>
						<th>Manufacturer</th>
					</tr>
				</thead>
				<tbody>
					{automobileList.map((automobile) => {
						return (
							<tr className="table-row" key={automobile.id}>
								<td>{automobile.vin}</td>
								<td>{automobile.color}</td>
								<td>{automobile.year}</td>
								<td>{automobile.model.name}</td>
								<td>{automobile.model.manufacturer.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default AutomobileList;
