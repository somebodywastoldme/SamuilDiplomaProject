import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  styled,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { IApplicationState } from '@/reducers';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import KeyIcon from '@mui/icons-material/Key';
import Document from '@models/Document';
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export interface ICardAddresser {
  label: string;
  value: number;
}
interface ICardHeaderProps {
  addresser: ICardAddresser[];
  selectedAddresser: ICardAddresser;
  sendCard: () => Promise<void>;
  onSelectAddresser: (id: number) => void;
  singDocument: () => void;
  resultMessage?: string;
  selectedDocument:Document;
}

const CardHeader: FC<ICardHeaderProps> = ({
  addresser,
  sendCard,
  onSelectAddresser,
  selectedAddresser,
  resultMessage,
  singDocument,
  selectedDocument
}) => {
  const user = useSelector((state: IApplicationState) => state.userSlice.user);
  const handleChange = (event) => {
    onSelectAddresser(event.target.value);
  };
  return (
    <Box
      display="flex"
      alignItems={{ xs: 'stretch', md: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          startIcon={<KeyIcon />}
          onClick={singDocument}
          disabled={!selectedDocument}
        >
          Підписати
        </Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ gap: '30px' }}
      >
        {resultMessage && (
          <Typography
            variant="h4"
            component="h4"
            gutterBottom
            sx={{ color: '#57ca22' }}
          >
            {resultMessage}!
          </Typography>
        )}
        <TextField
          id="filled-select-currency"
          select
          label="Отримувач"
          value={selectedAddresser?.value}
          onChange={handleChange}
          style={{ width: 200 }}
        >
          {addresser.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={sendCard}
          disabled={!selectedAddresser}
        >
          Відправити
        </Button>
      </Box>
    </Box>
  );
};

export default CardHeader;
