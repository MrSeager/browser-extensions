import React, { FC } from 'react';
//Bootstrap
import { Container, Button, ButtonGroup } from 'react-bootstrap';
//Spring
import { SpringValue, animated } from '@react-spring/web';

interface NavPanelSecondProps {
    darkMode: boolean;
    handleFilterChange: (state: string) => void;
    animRightSide: {
        opacity: SpringValue<number>;
        x: SpringValue<string>;
    }; 
    animLeftSide: {
        opacity: SpringValue<number>;
        x: SpringValue<string>;
    }; 
}

const NavPanelSecond: FC<NavPanelSecondProps> = ({ darkMode, handleFilterChange, animRightSide, animLeftSide }) => {
    return (
        <Container fluid className='mt-5 d-flex flex-lg-row flex-column gap-3 align-items-center justify-content-between px-0'>
            <animated.div style={animRightSide}>
                <h1 className={`cs-fw-700 cs-transition cs-tc-one-${!darkMode ? 'light' : 'dark'}`}>Extensions List</h1>
            </animated.div>
            <animated.div style={animLeftSide}>
                <ButtonGroup className='gap-3'>
                    <Button 
                        className={`px-3 cs-fw-500 rounded-pill cs-btn-${!darkMode ? 'light' : 'dark'} shadow-sm`}
                        onClick={() => handleFilterChange("All")}
                    >
                        All
                    </Button>
                    <Button 
                        className={`px-3 cs-fw-500 rounded-pill cs-btn-${!darkMode ? 'light' : 'dark'} shadow-sm`}
                        onClick={() => handleFilterChange("Active")}
                    >
                        Active
                    </Button>
                    <Button 
                        className={`px-3 cs-fw-500 rounded-pill cs-btn-${!darkMode ? 'light' : 'dark'} shadow-sm`}
                        onClick={() => handleFilterChange("Inactive")}
                    >
                        Inactive
                    </Button>
                </ButtonGroup>
            </animated.div>
        </Container>
    );
}

export default NavPanelSecond;