import { Button, DialogActions, DialogContentText, Grid, MenuItem, Select, TextField } from '@mui/material';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {FC, useState} from 'react';
import Doctor from 'src/models/Doctor';
import ModalWrapper, { CloseType, IModalWindowProps } from './ModalWrapper';
import DoctorRecord from 'src/models/DoctorRecord';
import AnalyseRecord from 'src/models/AnalyseRecord';
export interface IAnalyseRecordResultProps extends IModalWindowProps {
}

const AnalyseRecordResult: FC<IAnalyseRecordResultProps> = (props) => {
    const [record, setRecord] = useState<AnalyseRecord>(props.data as AnalyseRecord);
    const handleClose = () => {
        props.handleClose(CloseType.CLOSE, null)
    };
    const handleSubmit= () => {
        props.handleClose(CloseType.OK, null)
    };
    return (
        <div>
            <DialogContentText style={{marginBottom: '8px'}}>
                Дані про аналіз {record.subject.name}
            </DialogContentText>
            <Grid
                container
                direction="column"
                spacing={'4'}
            >
                <Grid item >
                    <DialogContentText style={{marginBottom: '8px'}}>
                        {record.result}
                    </DialogContentText>
                </Grid>
            </Grid>
            <DialogActions>
				<Button onClick={handleClose}>OK</Button>
			</DialogActions>
        </div>
    );
};

export default ModalWrapper(AnalyseRecordResult);
