import React, { FC, useState, useEffect } from 'react';
//Components
import './ExtensionPageStyle.css';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Image, Form, Button, ButtonGroup } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import LogoImg from '../assets/images/logo.svg';

interface ExtensionProps {
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
}

const ExtensionPage: FC = () => {
    const [items, setItems] = useState<ExtensionProps[]>([]);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/MrSeager/browser-extensions/refs/heads/main/src/data.json').then((response) => {
            setItems(response.data);
        });
    }, []);

    return (
        <Container fluid className='px-5 cs-bg-light d-flex flex-column align-items-center gap-4 py-5 min-vh-100'>
            <Container fluid className='bg-white shadow-sm p-3 rounded rounded-4 d-flex flex-row align-items-center justify-content-between'>
                <Image src={LogoImg} />
                <Form.Check
                    type="checkbox"
                    id="custom-switch"
                    label=""
                />
            </Container>

            <Container fluid className='mt-5 d-flex flex-row align-items-center justify-content-between px-0'>
                <h1 className='cs-fw-700 cs-tc-one-light'>Extensions List</h1>
                <ButtonGroup className='gap-3'>
                    <Button className='px-3 cs-fw-500 rounded-pill border-0 cs-btn-light shadow-sm'>All</Button>
                    <Button className='px-3 cs-fw-500 rounded-pill border-0 cs-btn-light shadow-sm'>Active</Button>
                    <Button className='px-3 cs-fw-500 rounded-pill border-0 cs-btn-light shadow-sm'>Inactive</Button>
                </ButtonGroup>
            </Container>

            <Row className=''>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <Col lg={4} md={6} xs={12} className='p-1'>
                            <Row className='bg-white h-100 shadow-sm rounded rounded-4 m-0 px-3 py-3'>
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
                                        id="custom-switch"
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