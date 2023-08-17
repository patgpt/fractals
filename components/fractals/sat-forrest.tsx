import React, { useRef, useEffect, useState } from 'react';
import Sketch from 'react-p5';

interface RandomFactors {
    lengths: number[];
    angles: number[];
}

interface CanvasSize {
    width: number;
    height: number;
}

const OrangeFractal: React.FC = () => {
    let angle: number;
    let wind: number;
    const windSpeed = 0.0005;
    const hueRef = useRef<number>(30); // Orange hue
    const maxLen = 150; // Adjusted for forest size
    const [randomFactors, setRandomFactors] = useState<RandomFactors>({ lengths: [], angles: [] });
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 }); // initial value set to 0

    useEffect(() => {
        // This is where we update the size
        setCanvasSize({ width: window.innerWidth, height: window.innerHeight });

        const handleResize = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount

    // ... (rest of your code unchanged)

    return <Sketch setup={setup} draw={draw} />;
};

export default OrangeFractal;
