import React, { FC, useState, useEffect } from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image, Form, Button, ButtonGroup } from 'react-bootstrap';
//Images
import LogoImg from '../assets/images/logo.svg';

interface NavPanelProps {
    darkMode: boolean;
    handleDarkMode: (boolean) => void;
}

const NavPanel: FC<NavPanelProps> = ({ darkMode, handleDarkMode }) => {
    return (
        <Container fluid className={`cs-bg-one-${!darkMode ? 'light' : 'dark'} cs-transition shadow-sm p-3 rounded rounded-4 d-flex flex-row align-items-center justify-content-between`}>
            <Image
                fluid 
                src={LogoImg}
                className={`cs-transition ${!darkMode ? '' : 'cs-img-dark'}`}    
            />
            <Form.Check
                type="checkbox"
                id="cs-checkbox"
                checked={darkMode}
                onChange={handleDarkMode}
                className={`cs-checkbox cs-transition rounded rounded-3 m-0 px-3 pt-3 pb-2 cs-bg-two-${!darkMode ? 'light' : 'dark'}`}
                label=""
            />
        </Container>
    );
}

export default NavPanel;