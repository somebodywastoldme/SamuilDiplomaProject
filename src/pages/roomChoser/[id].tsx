import { toNumber } from 'lodash';
import { useRouter } from 'next/router';
import RoomSelector from '@components/RoomSelector/RoomSelector';
import { NextPageWithLayout } from '@pages/_app';

const RoomChoserViewPage: NextPageWithLayout = () => {
  const id = toNumber(useRouter().query.id as string)
  return <RoomSelector personId={id}/>;
};

export default RoomChoserViewPage;
