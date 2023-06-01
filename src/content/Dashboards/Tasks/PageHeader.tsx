import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  styled
} from '@mui/material';
import { trpc } from '@utils/trpc';
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IApplicationState } from '@/reducers';
import { useDispatch } from 'react-redux';
import { setCard } from 'src/reducers/CardSlice';
import { useRouter } from 'next/router';

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ', 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)'
          : '0px 2px 4px -3px ' +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ', 0px 5px 16px -4px ' +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

const PageHeader: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: IApplicationState) => state.userSlice.user);
  const utils = trpc.useContext();

  const addCard = trpc.sentCard.create.useMutation({
    async onSuccess(data) {
      dispatch(setCard(data));
      router.push('/card');
      console.log(data);
    },
  });

  const handleAddCard = async (): Promise<void> => {
    await addCard.mutateAsync({ userId: user.id, sendingTypeId: 1 });
  };

  return (
    <Box
      display="flex"
      alignItems={{ xs: 'stretch', md: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <AddAlertTwoToneIcon fontSize="large" />
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Добрий день, {user.name}!
          </Typography>
        </Box> 
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Button variant="contained" startIcon={<DocumentScannerTwoToneIcon />} onClick={handleAddCard}>
          Додати документ
        </Button>
      </Box>
    </Box>
  );
}

export default PageHeader;
