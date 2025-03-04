import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

const UpdatePlayer = () => {
    const HOST_URL = import.meta.env.VITE_HOST_URL;

    const { playerID } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        sport: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                const response = await fetch(`${HOST_URL}/getPlayerByID/${playerID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const playerData = await response.json();
                setFormData({
                    name: playerData.name,
                    sport: playerData.sport
                });
            } catch (error) {
                console.error('Failed to fetch player details:', error);
            }
        };
        fetchPlayerDetails();
    }, [playerID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.sport) {
            let emptyFields = [];
            if (!formData.name) emptyFields.push("Player name");
            if (!formData.sport) emptyFields.push("Sport");
            setModalMessage(`The following fields are empty: ${emptyFields.join(", ")}`);
            setShowModal(true);
            return;
        }
        try {
            const response = await fetch(`${HOST_URL}/updatePlayer/${playerID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setModalMessage(`Player ${formData.name} updated successfully`);
            setShowModal(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Failed to fetch:', error);
            setModalMessage('Failed to update player');
            setShowModal(true);
        }
    };

    return (
        <div>
            <h1>UpdatePlayer</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Player Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter player name here"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formSport">
                    <Form.Label>Sport</Form.Label>
                    <Form.Control
                        type="text"
                        name="sport"
                        placeholder="Enter sport here"
                        value={formData.sport}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">Update Player</Button>

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
            </Form>
        </div>
    )
}

export default UpdatePlayer;