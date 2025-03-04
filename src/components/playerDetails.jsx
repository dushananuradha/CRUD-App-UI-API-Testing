import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";

const PlayerDetails = () => {
  const HOST_URL = import.meta.env.VITE_HOST_URL;
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${HOST_URL}/getAllPlayers`);
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
          <Form.Group>
            <Form.Control as="select" onChange={handlePlayerSelect}>
              <option value="">Select a player</option>
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {selectedPlayer && (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Sport</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPlayer.name}</td>
                  <td>{selectedPlayer.sport}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PlayerDetails;
