import React from 'react'
import PropTypes from 'prop-types';

// material
import {
	makeStyles,
	lighten,
} from '@mui/material/styles';
import Button from '@mui/material/Button'
// import Icon from '@mui/material/Icon'


// components
import Formik, {
	FieldText,
	FieldPhone,
} from 'components/Formik/'

// api
import { msg } from 'api/'
import ApiClass from 'api/methods/'


const useStyles = makeStyles(theme => ({

	root: {

	},
	headerList: {

		paddingBottom: theme.spacing(2),

		[theme.breakpoints.up('sm')]: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		},

		'& > [data-li="title"]': {
			...theme.typography.h5,
			[theme.breakpoints.down('xs')]: {
				marginBottom: theme.spacing(1),
			},
		},
		'& > [data-li="note"]': {
			...theme.typography.body2,
			color: theme.palette.text.secondary,
			textTransform: 'uppercase',
		},
	},
	groupedInputs: {
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
			margin: theme.spacing(0, -1),
			paddingTop: theme.spacing(2),
			'& > li': {
				flex: '1 0 50%',
				maxWidth: '50%',
				padding: theme.spacing(1),
			}
		}
	},
	footerList: {
		[theme.breakpoints.down('sm')]: {
			'& [data-button]': {
				width: '100%',
				display: 'block',
			}
		},
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingTop: theme.spacing(2),
		},
	},

	successBlock: {
		...theme.typography.h6,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}

}))

function OrderForm(props) {

	const classes = useStyles();
	const [success, setSuccess] = React.useState(false)

	const onSubmit = async (values) => {
		return await ApiClass().vec.vec_request_form.submit(props.unit_key, values).then(res => {
			if (res.status === 200) {
				setSuccess(true)
			}
			return res;
		})
	}

	const renderInner = () => {

		if (success) {
			return (
				<div className={classes.successBlock}>
					Request sent successfully!
				</div>
			)
		}

		return (
			<Formik
				onLoad={(payload) => { }}
				onRead={undefined}
				onSubmit={onSubmit}
				disabled={false}
				initConfig={{
					title: false,
					buttonComponent: false,
					buttonHide: true,
					buttonText: false,
					buttonFullwidth: true,
				}}
				initialValues={{
					name: '',
					phone: '',
					message: '',
				}}
				snackbar
				nonfieldErrors={{}} >
				{({ errors, isSubmitting, values, ...payload }) => {

					return (
						<div>

							<ul className={classes.headerList}>
								<li data-li="title">
									Online form
								</li>
								<li data-li="note">
									Tell Us About Yourself
								</li>
							</ul>

							<ul className={classes.groupedInputs}>
								<li>
									<FieldText
										label="Name"
										name="name"
										type="text"
										required={true}
										errors={errors}
										InputProps={{
											fullWidth: true,
										}}
									/>
								</li>
								<li>
									<FieldPhone
										label="Phone"
										name="phone"
										required={true}
										errors={errors}
										InputProps={{
											fullWidth: true,
										}}
									/>
								</li>
							</ul>

							<FieldText
								label="Message"
								name="message"
								type="textarea"
								required={false}
								errors={errors}
								InputProps={{
									fullWidth: true,
								}}
							/>

							<ul className={classes.footerList}>
								<li>
									{props.children || ''}
								</li>
								<li>
									<Button data-button variant="contained" color="primary" type="submit">
										Book now
									</Button>
								</li>
							</ul>

						</div>
					)
				}}
			</Formik>
		)
	}

	return (
		<div className={classes.root}>
			{renderInner()}
		</div>
	)
}

OrderForm.propTypes = {
	children: PropTypes.node,
	unit_key: PropTypes.string.isRequired,
};

OrderForm.defaultProps = {
};

export default OrderForm
