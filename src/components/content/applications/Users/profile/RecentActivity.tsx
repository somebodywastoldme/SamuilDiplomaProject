import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { JsxElement } from 'typescript';
import { FC, ReactElement } from 'react';
import { map } from 'lodash';
const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);
export interface IRecentActivityItem {
  title: string;
  count: number;
  avatar: ReactElement;
}
export interface IRecentActivity {
  items: IRecentActivityItem[];
}
const RecentActivity: FC<IRecentActivity> = (props) => {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Остання активність" />
      {map(props.items, (item: IRecentActivityItem) => {
        return (
          <div key={item.title}>
            <Divider />
            <Box px={2} py={4} display="flex" alignItems="flex-start">
              <AvatarPrimary>
                {item.avatar}
              </AvatarPrimary>
              <Box pl={2} flex={1}>
                <Typography variant="h3">{item.title}</Typography>
                <Box pt={2} display="flex">
                  <Box pr={8}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                    >
                      Всього
                    </Typography>
                    <Typography variant="h2">{item.count}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        );
      })}
    </Card>
  );
}

export default RecentActivity;
