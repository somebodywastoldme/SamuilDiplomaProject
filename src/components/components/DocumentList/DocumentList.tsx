import { FC, useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Document from '@models/Document';
import { map, first } from 'lodash';
interface IDocumentList {
  documents: Document[];
  onSelectDocument: (id: number) => void;
}

const DocumentList: FC<IDocumentList> = (props) => {
  const [selectedId, setSelectedId] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
  ) => {
    setSelectedId(id);
    props.onSelectDocument(id);
  };

  useEffect(() => {
    const doc = first(props.documents);
    props.onSelectDocument(doc?.id);
  }, [props.documents])
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
    <List component="nav" aria-label="secondary mailbox folder">
      {map(props.documents, getDocumentItem)}
    </List>
  );
};

export default DocumentList;
