import React, { FC, useState, useEffect } from 'react';
//Components
import './ExtensionPageStyle.css';
import NavPanel from './NavPanel.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image, Form, Button, ButtonGroup } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import LogoImg from '../assets/images/logo.svg';
import DarkModeImg from '../assets/images/icon-moon.svg';
import LightModeImg from '../assets/images/icon-sun.svg';

interface ExtensionProps {
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
}

const ExtensionPage: FC = () => {
    const [items, setItems] = useState<ExtensionProps[]>([]);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/MrSeager/browser-extensions/refs/heads/main/src/data.json').then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <Container fluid className={`px-5 cs-transition cs-bg-${!darkMode ? 'light' : 'dark'} d-flex flex-column align-items-center gap-4 py-5 min-vh-100`}>
            <NavPanel 
                darkMode={darkMode}
                handleDarkMode={handleDarkMode}
            />

            <Container fluid className='mt-5 d-flex flex-row align-items-center justify-content-between px-0'>
                <h1 className={`cs-fw-700 cs-transition cs-tc-one-${!darkMode ? 'light' : 'dark'}`}>Extensions List</h1>
                <ButtonGroup className='gap-3'>
                    <Button className={`px-3 cs-fw-500 rounded-pill cs-btn-${!darkMode ? 'light' : 'dark'} shadow-sm`}>All</Button>
                    <Button className={`px-3 cs-fw-500 rounded-pill cs-btn-${!darkMode ? 'light' : 'dark'} shadow-sm`}>Active</Button>
                    <Button className={`px-3 cs-fw-500 rounded-pill cs-btn-${!darkMode ? 'light' : 'dark'} shadow-sm`}>Inactive</Button>
                </ButtonGroup>
            </Container>

            <Row className=''>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <Col lg={4} md={6} xs={12} className='p-1'>
                            <Row className={`border cs-transition cs-bg-one-${!darkMode ? 'light' : 'dark'} h-100 shadow-sm rounded rounded-4 m-0 px-3 py-3`}>
                                <Col xs={2} className='px-1'>
                                    <Image
                                        fluid
                                        className='w-100'
                                        src={'https://raw.githubusercontent.com/MrSeager/browser-extensions/refs/heads/main/src/' + item.logo.replace('.', '')} 
                                    />
                                </Col>
                                <Col xs={10}>
                                    <h2 className='cs-fw-700 cs-tc-one-light h3'>{item.name}</h2>
                                    <p className='cs-tc-two-light'>{item.description}</p>
                                </Col>
                                <Col xs={12} className='px-1 d-flex flex-row align-items-center justify-content-between'>
                                    <Button className='rounded-pill cs-fw-700 cs-tc-one-light cs-btn-two-light'>Remove</Button>
                                    <Form.Check
                                        type="switch"
                                        id="cs-switch"
                                        className='cs-switch'
                                        label=""
                                        checked={item.isActive}
                                        onChange={() => {
                                            const updatedItems = items.map((currentItem, i) =>
                                                i === index ? { ...currentItem, isActive: !currentItem.isActive } : currentItem
                                            );
                                            setItems(updatedItems);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    )
                )) : <p>Loading....</p>}
            </Row>
        </Container>
    );
}

export default ExtensionPage;