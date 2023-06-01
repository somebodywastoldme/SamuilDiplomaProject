import { FC, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Document from '@models/Document';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { trpc } from '@utils/trpc';

interface IFilesSignDialogProps {
  selectedDocument: Document;
  open: boolean;
  onClose: (doc: Document) => void;
}

const FilesSignDialog: FC<IFilesSignDialogProps> = (props) => {
  const { onClose, selectedDocument, open } = props;
  const [userName, setUserName] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [token, setToken] = useState<string>(null);
  const [keyName, setKeyName] = useState<string>(null);

  const updateSignHash = trpc.files.update.useMutation({
    async onSuccess(data) {},
  });

  const handleClose = () => {
    onClose(selectedDocument);
  };

  const calculateSHA256 = (byteArray) => {
    const wordArray = CryptoJS.lib.WordArray.create(byteArray);
    const hash = CryptoJS.SHA256(wordArray);
    const hashHex = hash.toString(CryptoJS.enc.Hex);
    return hashHex;
  };

  const readKey = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `https://depositsign.com/api/v1/${userName}/auth/login`,
        { UserName: userName, Password: password },
      );
      const newToken = response?.data?.Token;
      setToken(newToken);
    } catch (error) {
      console.error(error);
    }
  };

  const onSign = async (): Promise<void> => {
    const hash = calculateSHA256(selectedDocument.fileBody.data);
    if (hash) {
      try {
        const model = {
          Password: '123',
          KeyName: 'cb993969-053c-4f6f-b0cb-d11721f8d81c',
          AppendDataTsp: true,
          FileHash: '9wdoOI/CpuH0Vlo/flTg3UiBx2/89ZRup97rBtF0yak=',
        };
        const response = await axios.post(
          `https://depositsign.com/api/v1/${userName}/sign/hash/cades`,
          model,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (response.data?.SignedHash) {
          await updateSignHash.mutateAsync({
            fileId: selectedDocument.id,
            signedHash: response.data?.SignedHash
          });
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    console.log(hash);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Підпис документа</DialogTitle>
      <Box sx={{ width: 400, height: 300, padding: '10px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Логін"
          name="userName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {token ? (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onSign}
          >
            Підписати
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={readKey}
          >
            Зчитати ключ
          </Button>
        )}
      </Box>
    </Dialog>
  );
};

export default FilesSignDialog;
