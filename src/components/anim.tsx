// anim.tsx
import { useSpring } from '@react-spring/web';

// Animation for background gradient
export const useBackgroundAnimation = (darkMode: boolean) => 
    useSpring({
        background: darkMode
            ? 'linear-gradient(180deg, #040918 0%, #091540 100%)'
            : 'linear-gradient(180deg, rgba(235,242,252,1) 0%, rgba(238,248,249,1) 100%)',
        config: { duration: 300 }, // Smoothness of the transition
    });

// Animation for top navigation
export const useNavAnimation = () => 
    useSpring({
        from: { opacity: 0, y: '-200px' },
        to: { opacity: 1, y: '0px' },
        config: { tension: 110, friction: 10 },
    });

export const useAnimationSides = (x: number) => 
    useSpring ({
        from: { opacity: 0, x: `${x}px`},
        to: { opacity: 1, x: '0px' },
        config: { tension: 110, friction: 10 },
    });

export const useAnimationItem = (x: number, y: number, del: number) => 
    useSpring ({
        from: { opacity: 0, x: `${x}px`, y: `${y}px`, scale: 0 },
        to: { opacity: 1, x: '0px', y: '0px', scale: 1 },
        config: { tension: 90, friction: 11 },
        delay: del,
    });
