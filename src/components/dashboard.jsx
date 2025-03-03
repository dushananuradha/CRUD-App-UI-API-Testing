import { useEffect, useState } from "react";
import { Col, Table, Row, Container, Button, Form } from "react-bootstrap";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Dashboard = () => {
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);

    const fetchPlayers = async () => {
        try {
            const response = await fetch("http://localhost:8080/getAllPlayers");
            const playersData = await response.json();
            setPlayers(playersData);
        } catch (error) {
            console.error("Error while fetching players:", error.message);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const handleUpdate = (playerID) => {
        navigate(`/updatePlayer/${playerID}`);
    };

    const showDeleteConfirmModal = (playerID, playerName) => {
        setPlayerToDelete({ id: playerID, name: playerName });
        setShowConfirmModal(true);
    };

    const handleDelete = async () => {
        if (!playerToDelete) return;

        const { id, name } = playerToDelete;

        try {
            const response = await fetch(`http://localhost:8080/deletePlayer/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchPlayers();
                setModalMessage(`Player "${name}" deleted successfully`);
                setShowModal(true);
                setTimeout(() => {
                    handleClose();
                }, 2000);
            }
        } catch (error) {
            console.error("Error while deleting player:", error.message);
            setModalMessage("Failed to delete player");
            setShowModal(true);
        } finally {
            setShowConfirmModal(false);
            setPlayerToDelete(null);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setShowConfirmModal(false);
        setPlayerToDelete(null);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredPlayers = players.filter((player) =>
        player.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Dashboard</h1>
            <Container className="text-center">
                <Row>
                    <Col>
                        <Button variant="primary" onClick={fetchPlayers} className="mb-3">
                            Refresh Table
                        </Button>
                        <Form.Control
                            type="text"
                            placeholder="Search players"
                            value={search}
                            onChange={handleSearchChange}
                            className="mb-3 search-box"
                        />
                        {filteredPlayers.length > 0 ? (
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="dashboard-header">ID</th>
                                        <th className="dashboard-header">Player</th>
                                        <th className="dashboard-header">Sport</th>
                                        <th className="dashboard-header" colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPlayers.map((player) => (
                                        <tr key={player._id}>
                                            <td>{player._id}</td>
                                            <td>{player.name}</td>
                                            <td>{player.sport}</td>
                                            <td>
                                                <div className="center-buttons">
                                                    <Button variant="dark" onClick={() => handleUpdate(player._id)}>
                                                        Update
                                                    </Button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="center-buttons">
                                                    <Button
                                                        className="btn-custom"
                                                        onClick={() => showDeleteConfirmModal(player._id, player.name)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>Not found a match</p>
                        )}
                    </Col>
                </Row>
            </Container>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showConfirmModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this player?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
