'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useState, ReactNode, ReactElement, isValidElement } from 'react';

import './Dock.css';

interface DockItemProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    baseItemSize: number;
    direction: 'horizontal' | 'vertical';
    magnificationScale?: number;
}

function DockItem({ children, className = '', onClick, baseItemSize, direction, magnificationScale = 1.1 }: DockItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            style={{
                width: baseItemSize,
                height: baseItemSize
            }}
            whileHover={{ scale: magnificationScale }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            onClick={onClick}
            className={`dock-item ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, child => {
                if (isValidElement(child)) {
                    return cloneElement(child as ReactElement<any>, { isHovered, direction });
                }
                return child;
            })}
        </motion.div>
    );
}

interface DockLabelProps {
    children: ReactNode;
    className?: string;
    isHovered?: boolean;
    direction?: 'horizontal' | 'vertical';
}

function DockLabel({ children, className = '', isHovered, direction }: DockLabelProps) {
    const isVertical = direction === 'vertical';

    return (
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, [isVertical ? 'x' : 'y']: 0 }}
                    animate={{ opacity: 1, [isVertical ? 'x' : 'y']: isVertical ? -10 : -10 }}
                    exit={{ opacity: 0, [isVertical ? 'x' : 'y']: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`dock-label ${className} ${isVertical ? 'vertical' : ''}`}
                    role="tooltip"
                    style={isVertical ? { top: '50%', y: '-50%', right: '100%', marginRight: '10px' } : { x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface DockIconProps {
    children: ReactNode;
    className?: string;
}

function DockIcon({ children, className = '' }: DockIconProps) {
    return <div className={`dock-icon ${className}`}>{children}</div>;
}

export interface DockItemData {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
}

interface DockProps {
    items: DockItemData[];
    className?: string;
    panelHeight?: number;
    baseItemSize?: number;
    position?: 'bottom' | 'top' | 'left' | 'right';
    magnification?: number;
}

export default function Dock({
    items,
    className = '',
    panelHeight = 68,
    baseItemSize = 50,
    position = 'bottom',
    magnification,
}: DockProps) {
    const isVertical = position === 'left' || position === 'right';
    const direction = isVertical ? 'vertical' : 'horizontal';
    const magnificationScale = magnification && baseItemSize ? magnification / baseItemSize : 1.1;

    return (
        <div
            className={`dock-outer ${position}`}
        >
            <div
                className={`dock-panel ${position} ${className}`}
                style={{
                    [isVertical ? 'width' : 'height']: panelHeight,
                    flexDirection: isVertical ? 'column' : 'row'
                }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        baseItemSize={baseItemSize}
                        direction={direction}
                        magnificationScale={magnificationScale}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </div>
        </div>
    );
}
