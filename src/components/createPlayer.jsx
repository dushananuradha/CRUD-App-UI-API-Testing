import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { getNames } from 'country-list';
import "./styles.css";

const CreatePlayer = () => {
    const HOST_URL = import.meta.env.VITE_HOST_URL;
    const [formData, setFormData] = useState({
        name: "",
        sport: "",
        country: "",
        profile: "",
        currentStatus: true
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.sport || !formData.country || !formData.profile) {
            setModalMessage('Please fill in all fields');
            setShowModal(true);
            return;
        }

        try {
            const response = await fetch(`${HOST_URL}/createPlayer`, {
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

    const handleCountryChange = (selectedOption) => {
        setFormData({
            ...formData,
            country: selectedOption.value
        });
    };

    const handleCurrentStatusChange = (status) => {
        setFormData({
            ...formData,
            currentStatus: status
        });
    };

    const countries = getNames().map((country) => ({
        value: country,
        label: country
    }));

    return (
        <div className="create-player-container">
            <h1>Create Player</h1>
            <Form onSubmit={handleSubmit} className="create-player-form">
                <div className="form-grid">
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Player Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            id="input-player-name"
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
                            id="input-sport"
                            placeholder="Enter sport here"
                            value={formData.sport}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Select
                            name="country"
                            classNamePrefix="custom-select"
                            id="input-country"
                            options={countries}
                            onChange={handleCountryChange}
                            placeholder="Select a country"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formProfile">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                            type="text"
                            name="profile"
                            id="input-profile-img"
                            placeholder="Enter player image link here"
                            value={formData.profile}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4 form-current-status" controlId="formCurrentStatus">
                        <Form.Label>Current Status</Form.Label>
                        <div className="radio-group">
                            <div className="radio-option">
                                <Form.Check
                                    type="radio"
                                    name="currentStatus"
                                    id="currentStatusPlaying"
                                    checked={formData.currentStatus === true}
                                    onChange={() => handleCurrentStatusChange(true)}
                                />
                                <Form.Label htmlFor="currentStatusPlaying" className="mb-0">Still Playing</Form.Label>
                            </div>
                            <div className="radio-option">
                                <Form.Check
                                    type="radio"
                                    name="currentStatus"
                                    id="currentStatusRetired"
                                    checked={formData.currentStatus === false}
                                    onChange={() => handleCurrentStatusChange(false)}
                                />
                                <Form.Label htmlFor="currentStatusRetired" className="mb-0">Retired</Form.Label>
                            </div>
                        </div>
                    </Form.Group>
                </div>
                <Button variant="dark" type="submit" className="create-player-button">Create Player</Button>
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
