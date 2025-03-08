import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom"; 
import "./styles.css";

const Header = () => {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                <Navbar.Brand className="navbar-brand-custom">Players Database</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/" className="nav-link" id="btn-home">
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/createPlayer" className="nav-link" id="btn-create-player">
                                Create Player
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/playerDetails" className="nav-link" id="btn-player-details">
                                Player Details
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;