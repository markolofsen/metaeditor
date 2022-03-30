import * as React from 'react';
import PropTypes from 'prop-types';

// libs
import { PixelStreaming } from './components/';
import NotificationsProvider from './components/Notifications/Provider';

// hooks
import { useUnload } from './common/hooks/';


const MetaEditorContext = React.forwardRef((props, ref) => {

    const unload = useUnload(e => {
        e.preventDefault();
        e.returnValue = '';
    });

    React.useEffect(() => {

        if (props.isDev === false) {
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

