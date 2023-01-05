import React, { useState, useEffect } from 'react'
import { useAuth } from '../../features/authentication/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Draggable from "react-draggable";

import { MapCompontent as FloorOne } from './floor-1';
import { MapCompontent as FloorTwo } from './floor-2';
import { MapCompontent as FloorThree } from './floor-3';
import { MapCompontent as FloorFour } from './floor-4';

import styles from './Maps.module.css'
import { getRoomList, getRoomScheduleWeek, useRooms } from '../../features/schedule/roomSlice';

export default function Maps() {
    const params = useParams()
    const dispatch = useDispatch()
    const auth = useSelector(useAuth)
	const rooms = useSelector(useRooms);

	const [zoom, setZoom] = useState(0.8);
	const [selected, setSelected] = useState(null);
	const [floor, setFloor] = useState(1);

    const initialize = () => {
		dispatch(getRoomList({auth: auth.token}))
    }

	const handleScroll = (e) => {
		const {deltaY} = e;
		const delta = deltaY / 1000;

		const value = Math.min(Math.max(zoom - delta, 0.5), 2);
		setZoom(value);
	}

	const handleLoad = (code) => {
		if(!rooms.rooms[code]) return;
		const room = rooms.rooms[code];
		setSelected(code);
		dispatch(getRoomScheduleWeek({auth: auth.token, room: room.id, date: (new Date())}));
	}
    
    useEffect(() => { initialize() }, [])

    return (
        <div className={styles['content']}>
			<div className={styles['side-selector']}>
				<div className={styles['floor-list']}>
					<h5 onClick={() => setFloor(1)} className={floor === 1 ? styles['selected'] : null}>1</h5>
					<h5 onClick={() => setFloor(2)} className={floor === 2 ? styles['selected'] : null}>2</h5>
					<h5 onClick={() => setFloor(3)} className={floor === 3 ? styles['selected'] : null}>3</h5>
					<h5 onClick={() => setFloor(4)} className={floor === 4 ? styles['selected'] : null}>4</h5>
				</div>
			</div>
			<div 
				className={styles['map']}
				onWheel={handleScroll}
				onDoubleClick={() => {if(selected != null) setSelected(null)}}
				style={{
					backgroundSize: `${50 * zoom}px ${50 * zoom}px`,
					width: selected ? 'calc(100% - 600px - 5px)' : '100%'
				}}>
				<Draggable>
					<div className={styles['map-object']}>
						{
							floor == 1 ? <FloorOne zoom={zoom} onLoad={handleLoad} />
							:
							floor == 2 ? <FloorTwo zoom={zoom} onLoad={handleLoad} />
							:
							floor == 3 ? <FloorThree zoom={zoom} onLoad={handleLoad} />
							:
							floor == 4 ? <FloorFour zoom={zoom} onLoad={handleLoad} />
							:
							<></>
						}
					</div>
				</Draggable>
			</div>
			{
				selected ? 
				<RoomInfoWindow selected={selected} onClose={() => setSelected(null)}/>
				:
				<></>
			}
		</div>
    )
}

const RoomInfoWindow = ({selected, onClose}) => {
    const rooms = useSelector(useRooms)

	if(!selected) return <></>
	if(rooms.list.isLoading) return <>Loading...</>

	const room = rooms.rooms[selected];
	if(room.isLoading) return <>Loading...</>

	return (
		<div className={styles['room-info']}>
			<div className={styles['image']} style={{background: `linear-gradient(to bottom, transparent, var(--map-background)), url(${room.img})`}} />
			<div className={styles['title']}>
				<h1>{room.name}</h1>
				<h3>{room.roomNumber}</h3>
			</div>
			<div className={styles['info']}>
				<h6>Vapaa</h6>
			</div>
			<RoomSchedule selected={selected} />
			<button onClick={() => onClose()}>Sulje</button>
		</div>
	)
}

const RoomSchedule = ({selected}) => {
	const rooms = useSelector(useRooms);

    if(!selected) return <></>
	if(rooms.list.isLoading) return <>Loading...</>

	const room = rooms.rooms[selected];
	if(room.isLoading) return <>Loading...</>

	const week = room.days;

	console.log(week);

    if(!week) return <div className={styles['schedule-loading-screen']} />


    return (
        <div style={{height: week.height / 3}} className={styles['schedule']}>
            {
				
                Object.keys(week).filter(date => !(!date) && !['La', 'Su'].includes(week[date].day.caption.split(' ')[0])).map((date, i) => {
                    const day = week[date];
                    return <DayObject key={i} day={day} />
                })
            }
        </div>
    )
}

const DayObject = ({day}) => {
    const lessons = day.lessons;
    
    return (
        <div className={styles['day']}>
            {
                lessons.map((lesson, i) => {                    
                    const start = lessons[i]['startRaw'];
                    const duration = lessons[i]['durationRaw'];
                    
                    return <LessonObject key={i} start={start - 510} height={duration} lesson={lesson} />
                })
            }
    </div>
    )
}

const LessonObject = ({start, height, lesson}) => {
    return (
        <div
            className={styles['hour']}
            style={{
                height: `${height * 0.65}px`,
                marginTop: `${(start) * 0.65}px`,
                filter: `brightness(${((Math.random() * 1.4) - 1) * 8 + 100}%)`,
            }}>
            <h1>{`${lesson['start']} - ${lesson['end']}`}</h1>
            {
                lesson.groups.map((group, i) => {
                    return (
                        <div key={i} className={styles['data']}>
                            <GroupObject group={group} />
                        </div>
                    )
                })
            }
        </div>
    )
}

const GroupObject = ({group}) => {
    return (
        <div className={styles['group']}>
            {group.teachers ? group.teachers.map((teacher, i) => teacher ? <Link key={i} to={`/teachers/${teacher.id}`}>{teacher.caption}</Link> : null) : null}
            <h2 className={styles['code']}>{group.code}</h2>
        </div>

    )
}