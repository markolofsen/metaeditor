import * as React from 'react';
import PropTypes from 'prop-types';

// material
import { makeStyles, lighten } from 'metalib/styles'
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// components
import ReadMore from '../../../../../components/ReadMore/'

// blocks
import OrderForm from './OrderForm'


// hooks
import { format } from 'metalib/common/helpers'


const useStyles = makeStyles((theme) => ({

	root: {
		width: 700,
	},

	rootList: {
		'& > li': {
			marginBottom: theme.spacing(2),
		},
		'& > [data-li="image"]': {
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			borderRadius: theme.shape.borderRadius,
			height: 300,
		},
		'& > [data-li="form"]': {
			borderRadius: theme.shape.borderRadius,
			backgroundColor: lighten(theme.palette.background.paper, .07),
			padding: theme.spacing(5),
			marginTop: theme.spacing(5),
		},
	},
	infoList: {
		backgroundColor: lighten(theme.palette.background.paper, .07),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		'& > li': {
			display: 'flex',
			alignItems: 'center',
			// margin
			'& > [data-icon]': {
				marginRight: theme.spacing(1),
			},
			'& > label': {
				...theme.typography.body2,
			}
		}
	},
	titleList: {
		display: 'flex',
		justifyContent: 'space-between',
		...theme.typography.h5,
		padding: theme.spacing(3, 0, 0),
	},

	description: {
		...theme.typography.subtitle2,
		textAlign: 'justify',
		marginBottom: theme.spacing(2),
	},

	groups: {
		paddingTop: theme.spacing(2),
		'& > [data-groups]': {
			marginTop: theme.spacing(2),
			display: 'flex',
			'& > ul': {
				flex: '1 0 50%',
				maxWidth: '50%',
				'& > li': {
					margin: theme.spacing(.5, 0),
					display: 'flex',
					alignItems: 'center',
					fontSize: theme.typography.body2.fontSize,
					// fontWeight: theme.props.fontWeight.semiBold,
					'& > label': {
						color: theme.palette.text.secondary,
						marginRight: theme.spacing(2),
					}
				}
			}
		}
	},

	formDetailsList: {
		'& > li': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingBottom: theme.spacing(1),
			...theme.typography.body2,
			'& > label': {
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(3),
			}
		}
	},

}));


function ContentDetails({ data, ...props }) {
	const classes = useStyles();
	const helpers = useHelpers();
	// const overlay = useOverlay();

	const renderTitle = () => {
		return (
			<ul className={classes.titleList}>
				<li data-li="label">
					{data.label}
				</li>
				<li data-li="price">
					{helpers.custom.toUsd(data.price)}
				</li>
			</ul>
		)
	}

	const renderInfo = () => {

		const list = [
			['bed', `${data.bedrooms} Beds`],
			['shower', `${data.bathrooms} Baths`],
			['photo_size_select_small', helpers.custom.toSqFt(data.square)],
			['attach_money', helpers.custom.toUsd(data.price / (data.square || 1)) + ' per Sq Ft'],
		]

		return (
			<ul className={classes.infoList}>
				{list.map(([icon, value], index) => (
					<li key={index}>
						<Icon data-icon>
							{icon}
						</Icon>
						<label>
							{value}
						</label>
					</li>
				))}
			</ul>
		);

	}

	const renderGroups = ({ title, list }) => {

		const chunks = helpers.array.split(list, 2)

		return (
			<div className={classes.groups}>

				<Typography variant="h5">
					{title}
				</Typography>

				<div data-groups>
					{chunks.map((group, index) => (
						<ul key={index}>
							{group.map(([label, value], i) => (
								<li key={`${index}-${i}`}>

									{label ? (
										<label>
											{label}:
										</label>
									) : ''}

									<span>
										{value}
									</span>
								</li>
							))}
						</ul>
					))}
				</div>

			</div>
		);

	}

	const renderDetails = () => {

		const list = [
			['Name', data.label],
			['Type', data.plan.variant],
			['Ownership', data?.building?.developer?.name || 'N/A'],
			['Beds', data.bedrooms],
			['Baths', data.bathrooms],
			['Interior size', data.interior_size ? helpers.custom.toSqFt(data.interior_size) : 'N/A'],
			['Balcony size', data.balcony_size ? helpers.custom.toSqFt(data.balcony_size) : 'N/A'],
			['Floor', data.floor],
			['Exposure', data.exposure || 'N/A'],
			['Ceiling Heights', data.ceiling_height ? helpers.custom.toFt(data.ceiling_height) : 'N/A'],
		]

		return renderGroups({
			title: 'Unit Details',
			list,
		});
	}

	// const renderPrices = () => {
	//
	// 	const list = [
	// 		['Starting Price', helpers.custom.toUsd(data.price)],
	// 		['Price per SqFt', helpers.custom.toUsd(data.price / (data.square || 1))],
	// 		['Monthly C.C. / Maint', 'N/A'],
	// 		['Monthly Property Tax', 'N/A'],
	// 		['Parking Cost', 'N/A'],
	// 		['Storage Cost', 'N/A'],
	// 	]
	//
	// 	return renderGroups({
	// 		title: 'Pricing & Fees',
	// 		list,
	// 	});
	// }

	const renderFees = () => {

		const list = [
			['', 'N/A at Signing'],
			['', 'Balance of 5% in 30 days'],
			['', '5% in 120 days'],
		]

		return renderGroups({
			title: 'Pricing & Fees',
			list,
		});
	}

	const renderFormDetails = () => {
		const list = [
			['Purchase Price', helpers.custom.toUsd(99999)],
			['Proposed Down Payment', helpers.custom.toUsd(99999)],
		]

		return (
			<ul className={classes.formDetailsList}>
				{list.map(([label, value], index) => (
					<li key={index}>
						<label>
							{label}:
						</label>
						<span>
							{value}
						</span>
					</li>
				))}
			</ul>
		)
	}

	if (!data) {
		return (<div />);
	}

	return (
		<div className={classes.root}>

			<ul className={classes.rootList}>

				{data.image ? (
					<li data-li="image" style={{
						backgroundImage: `url(${data.image})`
					}} />
				) : ''}

				<li>
					{renderInfo()}
				</li>
				<li>
					{renderTitle()}
				</li>
				{data.description ? (
					<li>
						<ReadMore data={data.description} size={70} maxLength={250}>
							{({ short, onClick, content, showButton }) => (
								<div>
									<div className={classes.description}>
										{content}
									</div>
									{showButton && (
										<Button
											size="small"
											startIcon={<Icon>{short ? 'expand_more' : 'expand_less'}</Icon>}
											variant="outlined"
											onClick={onClick}>
											{short ? 'Read more' : 'Close'}
										</Button>
									)}
								</div>
							)}
						</ReadMore>
					</li>
				) : ''}
				<li>
					{renderDetails()}
				</li>
				<li>
					{renderFees()}
				</li>
				<li data-li="form">
					<OrderForm unit_key={props.unit_key}>
						{renderFormDetails()}
					</OrderForm>
				</li>
			</ul>
		</div>
	);
}


ContentDetails.propTypes = {
	data: PropTypes.any,
	unit_key: PropTypes.any,
};

export default ContentDetails
