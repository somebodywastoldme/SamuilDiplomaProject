import { useState, FC } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { trpc } from '@utils/trpc';
import { toString } from 'lodash';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/reducers/UserSlice';
import User from '@models/User';

const LoginForm: FC = () => {
	const router = useRouter();
	const utils = trpc.useContext();
	const dispatch = useDispatch();
	const [isShowInvalidUserMess, setIsShowInvalidUserMess] = useState<boolean>(false);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const user = await utils.user.login.fetch({ email: toString(data.get('email')) }); // , password: toString(data.get('password')
		if(!user) {
			setIsShowInvalidUserMess(true);
			return;
		}
		handleLogIn(user);
	};

	const handleLogIn = (user: User): void => {
		dispatch(setUser(user))
		router.push('/listDocuments/1');
	};

	return(
		<div className='loginContainer'>
			<Container component="main" maxWidth="xs">
				<h2 style={{textAlign: 'center'}}>Сисема електронного документо обігу</h2>
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
						{ isShowInvalidUserMess &&
							<Typography variant="body2" >
								Невірний логін або пароль
							</Typography>
						}
						<Button
							type="submit" 
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Увійти
						</Button>
					</Box>
				</Box>
			</Container>
		</div>
	);
};

export default LoginForm;
