import React, { useState } from 'react';
import PropTypes from 'prop-types';

// hooks
import { useStorage } from '../../common/hooks/'

// libs
import { decode } from 'html-entities';

// material
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';


const NewsletterForm = ({ customFields, status, message, onValidated, storageKey, ...props }) => {
    const storage = useStorage()

    const [error, setError] = useState(null);

    const [data, setData] = useState({
        email: '',
        firstName: '',
    });

    const isDisabled = status === 'sending'


    React.useEffect(() => {

        const stored_data = storage.getItem(storageKey, 'local')
        if (typeof stored_data === 'object') {
            setData(stored_data)
        }

    }, [])

    React.useEffect(() => {

        if (status === 'error') {
            props.onError(message)
        } else if (status === 'success') {
            storage.setItem(storageKey, data, 'local')
            props.onSuccess(message)
        }

    }, [status])

    /**
     * Handle form submit.
     *
     * @return {{value}|*|boolean|null}
     */
    const handleFormSubmit = (event) => {
        event?.preventDefault()
        event?.stopPropagation()

        setError(null);

        const payload = {
            EMAIL: data.email,
            FNAME: data.firstName,
            ...customFields,
        }

        const isFormValidated = onValidated(payload);

        // On success return true
        return data.email && data.email.indexOf("@") > -1 && isFormValidated;
    }

    /**
     * Handle Input Key Event.
     *
     * @param event
     */
    const handleInputKeyEvent = (event) => {
        setError(null);
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            handleFormSubmit(event);
        }
    }

    /**
     * Handle change TextField
     * @param event
     */
    const handleChange = key => event => {
        const value = event?.target?.value ?? ''
        setData({
            ...data,
            [key]: value,
        })
    }

    /**
     * Extract message from string.
     *
     * @param {String} message
     * @return {null|*}
     */
    const getMessage = (message) => {
        if (!message) {
            return null;
        }
        const result = message?.split('-') ?? null;
        if ("0" !== result?.[0]?.trim()) {
            return decode(message);
        }
        const formattedMessage = result?.[1]?.trim() ?? null;
        return formattedMessage ? decode(formattedMessage) : null;
    }

    const renderMessages = () => {

        return (
            <Box sx={{ mb: 2 }}>

                {status === "sending" && (
                    <Alert severity="info">Sending...</Alert>
                )}

                {status === "error" || error ? (
                    <Alert severity="error">
                        <span dangerouslySetInnerHTML={{ __html: error || getMessage(message) }} />
                    </Alert>
                ) : null}
                {status === "success" && status !== "error" && !error && (
                    <Alert severity="success">
                        <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
                    </Alert>
                )}

            </Box>
        )
    }


    const fieldsList = [
        {
            key: 'firstName',
            label: 'Your name',
            type: 'text',
            required: true,
        },
        {
            key: 'email',
            label: 'Your email',
            type: 'email',
            required: true,
        },
    ]

    return (
        <>

            {renderMessages()}

            <form onSubmit={handleFormSubmit}>

                {fieldsList.map((item, index) => (
                    <TextField
                        key={index}
                        sx={{ mb: 3 }}
                        onChange={handleChange(item.key)}
                        label={item.label}
                        value={data[item.key]}
                        type={item.type}
                        onKeyUp={handleInputKeyEvent}
                        fullWidth
                        disabled={isDisabled}
                        required={item.required}
                        InputProps={{ inputProps: { tabIndex: index } }}
                    />
                ))}

                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isDisabled}>
                    Submit
                </Button>
            </form>

        </>
    );
}

NewsletterForm.propTypes = {
    customFields: PropTypes.any,
    status: PropTypes.string,
    message: PropTypes.string,
    onValidated: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    storageKey: PropTypes.string.isRequired,
}

export default NewsletterForm