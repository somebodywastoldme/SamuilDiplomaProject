import { toNumber } from 'lodash';
import { useRouter } from 'next/router';
import DocumentListContainer from '~/components/PersonalDocumentList/PersonalDocumentListContainer';
import { NextPageWithLayout } from '~/pages/_app';

const PostViewPage: NextPageWithLayout = () => {
  const id = toNumber(useRouter().query.id as string)
  return <DocumentListContainer idPerson={id}/>;
};

export default PostViewPage;
