import React, { useState, forwardRef, useCallback } from 'react';

// libs
import { useSnackbar, SnackbarContent } from 'notistack';

// material
import { makeStyles } from '@mui/styles';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';


const useStyles = makeStyles(theme => ({
  root: {
    // [theme.breakpoints.down('sm')]: {
    minWidth: '344px !important',
    // },
  },
  card: {
    // backgroundColor: '#fddc6c',
    width: '100%',
  },
  typography: {
    fontWeight: 'bold',
  },
  actionRoot: {
    padding: '8px 8px 8px 16px',
    justifyContent: 'space-between',
  },
  icons: {
    marginLeft: 'auto',
  },
  expand: {
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    // transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    color: '#b3b3b3',
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: 'none',
  },
}));

const SnackMessage = forwardRef((props, ref) => {

  // const SnackMessage = forwardRef<HTMLDivElement, { id: string | number, message: string | React.ReactNode, title: string }>((props, ref) => {}))


  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant="subtitle2" className={classes.typography}>
            {props.title}
          </Typography>
          <div className={classes.icons}>
            <IconButton
              aria-label="Show more"
              className={expanded ? classes.expandOpen : classes.expand}
              onClick={handleExpandClick}
            >
              <Icon>expand_more</Icon>
            </IconButton>
            <IconButton className={classes.expand} onClick={handleDismiss}>
              <Icon>close</Icon>
            </IconButton>
          </div>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {props.message}
        </Collapse>

      </Card>
    </SnackbarContent>
  );
});


export default SnackMessage
