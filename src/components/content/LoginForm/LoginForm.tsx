import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FC } from 'react';
import './loginForm.scss';
import { useNavigate } from 'react-router-dom';
import { GetUser } from 'src/Services/DataAccessService';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/reducers/UserSlice';

const LoginForm: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
        const response = await GetUser(String(data.get('email')), String(data.get('password')));
        if (response) {
            dispatch(setUser(response));
            navigate('/dashboards/home');
        }
	};
	return(
        <div className='mainPageContainer'>
            <div className='loginContainer'>
                <Container component="main" maxWidth="xs">
                    <p className='title'>Система медичного догляду</p>
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
                                label="Запам'ятати мене"
                            />
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
        </div>
	);
};

export default LoginForm;
