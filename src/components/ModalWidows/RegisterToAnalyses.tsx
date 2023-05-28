import { Button, DialogActions, DialogContentText, Grid, MenuItem, Select, TextField } from '@mui/material';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {FC, useState} from 'react';
import Doctor from 'src/models/Doctor';
import ModalWrapper, { CloseType, IModalWindowProps } from './ModalWrapper';
import Analyse from 'src/models/Analyse';
export interface IRegisterToAnalysesProps extends IModalWindowProps {
}

const mockTime = [
    {id: 1, value: '9:15'},
    {id: 2, value: '9:30'},
    {id: 3, value: '9:45'},
    {id: 4, value: '10:00'},
    {id: 5, value: '10:15'},
    {id: 6, value: '10:30'},
    {id: 7, value: '10:45'},
    {id: 8, value: '10:00'},
    {id: 9, value: '11:00'},
    {id: 10, value: '11:15'},
    {id: 11, value: '11:30'},
    {id: 12, value: '11:45'},
    {id: 13, value: '12:00'},
    {id: 14, value: '12:15'}
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const RegisterToAnalyses: FC<IRegisterToAnalysesProps> = (props) => {
    const [analyse, setAnalyse] = useState<Analyse>(props.data as Analyse);
    const [time, setTime] = useState<string>();
    const [date, setDate] = useState<string>('');
    const handleClose = () => {
        props.handleClose(CloseType.CLOSE, null)
    };
    const handleSubmit= () => {
        const hour = time.split(':')[0];
        const minutes = time.split(':')[1];
        const dateTime = moment(date)
                        .add(hour,'hour')
                        .add(minutes,'minutes');
        const result = {
            dateTime: String(dateTime.toDate().getTime()),
            analyse: analyse
        }
        props.handleClose(CloseType.OK, result)
    };
    return (
        <div>
            <DialogContentText style={{marginBottom: '8px'}}>
                Ви хочете записатися на аналіз <b>{analyse.name}</b>
            </DialogContentText>
            <Grid
                container
                direction="column"
                spacing={'4'}
            >
                <Grid item >
                    <DialogContentText style={{margin: '8px 0 '}}>
                        <b>Оберіть доступну дату</b>
                    </DialogContentText>
                    <TextField
                        id="date"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '100%', marginTop: '5px' }}
                    />
                </Grid>
                <Grid item >
                    <DialogContentText style={{margin: '8px 0px'}}>
                        <b>Оберіть доступний час</b>
                    </DialogContentText>
                    <Select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        MenuProps={MenuProps}
                        sx={{ width: '100%', marginTop: '5px' }}
                        >
                        {mockTime.map((statusOption) => (
                            <MenuItem key={statusOption.id} value={statusOption.value}>
                            {statusOption.value}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            <DialogActions>
				<Button onClick={handleClose}>Відмінити</Button>
				<Button onClick={handleSubmit} disabled={ !time || isEmpty(date)}>Підтвердити</Button>
			</DialogActions>
        </div>
    );
};

export default ModalWrapper(RegisterToAnalyses);