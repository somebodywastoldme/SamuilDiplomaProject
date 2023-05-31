import Head from 'next/head';
import { ReactNode } from 'react';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Система поселення до гуртожитку</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mainPageContainer">
          {children}
        </div>
      </main>
    </>
  );
};
