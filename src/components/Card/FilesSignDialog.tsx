import { FC, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Document from '@models/Document';
import { Typography, Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { trpc } from '@utils/trpc';
import CertificateInfo from '@/models/CertificateInfo';
import { plainToClass } from 'class-transformer';
import 'react-block-ui/style.css';
import BlockUi from 'react-block-ui';

interface IFilesSignDialogProps {
  selectedDocument: Document;
  open: boolean;
  onClose: (doc: Document) => void;
}

const FilesSignDialog: FC<IFilesSignDialogProps> = (props) => {
  const { onClose, selectedDocument, open } = props;
  const [userName, setUserName] = useState<string>('testDS');
  const [password, setPassword] = useState<string>('testDS');
  const [token, setToken] = useState<string>(null);
  const [keyName, setKeyName] = useState<string>(null);
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [passwordForKey, setPasswordForKey] = useState<string>(null);
  const [certInfo, setCertInfo] = useState<CertificateInfo>(null);
  const [blockUi, setBlockUi] = useState<boolean>(false);

  const updateSignHash = trpc.files.update.useMutation({
    async onSuccess(data) {
      setDisableInput(true);
      setBlockUi(false);
    },
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
      setBlockUi(true);
      const response = await axios.post(
        `https://depositsign.com/api/v1/${userName}/auth/login`,
        { UserName: userName, Password: password },
      );
      const newToken = response?.data?.Token;
      const newKeyName = response?.data.KeysInfo[0].KeyName;
      const cert = plainToClass(
        CertificateInfo,
        response?.data.KeysInfo[0]?.CertificatesInformation[0],
      );
      setCertInfo(cert);
      setKeyName(newKeyName);
      setToken(newToken);
      setBlockUi(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onSign = async (): Promise<void> => {
    setBlockUi(true);
    const hash = calculateSHA256(selectedDocument.fileBody.data);
    if (hash) {
      try {
        const model = {
          Password: '123',
          KeyName: keyName,
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
            signedHash: response.data?.SignedHash,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          component="h1"
          gutterBottom
          sx={{
            pl: 2,
          }}
        >
          Підпис документа
        </Typography>

        <IconButton onClick={handleClose} sx={{ ml: 'auto' }}>
          <CloseIcon />
        </IconButton>
      </div>
      <BlockUi tag="div" blocking={blockUi}>
        <Box sx={{ width: 400, height: 300, padding: '10px' }}>
          {!token ? (
            <>
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
                value={password}
                onChange={(event) => setPasswordForKey(event.target.value)}
              />
            </>
          ) : (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль до ключу"
              type="password"
              value={passwordForKey}
              onChange={(event) => setPassword(event.target.value)}
            />
          )}
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
          {certInfo && !disableInput && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>
                <b>Повне ім'я:</b> {certInfo.FullName}
              </span>
              <span>
                <b>Власник:</b> {certInfo.IssuerCN}
              </span>
              <span>
                <b>Серійний номер:</b> {certInfo.Serial}
              </span>
            </div>
          )}
          {disableInput && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                sx={{ color: '#57ca22' }}
              >
                Файл підписано успішно
              </Typography>
            </div>
          )}
        </Box>
      </BlockUi>
    </Dialog>
  );
};

export default FilesSignDialog;
