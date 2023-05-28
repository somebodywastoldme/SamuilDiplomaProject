import { Container, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { map } from 'lodash';
import { ICardItemProps } from 'src/components/Card/Card';
import CardList from 'src/components/Card/CardList';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Doctor from 'src/models/Doctor';
import { GetAllAnalyses, GetAllDoctors, RecordToAnalyse, RecordToDoctor } from 'src/Services/DataAccessService';
import PageHeader from '../dashboards/Crypto/PageHeader';
import { useQuery } from 'react-query';
import Analyse from 'src/models/Analyse';
import RegisterToDoctor from 'src/components/ModalWidows/RegisterToDoctor';
import { CloseType } from 'src/components/ModalWidows/ModalWrapper';
import { useSelector } from 'react-redux';
import { IApplicationState } from 'src/reducers';
import RegisterToAnalyses from 'src/components/ModalWidows/RegisterToAnalyses';

const HomePage: FC = () => {
	const userId = useSelector((state: IApplicationState) => state.userSlice.user.id);
	// #region states
	const [doctors, setDoctors] = useState<Doctor[]>([]);
	const [doctorsCard, setDoctorsCard] = useState<ICardItemProps[]>([]);

	const [analyses, setAnalyses] = useState<Analyse[]>([]);
	const [analysesCard, setAnalysesCard] = useState<ICardItemProps[]>([]);

	const [isModalOpenDoc, setIsModalOpenDoc] = useState<boolean>(false);
	const [isModalOpenAnalyses, setIsModalOpenAnalyses] = useState<boolean>(false);

	const [doctorInModal, setDoctorInModal] = useState<Doctor>(null);
	const [analyseInModal, setAnalyseInModal] = useState<Analyse>(null);
	// #enregion
	const { data: doctorsData } = useQuery("doctorsData", async () => {
			const res = await GetAllDoctors();
			return res;
		}
	);

	const { data: analysesData } = useQuery("repoData", async () => {
		const res = await GetAllAnalyses();
		return res;
	}
	);

	// #region handlers
	const handleOpenRegDoctor = (id: Number): void => {
		const doctorToShow = doctors.filter((doc) => doc.id === id)[0];
		setDoctorInModal(doctorToShow);
		setIsModalOpenDoc(true)
	};
	const handleCloseRegDoctor = async (closeType: CloseType, data: any): Promise<void> => {
		console.log(data);
		if (closeType === CloseType.OK)
			await RecordToDoctor(data.dateTime, userId, data.doctor.id, data.doctor.medicalTopic.id);
		setIsModalOpenDoc(false);
	}

	const handleOpenRegAnalyse = (id: Number): void => {
		const analyseToShow = analyses.filter((doc) => doc.id === id)[0];
		setAnalyseInModal(analyseToShow);
		setIsModalOpenAnalyses(true)
	};
	const handleCloseRegAnalyse = async (closeType: CloseType, data: any): Promise<void> => {
		console.log(data);
		if (closeType === CloseType.OK)
			await RecordToAnalyse(data.dateTime, userId, data.analyse.id, data.analyse.id);
		setIsModalOpenAnalyses(false);
	}
	// #endregion

	// #region useEffects
	useEffect(() => {
		setAnalyses(analysesData);
		const docCards = map(analysesData, (analyse: Analyse) => {
			return {
				avatar: '/static/images/avatars/4.jpg',
				title: analyse.name,
				subtitle: '',
				tooltip: 'Записатися',
				titleUnderPhoto: analyse.topic.name,
				id: analyse.id
			} as ICardItemProps;
		});
		setAnalysesCard(docCards);
	}, [analysesData]);

	useEffect(() => {
		setDoctors(doctorsData);
			const docCards = map(doctorsData, (doc: Doctor) => {
				return {
					avatar: '/static/images/avatars/4.jpg',
					title: doc.user.firstName + ' ' + doc.user.secondName,
					subtitle: doc.medicalTopic.name,
					tooltip: 'Записатися',
					titleUnderPhoto: doc.user.email,
					id: doc.id
				} as ICardItemProps;
			});
			setDoctorsCard(docCards);
	}, [doctorsData]);
	// #endregion
	return (
		<>
			<Helmet>
				<title>Головна</title>
			</Helmet>
			<PageTitleWrapper>
				<PageHeader />
			</PageTitleWrapper>
			<Container maxWidth="lg">
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					spacing={4}
				>
					<Grid item xs={12}>
						<CardList title={'Лікарі'} cards={doctorsCard} onCardClick={handleOpenRegDoctor}/>
						<RegisterToDoctor
							isOpen={isModalOpenDoc}
							title={"Записатися до лікаря"}
							handleClose={handleCloseRegDoctor}
							data={doctorInModal}
						/>
					</Grid>
					<Grid item xs={12}>
						<CardList title={'Аналізи'} cards={analysesCard} onCardClick={handleOpenRegAnalyse}/>
						<RegisterToAnalyses
							isOpen={isModalOpenAnalyses}
							title={"Записатися на Аналіз"}
							handleClose={handleCloseRegAnalyse}
							data={analyseInModal}
						/>
					</Grid>
				</Grid>
			</Container>
			<Footer />
		</>
	)
}

export default HomePage;