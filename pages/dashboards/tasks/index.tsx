import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { ChangeEvent, useState, useEffect } from 'react';
import PageHeader from '@/content/Dashboards/Tasks/PageHeader';
import Footer from '@/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Container,
  Card,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import TaskSearch from '@/content/Dashboards/Tasks/TaskSearch';
import DocumentGrid from '@/components/DocumentGrid/DocumentGrid';
import { trpc } from '@utils/trpc';
import { useSelector } from 'react-redux';
import { IApplicationState } from '@/reducers';
import { SentCardGridType } from '@/server/routers/sentCardRouter';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

const tabs = [
  { value: 'entryDoc', label: 'Вхідні документи' },
  { value: 'sentDoc', label: 'Вихідні документи' }
];

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '№',
    width: 50,
    editable: false,
  },
  {
    field: 'senderFullName',
    headerName: 'Відправник',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.sender.name || ''} ${params.row.sender.surname || ''}`,
  },
  {
    field: 'recipientFullName',
    headerName: 'Отримувач',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.recipient.name || ''} ${params.row.recipient.surname || ''}`,
  },
  {
    field: 'documentName',
    headerName: 'Назва документу',
    sortable: false,
    width: 250, 
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.card.documents[0].fileName || ''}`,
  },
  {
    field: 'documentDesciption',
    headerName: 'Опис документу',
    sortable: false,
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.card.documents[0].description || ''}`,
  },
  {
    field: 'recive',
    headerName: 'Одержано',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.createdAt}`,
  },
];
function DashboardTasks() {
	const utils = trpc.useContext();

  const user = useSelector((state: IApplicationState) => state.userSlice.user);

  const [currentTab, setCurrentTab] = useState<string>('entryDoc');
  const [recipientCards, setRecipientCards] = useState<SentCardGridType[]>();
  const [sendedCards, setSendedCards] = useState<SentCardGridType[]>();



  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const fetchRecipientCards = async (): Promise<void> => {
    const data = await utils.sentCard.recipientCards.fetch({ recipientId: user.id })
    setRecipientCards(data);
  }

  const fetchSendedCards = async (): Promise<void> => {
    const data = await utils.sentCard.sendedCards.fetch({ senderId: user.id })
    setSendedCards(data);
  }
  
  useEffect(() => {
    if (!recipientCards) {
      void fetchRecipientCards();
    }
    if (!sendedCards) {
      void fetchSendedCards();
    }
  }, []);
  
  return (
    <>
      <Head>
        <title>Головна</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <TabsContainerWrapper>
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
            {currentTab === 'entryDoc' && (
              <>
                <Grid item xs={12}>
                <Box p={4}>
                  <DocumentGrid rows={recipientCards} cols={columns}/>
                </Box>
                </Grid>
              </>
            )}
            {currentTab === 'sentDoc' && (
              <Grid item xs={12}>
                <Box p={4}>
                  <DocumentGrid rows={sendedCards} cols={columns}/>
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;
