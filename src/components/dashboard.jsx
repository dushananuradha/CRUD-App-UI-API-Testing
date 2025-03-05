import { useEffect, useState } from "react";
import { Col, Table, Row, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./styles.css";
import Modal from "react-bootstrap/Modal";

const Dashboard = () => {
    const HOST_URL = import.meta.env.VITE_HOST_URL;
    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [playerToDelete, setPlayerToDelete] = useState(null);

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
            const response = await fetch(`${HOST_URL}/deletePlayer/${id}`, {
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

    const handlePlayerInfoClick = (player) => {
        navigate(`/playerDetails`, { state: { player } });
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
                                        <th className="table-header">ID</th>
                                        <th className="table-header">Player</th>
                                        <th className="table-header">Sport</th>
                                        <th className="table-header">Country</th>
                                        <th className="table-header" colSpan="2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="table-players" className="table-players">
                                    {filteredPlayers.map((player) => (
                                        <tr key={player._id}>
                                            <td>{player._id}</td>
                                            <td>
                                                <div className="player-name-container">
                                                    {player.name}
                                                    <i
                                                        className="fa-solid fa-info-circle info-icon"
                                                        data-tooltip="Click for more info"
                                                        onClick={() => handlePlayerInfoClick(player._id)}
                                                    ></i>
                                                </div>
                                            </td>
                                            <td>{player.sport}</td>
                                            <td>{player.country}</td>
                                            <td>
                                                <div className="center-buttons">
                                                    <Button
                                                        id="btn-player-update"
                                                        variant="dark"
                                                        onClick={() => handleUpdate(player._id)}
                                                    >
                                                        Update
                                                    </Button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="center-buttons">
                                                    <Button
                                                        id="btn-player-delete"
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
                    <Button variant="secondary" onClick={handleClose} id="btn-cancel-delete">
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} id="btn-proceed-delete">
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
