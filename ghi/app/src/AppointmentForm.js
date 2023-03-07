import { useEffect, useState } from "react";


const AppointmentForm = () => {
    const [vin, setVin] = useState("");
    const [owner, setOwner] = useState("");
    const [dateTime, setDateTime] = useState("");
	const [technicians, setTechnicians] = useState([]);
	const [selectedTechnician, setSelectedTechnician] = useState("");
	const [reason, setReason] = useState([]);
	const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchTechnicians = async () => {
            const url = "http://localhost:8080/api/technicians/";
            const response = await fetch(url);
            
        }
    })
}
