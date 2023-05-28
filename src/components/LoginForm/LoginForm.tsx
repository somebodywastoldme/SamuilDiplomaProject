import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';

const LoginForm: FC = () => {
	const router = useRouter();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
		  email: data.get('email'),
		  password: data.get('password'),
		});
	};
	const handleLogIn = (): void => {
		router.push('/listDocuments/1');
	};

	return(
		<div className='loginContainer'>
			<Container component="main" maxWidth="xs">
				<h2 style={{textAlign: 'center'}}>Система посeлення до гуртожитку</h2>
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						margin: '0'
					}}
				>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Пошта"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Пароль"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Запам'ятати тебе"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleLogIn}
						>
							Увійти
						</Button>
						<Grid container>
						<Grid item xs>
							
						</Grid>
						<Grid item>
							<Grid container style={{gap: '10px'}}>
								<ReactSVG src='/svg/ECD.svg' style={{cursor: 'poiner'}}/>
								<ReactSVG src='/svg/Diia.svg' width={40} height={40} style={{cursor: 'poiner'}}/>
							</Grid>
						</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default LoginForm;
