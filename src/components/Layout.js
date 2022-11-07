import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from '../cores/useAuth'

function Layout(props) {
    var { pathname } = useLocation();
    const { logout } = useAuth();
    return (
        <div className="container">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={`nav-link ${pathname==="/" ? "active" : ""}`} to="/">Home</Link>
                        <Link className={`nav-link ${pathname==="/user" ? "active" : ""}`} to="/user">User</Link>
                        <Link className={`nav-link ${pathname==="/logs" ? "active" : ""}`} to="/logs">Log</Link>
                        <Link className='nav-link' to={'#'} onClick={logout}>Logout    </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
            {props.children}
        </div>
    );
}

export default Layout