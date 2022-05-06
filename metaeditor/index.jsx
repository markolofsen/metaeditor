import * as React from 'react';
import PropTypes from 'prop-types';

// libs
import { PixelStreaming } from './components/';

// hooks
import { useUnload } from 'metalib/common/hooks/';

// material
import { makeStyles } from '@mui/styles';

// notifications
import NotificationsProvider from './components/Notifications/Provider';

// metadata
import packageJson from './package.json';
const version = packageJson.version.split('.').slice(0, 2).join('.') + ' (beta)'
export const MetaData = {
    version
}

// Global styles for player
const useStyles = makeStyles((theme) => ({
    '@global': {
        html: {
            touchAction: 'manipulation',
            height: 'var(--window-height)',
        },
        body: {
            padding: 0,
            margin: 0,
            minHeight: 'auto',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: 'auto',
            height: 'var(--window-height)',
        }
    }
}));


const MetaEditorContext = React.forwardRef((props, ref) => {
    const classes = useStyles()

    const unload = useUnload(e => {
        e.preventDefault();
        e.returnValue = '';
    });

    React.useEffect(() => {

        if (!props.isDev) {
            unload.activate()
        }

        return () => {
            unload.deactivate()
        }
    }, [])

    return (
        <NotificationsProvider>
            <PixelStreaming {...props} ref={ref} />
        </NotificationsProvider>
    )
})

MetaEditorContext.propTypes = {
    isDev: PropTypes.bool,
};

export default MetaEditorContext

