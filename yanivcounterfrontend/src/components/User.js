import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button} from '@mui/material';

export default function User() {
	const paperStyle={padding:'50px  20px', width:600, margin:"20px auto"};
	const[name, setName] = React.useState('');
	const [address, setAddress] = React.useState('');
	const [users, setUsers] = React.useState([]);

	const handleClick=(e)=>{
			e.preventDefault()
			const user={name, address}
			console.log(user)
			fetch("http://localhost:8080/user/add",{
			method: "Post",
			headers: {"Content-Type":"application/json"},
			body:JSON.stringify(user)
		
		}).then(()=>{
			console.log("Added new user")
		})
	}

	React.useEffect(()=>{
		fetch("http://localhost:8080/user/getAll")
		.then(res=>res.json())
		.then((result)=>{
			setUsers(result);
		})
	}, [])


	return (
	<Container>
		<Paper elevation={3} style={paperStyle}>
			<h1 style={{color:"blue"}}><u>Add User</u></h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="User name" variant="outlined" fullWidth 
	  value={name}
	  onChange={(e)=>setName(e.target.value)}
	  />
      <TextField id="outlined-basic" label="User adress" variant="outlined" fullWidth
	  value={address}
	  onChange={(e)=>setAddress(e.target.value)}
	  />
	  <Button variant="contained" onClick={handleClick}>
		Submit
		</Button>

    </Box>
	</Paper>
	<Paper elevation={3} style={paperStyle}>
		{users.map(user=>(
			<Paper elevation={6} style={{margin:"10px", padding:"15px", textAlign:"left"}} key={user.id}>
				Id:{user.id} <br/>
				Name:{user.name} <br/>
				Address:{user.address}
			</Paper>
		))
}

	</Paper>
	</Container>
  );
}
