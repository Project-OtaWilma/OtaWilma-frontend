import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ className }) {
    return <div className={`loading-indicator ${className}`} />
}