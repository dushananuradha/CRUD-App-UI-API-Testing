import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

const CreatePlayer = () => {
    const [formData, setFormData] = useState({
        name: "",
        sport: ""
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.sport) {
            setModalMessage('Please fill in all fields');
            setShowModal(true);
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/createPlayer", {
                method: "POST",
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
            setModalMessage('Player created successfully');
            setShowModal(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Failed to fetch:', error);
            setModalMessage('Failed to create player');
            setShowModal(true);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="center-form">
            <h1>Create Player</h1>
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

                <Button variant="dark" type="submit" className="w-100">Create Player</Button>
            </Form>

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
        </div>
    );
};

export default CreatePlayer;
