import { Button, DialogActions, DialogContentText, Grid, MenuItem, Select, TextField } from '@mui/material';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {FC, useState} from 'react';
import Doctor from 'src/models/Doctor';
import ModalWrapper, { CloseType, IModalWindowProps } from './ModalWrapper';
import DoctorRecord from 'src/models/DoctorRecord';
export interface IDoctorRecordResultProps extends IModalWindowProps {
}

const DoctorRecordResult: FC<IDoctorRecordResultProps> = (props) => {
    const [record, setRecord] = useState<DoctorRecord>(props.data as DoctorRecord);
    const handleClose = () => {
        props.handleClose(CloseType.CLOSE, null)
    };
    const handleSubmit= () => {
        props.handleClose(CloseType.OK, null)
    };
    return (
        <div>
            <DialogContentText style={{marginBottom: '8px'}}>
                Дані про візит до {record.doctor.user.firstName + ' ' + record.doctor.user.secondName}
            </DialogContentText>
            <Grid
                container
                direction="column"
                spacing={'4'}
            >
                <Grid item >
                    <DialogContentText style={{marginBottom: '8px'}}>
                    Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка оцінює композицію сторінки. Сенс використання Lorem Ipsum полягає в тому, що цей текст має більш-менш нормальне розподілення літер на відміну від, наприклад, "Тут іде текст. Тут іде текст." Це робить текст схожим на оповідний. Багато програм верстування та веб-дизайну використовують Lorem Ipsum як зразок і пошук за терміном "lorem ipsum" відкриє багато веб-сайтів, які знаходяться ще в зародковому стані. Різні версії Lorem Ipsum з'явились за минулі роки, деякі випадково, деякі було створено зумисно (зокрема, жартівливі).
                    </DialogContentText>
                </Grid>
            </Grid>
            <DialogActions>
				<Button onClick={handleClose}>OK</Button>
			</DialogActions>
        </div>
    );
};

export default ModalWrapper(DoctorRecordResult);
