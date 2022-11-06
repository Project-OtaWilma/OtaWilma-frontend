import React, { useState, useEffect } from 'react';

export function LoadingScreen({ className }) {
    return <div className={`loading-indicator ${className}`} />
}

export function PlaceHolder({className}) {
    return <div className={`placeholder ${className}`} />
}

