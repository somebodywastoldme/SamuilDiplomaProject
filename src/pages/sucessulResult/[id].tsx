import { toNumber } from 'lodash';
import { useRouter } from 'next/router';
import SuccessfulResult from '~/components/SuccessfulResult/SuccessfulResult';
import { NextPageWithLayout } from '~/pages/_app';

const SuccessfulResultViewPage: NextPageWithLayout = () => {
  const id = toNumber(useRouter().query.id as string)
  return <SuccessfulResult personId={id}/>;
};

export default SuccessfulResultViewPage;
