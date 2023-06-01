import { FC, useState, useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Document from '@models/Document';
import { map, first } from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  Button,
  Container,
  IconButton,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@mui/material';
import { trpc } from '@utils/trpc';

interface IDocumentList {
  cardId: number;
  documents: Document[];
  onSelectDocument: (id: number) => void;
  refetchCard: () => Promise<void>;
}

const DocumentList: FC<IDocumentList> = (props) => {
  const utils = trpc.useContext();
  const inputRef = useRef(null);

  const [selectedId, setSelectedId] = useState<number>(1);

  const addDocument = trpc.files.create.useMutation({
    async onSuccess() {
      await props.refetchCard();
    },
  });

  const deleteDocument = trpc.files.delete.useMutation({
    async onSuccess() {
      await props.refetchCard();
    },
  });

  const handleDeleteFile = async (): Promise<void> => {
    await deleteDocument.mutateAsync({ fileId:selectedId });
  };

  const handleAddFile = (): void => {
    inputRef.current.click();
  };
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
  ) => {
    setSelectedId(id);
    props.onSelectDocument(id);
  };

  const handleFileInputChange = async (e: any): Promise<void> => {
    const file = e.target.files && e.target.files[0];
    const onSuccess = async (documentBody: string): Promise<void> => {
      const input = {
        fileName: file.name,
        fileBody: documentBody,
        cardId: props.cardId,
      };
      await addDocument.mutateAsync(input);
    };
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result
          ? event.target?.result.toString()
          : null;
        base64 ? void onSuccess(base64) : console.log('base64 is null');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const doc = first(props.documents);
    props.onSelectDocument(doc?.id);
  }, [props.documents]);

  const getDocumentItem = (doc: Document): JSX.Element => {
    return (
      <ListItemButton
        key={doc.id}
        selected={selectedId === doc.id}
        onClick={(event) => handleListItemClick(event, doc.id)}
      >
        <ListItemText primary={doc.fileName} />
      </ListItemButton>
    );
  };
  return (
    <>
      <label htmlFor="file-input">
        <IconButton aria-label="delete" sx={{ margin: 1 }} size="small" onClick={handleAddFile}>
          <AttachFileIcon fontSize="inherit" />
        </IconButton>
      </label>
      <input
        id="file-input"
        type="file"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      <IconButton aria-label="delete" sx={{ margin: 1 }} onClick={handleDeleteFile}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      <List component="nav" aria-label="secondary mailbox folder">
        {map(props.documents, getDocumentItem)}
      </List>
    </>
  );
};

export default DocumentList;
