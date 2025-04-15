import React, { FC } from 'react';
//Bootstrap
import { Container, Image, Form } from 'react-bootstrap';
//Spring
import { SpringValue, animated } from '@react-spring/web';
//Images
import LogoImg from '../assets/images/logo.svg';

interface NavPanelProps {
    darkMode: boolean;
    handleDarkMode: (darkMode: boolean) => void;
    animNav: {
        opacity: SpringValue<number>;
        y: SpringValue<string>;
    };
}

const NavPanel: FC<NavPanelProps> = ({ darkMode, handleDarkMode, animNav }) => {

    
    return (
        <animated.div style={animNav} className='w-100'>
            <Container fluid className={`w-100 cs-bg-one-${!darkMode ? 'light' : 'dark'} cs-transition shadow-sm p-3 rounded rounded-4 d-flex flex-row align-items-center justify-content-between`}>
                <Image
                    fluid 
                    src={LogoImg}
                    className={`cs-transition ${!darkMode ? '' : 'cs-img-dark'}`}    
                />
                <Form.Check
                    type="checkbox"
                    id="cs-checkbox"
                    checked={darkMode}
                    onChange={(event) => handleDarkMode(event.target.checked)}
                    className={`cs-checkbox cs-transition rounded rounded-3 m-0 px-3 pt-3 pb-2 cs-bg-two-${!darkMode ? 'light' : 'dark'}`}
                    label=""
                />
            </Container>
        </animated.div>
    );
}

export default NavPanel;