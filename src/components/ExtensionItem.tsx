import React, { FC } from 'react';
//Bootstrap
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';
//anim
import { useAnimationItem } from './anim.tsx';

interface ExtensionItemProps {
    darkMode: boolean;
    name: string;
    description: string;
    isActive: boolean;
    handleSwitchChange: (name: string) => void;
    handleRemove: (name: string) => void;
    logo: string;
    index: number;
}

const ExtensionItem: FC<ExtensionItemProps> = ({ darkMode, name, description, isActive, handleSwitchChange, handleRemove, logo, index }) => {
    const animItem = useAnimationItem(
        Math.random() < 0.5 ? -400 : 400,
        Math.random() < 0.5 ? -400 : 400,
        index * 100,
    );

    return (
        <Col lg={4} md={6} xs={12} className='p-md-1 px-0 py-1'>
            <animated.div 
                style={animItem} 
                className='h-100 w-100'>
                    
                <Row className={`border cs-transition cs-bg-one-${!darkMode ? 'light' : 'dark'} w-100 h-100 shadow-sm rounded rounded-4 m-0 px-3 py-3 cs-hover`}>
                    <Col xs={2} className='px-1 pb-2'>
                        <Image
                            fluid
                            className='w-100'
                            src={'https://raw.githubusercontent.com/MrSeager/browser-extensions/refs/heads/main/src/' + logo.replace('.', '')} 
                        />
                    </Col>
                    <Col xs={10}>
                        <h2 className={`cs-fw-700 cs-transition cs-tc-one-${!darkMode ? 'light' : 'dark'} h3`}>{name}</h2>
                        <p className={`cs-transition cs-tc-two-${!darkMode ? 'light' : 'dark'}`}>{description}</p>
                    </Col>
                    <Col xs={12} className='px-1 pt-2 d-flex flex-row align-items-center justify-content-between'>
                        <Button 
                            className={`rounded-pill cs-fw-700 cs-tc-one-${!darkMode ? 'light' : 'dark'} cs-btn-two-${!darkMode ? 'light' : 'dark'}`}
                            onClick={() => handleRemove(name)}
                        >Remove</Button>
                        <Form.Check
                            type="switch"
                            id="cs-switch"
                            className='cs-switch'
                            label=""
                            checked={isActive}
                            onChange={() => handleSwitchChange(name)}
                        />
                    </Col>
                </Row>
            </animated.div>
        </Col>
    );
}

export default ExtensionItem;