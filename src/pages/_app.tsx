import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '@components/DefaultLayout'
import { trpc } from '@utils/trpc'

import './defaultLayout.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { reduxStore, persistor } from '../Store/configureStore';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return  <Provider store={reduxStore}>
            <PersistGate loading={null} persistor={persistor}>
                { getLayout(<Component {...pageProps} />) }
              </PersistGate>
          </Provider>
}) as AppType;

export default trpc.withTRPC(MyApp);
