import { FC } from 'react';
import PersonalInfo from './PersonalInfo';
import { useParams } from "react-router-dom";
import { IApplicationState } from 'src/reducers';
import { useSelector } from 'react-redux';

const PersonalInfoWrapper: FC = () => {
    const { id } = useParams();
    return ( 
        <PersonalInfo personId={Number(id)} />
    );
};

export default PersonalInfoWrapper