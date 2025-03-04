import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

const GetPlayers = () => {
    const HOST_URL = import.meta.env.VITE_HOST_URL;
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch(`${HOST_URL}/getAllPlayers`);
                const playersData = await response.json();
                setPlayers(playersData);
            } catch (error) {
                console.error("Error while fetching players:", error.message);
            }
        }
        fetchPlayers();
    }, []);

    return (
        <div>
            <h1>GetPlayers</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Player</th>
                        <th>Sport</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => {
                        <tr>
                            <td>{player._id}</td>
                            <td>{player.name}</td>
                            <td>{player.sport}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default GetPlayers;