import {
Card,
Grid,
Box,
CardContent,
Typography,
Avatar,
alpha,
Tooltip,
CardActionArea,
styled
} from '@mui/material';
import { FC } from 'react';

const AvatarWrapper = styled(Avatar)(
({ theme }) => `
	margin: ${theme.spacing(2, 0, 1, -0.5)};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: ${theme.spacing(1)};
	padding: ${theme.spacing(0.5)};
	border-radius: 60px;
	height: ${theme.spacing(5.5)};
	width: ${theme.spacing(5.5)};
	background: ${
	theme.palette.mode === 'dark'
		? theme.colors.alpha.trueWhite[30]
		: alpha(theme.colors.alpha.black[100], 0.07)
	};

	img {
	background: ${theme.colors.alpha.trueWhite[100]};
	padding: ${theme.spacing(0.5)};
	display: block;
	border-radius: inherit;
	height: ${theme.spacing(4.5)};
	width: ${theme.spacing(4.5)};
	}
`
);

const AvatarAddWrapper = styled(Avatar)(
({ theme }) => `
		background: ${theme.colors.alpha.black[10]};
		color: ${theme.colors.primary.main};
		width: ${theme.spacing(8)};
		height: ${theme.spacing(8)};
`
);
export interface ICardItemProps {
	id: number;
	avatar: string;
	title: string;
	subtitle: string;
	tooltip: string;
	titleUnderPhoto: string;
	handleClick?: (id: number) => void
}

const CardItem: FC<ICardItemProps> = (props) => {
	const handleOpen = () => {
		if(props.handleClick) {
			props.handleClick(props.id)
		}
	}
	return (
		<Grid xs={6} sm={3} md={3} item onClick={handleOpen}>
			<Tooltip arrow title={props.tooltip}>
				<CardActionArea
					sx={{
					px: 1
					}}
				>
					<Card
						sx={{
						px: 1
						}}
					>
						<CardContent>
							<AvatarWrapper>
								<img
								alt="BTC"
								src={props.avatar}
								/>
							</AvatarWrapper>
							{/* <Typography variant="h5" noWrap>
								{props.title}
							</Typography> */}
							<Typography variant="subtitle1" noWrap>
								{props.titleUnderPhoto}
							</Typography>
							<Box
								sx={{
								pt: 3
								}}
							>
								<Typography variant="h3" gutterBottom noWrap>
									{props.title}
								</Typography>
								<Typography variant="subtitle2" noWrap>
									{props.subtitle}
								</Typography>
							</Box>
						</CardContent>
					</Card>
				</CardActionArea>
          	</Tooltip>
			
		</Grid>
	);
};

export default CardItem;
