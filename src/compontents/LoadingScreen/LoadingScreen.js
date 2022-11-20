import React, { useState, useEffect } from 'react';

export function LoadingScreen({ className }) {
    return <div className={`loading-indicator ${className}`} />
}

export function PlaceHolder({className}) {
    return <div className={`placeholder ${className}`} />
}

export function BlurLayer({children, isLoading, className}) {
    return (
        <div className={className} style={{filter: isLoading ? 'blur(3px)' : 'none', pointerEvents: isLoading ? 'none' : 'all'}}>
            {children}
        </div>
    )
}

