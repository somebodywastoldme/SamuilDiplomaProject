import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import {FC} from 'react';

export enum CloseType {
	OK = 1,
	CLOSE = 2 
}
export interface IModalWindowProps {
	isOpen: boolean;
	title: string;
	handleClose: (closeType: CloseType, data: any) => Promise<void>
	data: any;
}

const ModalWrapper = (OriginalComponent) => {
	function NewComponent(props: IModalWindowProps) {
		return (
		<Dialog open={props.isOpen} onClose={props.handleClose} maxWidth={'lg'}>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent>
				<OriginalComponent {...props}/>
			</DialogContent>
		</Dialog>
		);
	}
	return NewComponent;
  };
export default ModalWrapper;