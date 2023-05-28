import { Feed } from '@mui/icons-material';
import { Container, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import Addresses from 'src/content/applications/Users/profile/Addresses';
import MyCards from 'src/content/applications/Users/profile/MyCards';
import PopularTags from 'src/content/applications/Users/profile/PopularTags';
import ProfileCover from 'src/content/applications/Users/profile/ProfileCover';
import RecentActivity, { IRecentActivityItem } from 'src/content/applications/Users/profile/RecentActivity';
import AnalyseRecord from 'src/models/AnalyseRecord';
import { GetAllAnalysesbyUser, GetAllRecordByUser } from 'src/Services/DataAccessService';
import DoctorRecord from '../../models/DoctorRecord';
import Footer from '../Footer';
import { cloneDeep } from 'lodash';
import VaccinesTwoToneIcon from '@mui/icons-material/VaccinesTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
import { IApplicationState } from 'src/reducers';
import { useSelector } from 'react-redux';
import CardList from '../Card/CardList';
import { ICardItemProps } from '../Card/Card';
import { map } from 'lodash';
import moment from 'moment';
import DoctorRecordResult from '../ModalWidows/DoctorRecordResult';
import { CloseType } from '../ModalWidows/ModalWrapper';
import AnalyseRecordResult from '../ModalWidows/AnalyseRecordResult';

interface IPersonalInfoProps {
	personId: number;
};


const PersonalInfo: FC<IPersonalInfoProps> = (props) => {
	// #region states
	const user = useSelector((state: IApplicationState) => state.userSlice.user);
	const [records, setRecords] = useState<DoctorRecord[]>([]);
	const [recordsCard, setRecordsCard] = useState<ICardItemProps[]>([]);

	const [analyses, setAnalyses] = useState<AnalyseRecord[]>([]);
	const [analysesCard, setAnalysesCard] = useState<ICardItemProps[]>([]);

	const [recentActivityItems, setRecentActivityItems] = useState<IRecentActivityItem[]>([]);

	const [isModalOpenRecord, setIsModalOpenRecord] = useState<boolean>(false);
	const [isModalOpenAnalyses, setIsModalOpenAnalyses] = useState<boolean>(false);

	const [recordInModal, setRecordInModal] = useState<DoctorRecord>(null);
	const [analyseInModal, setAnalyseInModal] = useState<AnalyseRecord>(null);
	// #endregion
	// #region query
	const { data: analysesData } = useQuery("analysesData", async () => {
			const res = await GetAllAnalysesbyUser(props.personId);
			return res;
		}
	);
	const { data: recordsData } = useQuery("recordsData", async () => {
			const res = await GetAllRecordByUser(props.personId);
			return res;
		}
	);
	// #endregion
	
	// #rgion records
	const handleOpenRecords = (id: Number): void => {
		const recordToShow = records.filter((doc) => doc.id === id)[0];
		setRecordInModal(recordToShow);
		setIsModalOpenRecord(true)
	};
	const handleOpenAnalyse = (id: Number): void => {
		const recordToShow = analyses.filter((doc) => doc.id === id)[0];
		setAnalyseInModal(recordToShow);
		setIsModalOpenAnalyses(true)
	};
	//#endregion
	// #region useEffects
	useEffect(() => {
		setRecords(recordsData);
		let nextRecentActivityItems: IRecentActivityItem[] = cloneDeep(recentActivityItems);
		if(recordsData) {
			nextRecentActivityItems.push({
				title: "Записів до лікаря",
				count: recordsData.length,
				avatar: <LocalHospitalTwoToneIcon/>
			} as IRecentActivityItem)
			setRecentActivityItems(nextRecentActivityItems);

			const docCards = map(recordsData, (record: DoctorRecord) => {
				return {
					avatar: '/static/images/avatars/4.jpg',
					title: record.doctor.user.firstName + ' ' + record.doctor.user.secondName,
					subtitle: moment(record.date).format('MM YYYY, h:mm:ss a'),
					tooltip: 'Детальніше',
					titleUnderPhoto: record.doctor.medicalTopic.name,
					id: record.id
				} as ICardItemProps;
			});
			setRecordsCard(docCards);
		}
	}, [recordsData]);

	useEffect(() => {
		setAnalyses(analysesData);
		let nextRecentActivityItems: IRecentActivityItem[] = cloneDeep(recentActivityItems);
		if(analysesData) {
			nextRecentActivityItems.push({
				title: "Записів на аналізи",
				count: analysesData.length,
				avatar: <VaccinesTwoToneIcon/>
			} as IRecentActivityItem)
			setRecentActivityItems(nextRecentActivityItems);

			const docCards = map(analysesData, (analyse: AnalyseRecord) => {
				return {
					avatar: '/static/images/avatars/4.jpg',
					title: analyse.subject.name,
					subtitle: moment(analyse.date).format('MM YYYY, h:mm:ss a'),
					tooltip: 'Детальніше',
					titleUnderPhoto: analyse.subject.topic.name,
					id: analyse.id
				} as ICardItemProps;
			});
			setAnalysesCard(docCards);
		}
	}, [analysesData]);
	// #endregion
	return (
		<>
			<Helmet>
				<title>Персональний кабінет</title>
			</Helmet>
			<Container sx={{ mt: 3 }} maxWidth="lg">
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} md={8}>
						<ProfileCover user={user} />
					</Grid>
					<Grid item xs={12} md={4}>
						<RecentActivity items={recentActivityItems} />
					</Grid>
					<Grid item xs={12} md={12}>
						<CardList title={'Аналізи'} cards={analysesCard} onCardClick={handleOpenAnalyse} />
						<AnalyseRecordResult isOpen={isModalOpenAnalyses} title={'Результат аналізу'} handleClose={() => void setIsModalOpenAnalyses(false)} data={analyseInModal}/>
					</Grid>
					<Grid item xs={12} md={12}>
						<CardList title={'Записи до лікаря'} cards={recordsCard} onCardClick={handleOpenRecords}/>
						<DoctorRecordResult isOpen={isModalOpenRecord} title={'Дані про візит'} handleClose={() => void setIsModalOpenRecord(false)} data={recordInModal}/>
					</Grid>
					<Grid item xs={12} md={7}>
						<MyCards />
					</Grid>
					<Grid item xs={12} md={5}>
						<Addresses />
					</Grid>
				</Grid>
				</Container>
			<Footer />
		</>
	);
}

export default PersonalInfo;
