'use client'
import React, { useRef, useState, useEffect } from 'react';
import Sketch from 'react-p5';

interface RandomFactors {
    lengths: number[][];
    angles: number[][];
}

interface CanvasSize {
    width: number;
    height: number;
}

const ForestFractal: React.FC = () => {
    const [randomFactors, setRandomFactors] = useState<RandomFactors>({ lengths: [], angles: [] });
    const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: window.innerWidth, height: window.innerHeight });

    const treeCount = 5;  // Number of trees in the forest
    const spacing = canvasSize.width / (treeCount + 1);  // Horizontal spacing between trees

    useEffect(() => {
        const handleResize = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        generateRandomFactors();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const setup = (p5: any, canvasParentRef: Element) => {
        p5.createCanvas(canvasSize.width, canvasSize.height).parent(canvasParentRef);
        p5.colorMode(p5.HSB, 360, 100, 100);
    };

    const draw = (p5: any) => {
        p5.background(0);

        for (let i = 0; i < treeCount; i++) {
            p5.push();
            p5.translate(spacing * (i + 1), p5.height);
            branch(p5, 60, 0, i);
            p5.pop();
        }
    };

    const branch = (p5: any, len: number, depth: number, treeIndex: number) => {
        let hue = (30 + treeIndex * 50) % 360;  // Unique color for each tree
        p5.stroke(hue, 100, 80);

        if (len > 4) {
            p5.line(0, 0, 0, -len);
            p5.translate(0, -len);
            p5.push();
            p5.rotate(Math.PI / 4 + randomFactors.angles[treeIndex][depth]);
            branch(p5, len * randomFactors.lengths[treeIndex][depth], depth + 1, treeIndex);
            p5.pop();
            p5.rotate(-Math.PI / 4 + randomFactors.angles[treeIndex][depth]);
            branch(p5, len * randomFactors.lengths[treeIndex][depth], depth + 1, treeIndex);
        }
    };

    const generateRandomFactors = () => {
        let lengths = [];
        let angles = [];

        for (let i = 0; i < treeCount; i++) {
            lengths.push(new Array(15).fill(0).map(() => Math.random() * 0.15 + 0.70));
            angles.push(new Array(15).fill(0).map(() => Math.random() * 0.3 - 0.15));
        }

        setRandomFactors({ lengths, angles });
    };

    return <Sketch setup={setup} draw={draw} />;
};

export default ForestFractal;

