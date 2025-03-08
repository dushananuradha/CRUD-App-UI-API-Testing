import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { getNames } from 'country-list';

const UpdatePlayer = () => {
    const HOST_URL = import.meta.env.VITE_HOST_URL;
    const { playerID } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        sport: "",
        country: "",
        profile: "",
        currentStatus: true,
    });
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCountryChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            country: selectedOption.value
        }));
    };

    const handleCurrentStatusChange = (status) => {
        setFormData(prevState => ({
            ...prevState,
            currentStatus: status
        }));
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
                    sport: playerData.sport,
                    country: playerData.country,
                    profile: playerData.profile,
                    currentStatus: playerData.currentStatus,
                });
            } catch (error) {
                console.error('Failed to fetch player details:', error);
            }
        };
        fetchPlayerDetails();
    }, [playerID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.sport || !formData.country || !formData.profile) {
            let emptyFields = [];
            if (!formData.name) emptyFields.push("Player name");
            if (!formData.sport) emptyFields.push("Sport");
            if (!formData.country) emptyFields.push("Country");
            if (!formData.profile) emptyFields.push("Profile");
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
                navigate('/', { state: { shouldRefresh: true } }); 
            }, 2000);
        } catch (error) {
            console.error('Failed to fetch:', error);
            setModalMessage('Failed to update player');
            setShowModal(true);
        }
    };

    const countries = getNames().map((country) => ({
        value: country,
        label: country
    }));

    return (
        <div className="create-player-container"> 
            <h1>Update Player</h1>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}> 
                {formData.profile && (
                    <div className="player-image-preview">
                        <img
                            src={formData.profile}
                            alt="Player Profile"
                      
                        />
                    </div>
                )}
                <Form onSubmit={handleSubmit} className="create-player-form" style={{ flex: 1 }}> 
                    <div className="form-grid">
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

                        <Form.Group className="mb-3" controlId="formSport">
                            <Form.Label>Sport</Form.Label>
                            <Form.Control
                                type="text"
                                name="sport"
                                placeholder="Enter sport here"
                                value={formData.sport}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Select
                                name="country"
                                classNamePrefix="custom-select"
                                options={countries}
                                value={countries.find(option => option.value === formData.country)}
                                onChange={handleCountryChange}
                                placeholder="Select a country"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProfile">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="profile"
                                placeholder="Enter player image link here"
                                value={formData.profile}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCurrentStatus">
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
                    <div style={{ margin: '0px 180px 0 auto', width: '200px'}}> 
                        <Button type="submit" className="create-player-button">Update Player</Button>
                    </div>

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
        </div>
    );
};

export default UpdatePlayer;