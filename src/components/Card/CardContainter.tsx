import { FC, useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Divider } from '@mui/material';
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
import CardHeader, { ICardAddresser } from './CardHeader';
import FilesSignDialog from './FilesSignDialog';
import BlockUi from 'react-block-ui';
interface ICardContainer {
  cardId: number;
}

const CardContainer: FC<ICardContainer> = ({ cardId }) => {
  const utils = trpc.useContext();

  const [card, setCard] = useState<SentCardType>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document>();
  const [addresser, setAddresser] = useState<ICardAddresser[]>([]);
  const [selectedAddresser, setSelectedAddresser] =
    useState<ICardAddresser>(null);
  const [resultMessage, setResultMessage] = useState<string>(null);
  const [fileSingOpen, setFileSingOpen] = useState<boolean>(false);
  const [blockUi, setBlockUi] = useState<boolean>(true);

  const addCard = trpc.sentCard.update.useMutation({
    async onSuccess(data) {
      setResultMessage('Документ відправлено успішно!');
    },
  });

  const SendCard = async (): Promise<void> => {
    await addCard.mutateAsync({
      id: cardId,
      addresserId: selectedAddresser.value,
      sendingTypeId: 1,
    });
  };

  const fetchCard = async (): Promise<void> => {
    const data = await utils.sentCard.byId.fetch({ id: cardId });
    const result = JSON.parse(data);

    const docs = map(result?.card?.documents, (doc) =>
      plainToClass(Document, doc),
    );
    setDocuments(docs);
    setCard(result as SentCardType);
  };

  const fetchAddresser = async (): Promise<void> => {
    const data = await utils.user.list.fetch();
    const docAddresser = map(data, (el) => {
      return {
        label: `${el.name}  ${el.surname}`,
        value: el.id,
      } as ICardAddresser;
    });
    setAddresser(docAddresser);
  };

  const onSelectDocument = (id: number): void => {
    const doc = documents?.find((el) => el.id === id);
    setSelectedDocument(doc ?? null);
  };

  const onSelectAddresser = (id: number): void => {
    const docAddresser = addresser?.find((el) => el.value === id);
    setSelectedAddresser(docAddresser);
  };

  const singDocument = (): void => {
    setFileSingOpen(true);
  };

  const onCloseFilesSignDialog = (doc: Document) => {
    console.log(doc);
  };

  useEffect(() => {
    if (!card) {
      void fetchCard();
      void fetchAddresser();
    }
  }, [cardId]);

  useEffect(() => {
    if (card && documents) {
      setBlockUi(false);
    }
  }, [card, documents]);
  
  return (
    <>
      <BlockUi tag="div" blocking={blockUi}>
        <PageTitleWrapper padding={20}>
          <CardHeader
            addresser={addresser}
            selectedAddresser={selectedAddresser}
            sendCard={SendCard}
            onSelectAddresser={onSelectAddresser}
            resultMessage={resultMessage}
            singDocument={singDocument}
            selectedDocument={selectedDocument}
          />
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
                          selectedDocument?.fileBody ??
                          'YXNkYXNkYXNkYXFzZGFzZHM='
                        }
                      />
                    </ReflexElement>
                    <ReflexSplitter />
                    <ReflexElement className="right-pane">
                      <DocumentList
                        documents={documents}
                        onSelectDocument={onSelectDocument}
                        refetchCard={fetchCard}
                        cardId={card?.cardId}
                      />
                    </ReflexElement>
                  </ReflexContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <FilesSignDialog
          selectedDocument={selectedDocument}
          open={fileSingOpen}
          onClose={onCloseFilesSignDialog}
        />
      </BlockUi>
    </>
  );
};

export default CardContainer;
