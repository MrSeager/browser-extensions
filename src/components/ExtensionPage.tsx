import React, { FC, useState, useEffect } from 'react';
//Components
import './ExtensionPageStyle.css';
import NavPanel from './NavPanel.tsx';
import NavPanelSecond from './NavPanelSecond.tsx';
import ExtensionItem from './ExtensionItem.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated } from '@react-spring/web';

interface ExtensionProps {
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
}

const ExtensionPage: FC = () => {
    const [items, setItems] = useState<ExtensionProps[]>([]);
    const [filter, setFilter] = useState<string>("All");
    const [darkMode, setDarkMode] = useState<boolean>(false);

    //Saving theme
    useEffect(() => {
        const storedTheme = localStorage.getItem('darkMode');
        if (storedTheme !== null) {
            setDarkMode(JSON.parse(storedTheme));
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    //Changing from light theme to dark theme
    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    //Switch chenging in item
    const handleSwitchChange = (name: string) => {
        const updatedItems = items.map((currentItem) =>
            currentItem.name === name ? { ...currentItem, isActive: !currentItem.isActive } : currentItem
        );
        setItems(updatedItems);
    };

    //Remove
    const handleRemove = (name: string) => {
        const updatedItems = items.filter((currentItem) => currentItem.name !== name);
        setItems(updatedItems);
    };

    //Filtering
    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const filteredItems = items.filter((item) => {
        if (filter === "Active") return item.isActive;
        if (filter === "Inactive") return !item.isActive;
        return true; // For 'All', show all items
    });   

    //Import items from link to items
    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/MrSeager/browser-extensions/refs/heads/main/src/data.json').then((response) => {
            setItems(response.data);
        });
    }, []);  

    //Background changing animation gradient
    const animationProps = useSpring({
        background: darkMode
            ? 'linear-gradient(180deg, #040918 0%, #091540 100%)'
            : 'linear-gradient(180deg, rgba(235,242,252,1) 0%, rgba(238,248,249,1) 100%)',
        config: { duration: 500 }, // Smoothness of the transition
    });

    return (
        <animated.div
            style={animationProps}
            fluid 
            className={`px-5 cs-transition d-flex flex-column align-items-center gap-4 py-5 min-vh-100`}>
            <NavPanel 
                darkMode={darkMode}
                handleDarkMode={handleDarkMode}
            />

            <NavPanelSecond 
                darkMode={darkMode}
                handleFilterChange={handleFilterChange}
            />

            <Row className='w-100'>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <ExtensionItem
                            key={item.name}
                            darkMode={darkMode}
                            name={item.name}
                            description={item.description}
                            isActive={item.isActive}
                            handleSwitchChange={handleSwitchChange}
                            handleRemove={handleRemove}
                            index={index}
                            logo={item.logo}
                        />
                    )
                )) : <p>Loading....</p>}
            </Row>
        </animated.div>
    );
}

export default ExtensionPage;