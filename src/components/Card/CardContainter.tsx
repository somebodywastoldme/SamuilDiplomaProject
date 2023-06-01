import { FC, useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import FileViewer from '../components/FileViewer/FileViewer';
import { SentCardType } from '@/server/routers/sentCardRouter';
import { trpc } from '@utils/trpc';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import { plainToClass } from 'class-transformer';
import 'react-reflex/styles.css';
import DocumentList from '../components/DocumentList/DocumentList';
import Document from '@models/Document';
import { map } from 'lodash';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import CardHeader from './CardHeader';

interface ICardContainer {
  cardId: number;
}

const CardContainer: FC<ICardContainer> = ({ cardId }) => {
  const utils = trpc.useContext();

  const [card, setCard] = useState<SentCardType>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document>();

  const fetchCard = async (): Promise<void> => {
    const data = await utils.sentCard.byId.fetch({ id: cardId });
    const result = JSON.parse(data);

    const docs = map(result?.card?.documents, (doc) =>
      plainToClass(Document, doc),
    );
    setDocuments(docs);
    setCard(result as SentCardType);
  };

  const onSelectDocument = (id: number): void => {
    const doc = documents?.find((el) => el.id === id);
    setSelectedDocument(doc ?? null);
  };

  useEffect(() => {
    if (!card) {
      void fetchCard();
    }
  }, [cardId]);
  return (
    <>
      <PageTitleWrapper>
        <CardHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          spacing={3}
          sx={{ height: '100%' }}
        >
          <Grid item xl={12}>
            <Card>
              <Divider />
              <CardContent>
                <ReflexContainer orientation="vertical">
                  <ReflexElement className="left-pane">
                    <FileViewer
                      base64={
                        selectedDocument?.fileBody ?? 'YXNkYXNkYXNkYXFzZGFzZHM='
                      }
                    />
                  </ReflexElement>
                  <ReflexSplitter />
                  <ReflexElement className="right-pane">
                    <DocumentList
                      documents={documents}
                      onSelectDocument={onSelectDocument}
                    />
                  </ReflexElement>
                </ReflexContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CardContainer;
