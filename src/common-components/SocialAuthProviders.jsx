import React from 'react';

import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '@openedx/paragon';
import { Login } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';

import './socialauthproviders.css';

import messages from './messages';
import { LOGIN_PAGE, SUPPORTED_ICON_CLASSES } from '../data/constants';

const GOOGLE_PROVIDER_ID = 'oa2-google-oauth2';

const SocialAuthProviders = (props) => {
  const { formatMessage } = useIntl();
  const { referrer, socialAuthProviders } = props;

  function handleSubmit(e) {
    e.preventDefault();

    const url = e.currentTarget.dataset.providerUrl;
    window.location.href = getConfig().LMS_BASE_URL + url;
  }

  const socialAuth = socialAuthProviders.map((provider, index) => {
    const providerUrl = referrer === LOGIN_PAGE ? provider.loginUrl : provider.registerUrl;
    const srText = referrer === LOGIN_PAGE
      ? formatMessage(messages['sso.sign.in.with'], { providerName: provider.name })
      : formatMessage(messages['sso.create.account.using'], { providerName: provider.name });

    if (provider.id === GOOGLE_PROVIDER_ID) {
      return (
        <button
          id={provider.id}
          key={provider.id}
          type="button"
          className="gsi-material-button"
          data-provider-url={providerUrl}
          onClick={handleSubmit}
        >
          <div className="gsi-material-button-state" />
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon" aria-hidden="true">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </div>
            <span className="gsi-material-button-contents notranslate" aria-hidden="true">
              {provider.name}
            </span>
          </div>
          <span className="sr-only">{srText}</span>
        </button>
      );
    }

    return (
      <button
        id={provider.id}
        key={provider.id}
        type="button"
        className={`btn-social btn-${provider.id} ${index % 2 === 0 ? 'mr-3' : ''}`}
        data-provider-url={providerUrl}
        onClick={handleSubmit}
      >
        {provider.iconImage ? (
          <div aria-hidden="true">
            <img className="btn-tpa__image-icon" src={provider.iconImage} alt={`icon ${provider.name}`} />
          </div>
        )
          : (
            <div className="btn-tpa__font-container" aria-hidden="true">
              {SUPPORTED_ICON_CLASSES.includes(provider.iconClass) ? (
                <FontAwesomeIcon icon={['fab', provider.iconClass]} />)
                : (
                  <Icon className="h-75" src={Login} />
                )}
            </div>
          )}
        <span id="provider-name" className="notranslate mr-auto pl-2" aria-hidden="true">{provider.name}</span>
        <span className="sr-only">{srText}</span>
      </button>
    );
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{socialAuth}</>;
};

SocialAuthProviders.defaultProps = {
  referrer: LOGIN_PAGE,
  socialAuthProviders: [],
};

SocialAuthProviders.propTypes = {
  referrer: PropTypes.string,
  socialAuthProviders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    iconClass: PropTypes.string,
    iconImage: PropTypes.string,
    loginUrl: PropTypes.string,
    registerUrl: PropTypes.string,
    skipRegistrationForm: PropTypes.bool,
  })),
};

export default SocialAuthProviders;

