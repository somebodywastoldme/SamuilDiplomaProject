import {
  Box,
  Button,
  Typography,
  Card,
  CardHeader,
  Divider,
  Grid
} from '@mui/material';

import { ArrowForwardTwoTone } from '@mui/icons-material';

function Addresses() {
  const addresses = {
    delivery: 12,
    shipping: 8
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title="Адреса"
          />
          <Divider />
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Основна
            </Typography>
            <Box sx={{ minHeight: { xs: 0, md: 242 } }} p={2}>
              <Typography variant="h5">Дім</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                714-650-6297
              </Typography>
              <Typography variant="subtitle1">
                Проспект Любомира Гузара 1
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<ArrowForwardTwoTone />}
            >
              Змінити
            </Button>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title="Адреса"
          />
          <Divider />
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Запасна
            </Typography>
            <Box sx={{ minHeight: { xs: 0, md: 242 } }} p={2}>
              <Typography variant="h5">Робота</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                714-650-6297
              </Typography>
              <Typography variant="subtitle1">
                проспект Митрополита Андрія Шептицького 4а
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<ArrowForwardTwoTone />}
            >
              Змінити
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Addresses;
