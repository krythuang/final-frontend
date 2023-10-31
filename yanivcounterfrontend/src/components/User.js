import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function User() {
	const paperStyle = { padding: '50px  20px', width: 600, margin: '20px auto' };
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [score, setScore] = React.useState('');
	const [users, setUsers] = React.useState([]);
	const [toAddStates, setToAddStates] = React.useState({});

	const handleClick = (e) => {
		e.preventDefault();
		const user = { name, email, score };
		fetch('http://localhost:8080/user/add', {
		  method: 'Post',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(user),
		}).then(() => {
		  fetch('http://localhost:8080/user/getAll')
			.then((res) => res.json())
			.then((result) => {
			  setUsers(result);
			  setName('');
			  setEmail('');
			  setScore('');
			});
		});
	  };
	  
	const handleUpdateScore = (userId) => {
		const toAdd = toAddStates[userId] || 0;
		fetch(`http://localhost:8080/user/updateScore/${userId}?toAdd=${toAdd}`, {
		  method: 'Post',
		}).then(() => {
		  fetch('http://localhost:8080/user/getAll')
			.then((res) => res.json())
			.then((result) => {
			  setUsers(result);
			  setToAddStates((prevState) => ({ ...prevState, [userId]: '' }));
			});
		});
	  };

	const handleDelete = (userId) => {
        fetch(`http://localhost:8080/user/delete/${userId}`, {
            method: 'DELETE',
        }).then(() => {
            fetch('http://localhost:8080/user/getAll')
                .then((res) => res.json())
                .then((result) => {
                    setUsers(result);
                });
        });
    };

	React.useEffect(() => {
		fetch('http://localhost:8080/user/getAll')
			.then((res) => res.json())
			.then((result) => {
				setUsers(result);
			});
	}, []);

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1 style={{ color: 'black' }}>
					<b>Yaniv score counter</b><br/><br/>
				</h1>
				<h2 style={{ color: 'black' }}>
					<b>Add player</b>
				</h2>
				<Box
					component="form"
					sx={{
						'& > :not(style)': { m: 1 },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-basic"
						label="Name"
						variant="outlined"
						fullWidth
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="Starting score"
						variant="outlined"
						fullWidth
						value={score}
						onChange={(e) => setScore(e.target.value)}
					/>
					<Button variant="contained" color="inherit" onClick={handleClick}>
						Submit
					</Button>
				</Box>
			</Paper>
			<Paper elevation={3} style={paperStyle}>
				{users.map((user) => (
					<Paper elevation={6} style={{ margin: '10px', padding: '15px', textAlign: 'left' }} key={user.id}>
						<h2>Name: {user.name} </h2>
						<h2>Score: {user.score}{' '} </h2>
						<b>Email:</b> {user.email} <br /><br />
						<TextField
							id={`toAdd_${user.id}`}
							label="points"
							variant="outlined"
							value={toAddStates[user.id] || ''}
							onChange={(e) => {
								const value = e.target.value;
								setToAddStates((prevState) => ({ ...prevState, [user.id]: value }));
							}}
						/><br /><br />
						<Button variant="contained" color="inherit" onClick={() => handleUpdateScore(user.id)}>
							Update Score
						</Button><br /><br />
						<Button variant="contained" color="warning" onClick={() => handleDelete(user.id)}>
                            Delete
                        </Button>
					</Paper>
				))}
			</Paper>
		</Container>
	);
}

