import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Image, Form } from "react-bootstrap";
import "./styles.css";

const PlayerDetails = () => {
    const { state } = useLocation();
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedPlayerId, setSelectedPlayerId] = useState("");

    useEffect(() => {
        fetchPlayers();
    }, []);

    useEffect(() => {
        if (state?.player) {
            setSelectedPlayer(state.player);
            setSelectedPlayerId(state.player._id);
        }
    }, [state]);

    useEffect(() => {
        if (selectedPlayerId && players.length > 0) {
            const player = players.find((p) => p._id === selectedPlayerId);
            setSelectedPlayer(player);
        }
    }, [selectedPlayerId, players]);

    const handlePlayerSelect = (e) => {
        const playerId = e.target.value;
        setSelectedPlayerId(playerId);
    };

    const fetchPlayers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST_URL}/getAllPlayers`);
            const playersData = await response.json();
            setPlayers(playersData);
        } catch (error) {
            console.error("Error while fetching players:", error.message);
        }
    };

    return (
        <Container className="mt-5">
    <Row className="justify-content-center">
        <h2>Player Details</h2>
        <Form.Group className="mb-3"
            style={{
                position: "fixed",
                top: "32%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "300px",
                zIndex: 1000
            }}>
            <Form.Control
                as="select"
                onChange={handlePlayerSelect}
                id="form-list"
                value={selectedPlayerId}
                style={{ width: "300px" }}
                className={!selectedPlayerId ? "placeholder-style" : ""}
            >
                <option value="" disabled hidden>
                    Select a player to view details
                </option>
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
                        className="player-profile-image" 
                    />
                </Col>
                <Col>
                    <Table striped bordered hover id="table-search-player"  style={{ marginTop: "50px" }}>
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
    </Row>
</Container>
    );
};

export default PlayerDetails;