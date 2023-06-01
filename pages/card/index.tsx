import { useSelector } from 'react-redux';
import { IApplicationState } from '@/reducers';
import SidebarLayout from '@/layouts/SidebarLayout';
import CardContainer from '@/components/Card/CardContainter';

const CardPage = () => {
    const cardId = useSelector((state: IApplicationState) => state.cardSlice.currentCardId);
    return (
        <CardContainer cardId={cardId}/>
    );
}

CardPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CardPage;