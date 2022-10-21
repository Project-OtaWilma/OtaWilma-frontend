import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    studiesSlice,
    fetchTrending,
    selectStudies
} from '../../features/studies/StudiesSlice';


export default function Frontpage() {
    const studies = useSelector(selectStudies);
    const dispatch = useDispatch();



    return (
        <>
            <h1>Grades</h1>
        </>
    )
}