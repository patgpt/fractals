'use client'
import React, { useRef, useState, useEffect } from 'react';
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
    const [currentLength, setCurrentLength] = useState<number>(10);
    const maxLen = 100;
    const [randomFactors, setRandomFactors] = useState<RandomFactors>({ lengths: [], angles: [] });
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const setup = (p5: any, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.width, canvasSize.height).parent(canvasParentRef);
        p5.colorMode(p5.HSB, 360, 100, 100);
        generateRandomFactors();
    };

    const draw = (p5: any) => {
        p5.background(0);  // Dark background
        angle = p5.map(p5.touchX || p5.mouseX, 0, p5.width, 0, p5.PI);
        wind = p5.sin(p5.millis() * windSpeed);
        p5.translate(p5.width / 2, p5.height);
        branch(p5, currentLength, 0, 0);
    };

    const touchStarted = (p5: any) => {
        if (currentLength < maxLen) {
            setCurrentLength(currentLength + 10);
        } else {
            setCurrentLength(10);
        }
    };

    const branch = (p5: any, len: number, depth: number, index: number) => {
        p5.stroke(hueRef.current, 100, 80); // Adjusted for a nicer orange
        if (len > 4) {
            p5.line(0, 0, 0, -len);
            p5.translate(0, -len);
            p5.push();
            p5.rotate(angle + randomFactors.angles[index] + wind);
            branch(p5, len * randomFactors.lengths[index], depth + 1, 2 * index + 1);
            p5.pop();
            p5.rotate(-angle + randomFactors.angles[index] - wind);
            branch(p5, len * randomFactors.lengths[index], depth + 1, 2 * index + 2);
        } else {
            let orbSize = 10;
            p5.fill(hueRef.current, 100, 100);  // Orange fill for the balls
            p5.noStroke();
            p5.ellipse(0, 0, orbSize, orbSize);
        }
    };

    const generateRandomFactors = () => {
        let lengths = new Array(15).fill(0).map(() => Math.random() * 0.15 + 0.60);
        let angles = new Array(15).fill(0).map(() => Math.random() * 0.2 - 0.1);
        setRandomFactors({ lengths, angles });
    };

    return <Sketch setup={setup} draw={draw} touchStarted={touchStarted} />;
};

export default OrangeFractal;
