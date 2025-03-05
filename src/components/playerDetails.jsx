import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Image, Form } from "react-bootstrap";
import "./styles.css";

const PlayerDetails = () => {
    const { state } = useLocation();
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(state?.player || null);

    const fetchPlayers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST_URL}/getAllPlayers`);
            const playersData = await response.json();
            setPlayers(playersData);
        } catch (error) {
            console.error("Error while fetching players:", error.message);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handlePlayerSelect = (e) => {
        const playerId = e.target.value;
        const player = players.find((p) => p._id === playerId);
        setSelectedPlayer(player);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2>Player Details</h2>
                    <Form.Group className="mb-3">
                        <Form.Control 
                            as="select" 
                            onChange={handlePlayerSelect} 
                            id="form-list" 
                            value={selectedPlayer ? selectedPlayer._id : ""}
                        >
                            <option value="">Select a player to view details</option>
                            {players.map((player) => (
                                <option key={player._id} value={player._id}>
                                    {player.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {selectedPlayer && (
                        <Row className="mt-3">
                            <Col md="auto">
                                <Image
                                    src={selectedPlayer.profile}
                                    alt={`${selectedPlayer.name}'s profile`}
                                    style={{ width: "250px", height: "300px" }}
                                />
                            </Col>
                            <Col>
                                <Table striped bordered hover id="table-search-player">
                                    <thead>
                                        <tr>
                                            <th className="table-header">Player Name</th>
                                            <th className="table-header">Sport</th>
                                            <th className="table-header">Country</th>
                                            <th className="table-header">Current Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{selectedPlayer.name}</td>
                                            <td>{selectedPlayer.sport}</td>
                                            <td>{selectedPlayer.country}</td>
                                            <td>{selectedPlayer.currentStatus ? "Playing" : "Retired"}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default PlayerDetails;
