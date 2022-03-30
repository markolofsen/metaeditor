import * as React from 'react';
import PropTypes from 'prop-types';

// libs
import MailchimpSubscribe from 'react-mailchimp-subscribe';

// blocks
import NewsletterForm from './NewsletterForm';


const storageKey = 'mailChimpForm'


const NewsletterSubscribe = ({ config, ...props }) => {

  const MAILCHIMP_URL = config.url
  const MAILCHIMP_CUSTOM_FIELDS = config.customFields.SITE

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={(payload) => {
        const { subscribe, status, message } = payload || {};
        return (
          <NewsletterForm
            customFields={MAILCHIMP_CUSTOM_FIELDS}
            status={status}
            message={message}
            onSuccess={props.onSuccess}
            onError={props.onError}
            onValidated={(formData) => subscribe(formData)}
            storageKey={storageKey}
          />
        );
      }}
    />
  );
};

NewsletterSubscribe.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  config: PropTypes.exact({
    url: PropTypes.string.isRequired,
    customFields: PropTypes.object.isRequired,
  }).isRequired,
}

NewsletterSubscribe.storageKey = storageKey


export default NewsletterSubscribe;
