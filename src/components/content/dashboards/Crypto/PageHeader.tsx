import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'src/reducers';

function PageHeader() {
  const user = useSelector((state: IApplicationState) => state.userSlice.user);
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.firstName + user.secondName}
          src={'/static/images/avatars/4.jpg'}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Добрий день, {user.firstName + ' ' + user.secondName}!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
