import { FC, useState, useEffect, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { trpc } from '~/utils/trpc';
import { Room, Floor } from '@prisma/client';
import { HostelSelection } from '~/server/routers/hostel';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			'& > *': {
				margin: theme.spacing(1),
				width: '25ch',
			},
		},
	})
);

interface Props {
	personId: number;
}

const RoomSelector: FC<Props> = ({ personId }) => {
	const classes = useStyles();
	const utils = trpc.useContext();
	const [hostels, setHostels] = useState<HostelSelection[]>([]);
	const [selectedHostel, setSelectedHostel] = useState<HostelSelection>();
	const [floors, setFloors] = useState<Floor[]>([]);
	const [selectedFloor, setSelectedFloor] = useState<Floor>();
	const [rooms, setRooms] = useState<Room[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<Room>();

	const floorRef = useRef(null);
	const roomRef = useRef(null);
	const router = useRouter();

	const updateRoom = trpc.student.addRoomToStudent.useMutation({
		async onSuccess() {
				router.push('/sucessulResult/1');
		},
	});

	const updateStudentRoom = async (): Promise<void> => {
		await updateRoom.mutateAsync({ studentId: personId, roomId: selectedRoom.id });
	};

	useEffect(() => {
		const fetchHostels = async () => {
				const data = await utils.hostel.list.fetch();
				setHostels(data);
		};
		fetchHostels();
	}, []);

	useEffect (() => {
		setFloors(selectedHostel?.floors ? selectedHostel.floors : []);
		setSelectedFloor(null);
		setSelectedRoom(null);
	}, [selectedHostel])

	useEffect (() => {
		const rooms = selectedHostel?.rooms.filter((el) => el.floorId === selectedFloor?.id);
		setRooms(rooms ? rooms : []);
	}, [selectedFloor])

	return (
		<div className='roomSelectorContainer'>
			<div>
				<Autocomplete
					options={hostels}
					getOptionLabel={(option) => option.name}
					value={selectedHostel}
					onChange={(event, value) => setSelectedHostel(value)}
					className='selector'
					renderInput={(params) => (
						<TextField {...params} label="Гуртожиток" variant="outlined" />
					)}
				/>
				<Autocomplete
					options={floors}
					getOptionLabel={(option) => option.name}
					value={selectedFloor}
					onChange={(event, value) => setSelectedFloor(value)}
					className='selector'
					renderInput={(params) => (
						<TextField {...params} label="Поверх" variant="outlined" />
					)}
					disabled={!selectedHostel}
					ref={floorRef}
				/>
				<Autocomplete
					options={rooms}
					getOptionLabel={(option) => option.roomNumber}
					value={selectedRoom}
					onChange={(event, value) => {
						setSelectedRoom(value);
					}}
					className='selector'
					renderInput={(params) => (
						<TextField {...params} label="Кімната" variant="outlined" />
					)}
					disabled={!selectedFloor}
					ref={roomRef}
				/>
			</div>
			<div style={{display: 'flex', height: '100px'}}>
				<Button variant="contained" color="primary" disabled={!selectedRoom} style={{margin: 'auto'}} onClick={updateStudentRoom}>
					Поселитися
				</Button>
			</div>
		</div>
	);
};

export default RoomSelector;
