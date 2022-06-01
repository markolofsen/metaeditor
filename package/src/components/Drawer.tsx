import * as React from 'react'

// ui
import { jss, media } from '../assets/styled';
import Drawer from 'rsuite/Drawer';


const useStyles = jss({
  header: {
    [media.down.xs]: {
      marginTop: 40,
    },
  },
  container: {
    overflow: 'auto',
    pointerEvents: 'all',
    maxHeight: 'calc(100vh - 77px)',
  },
})

interface Props {
  children?: React.ReactNode
  title?: string | React.ReactNode
  onClose?: Function
  withBody?: boolean
  ActionsComponent?: React.ReactNode
}

export const CustomDrawer: React.FC<any> = React.forwardRef((props: Props, ref: any) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState<any>(false);
  const [config, setConfig] = React.useState<any>({
    body: props.withBody,
    title: props.title,
    Component: null,
  });

  /**
   * The component instance will be extended
   * with whatever you return from the callback passed
   * as the second argument
   */
  React.useImperativeHandle(ref, () => ({

    open: (title: string, body: boolean, Component: any = null) => {
      setConfig((c: any) => ({
        ...c,
        title: title || c.title,
        body: body || c.body,
        Component: Component || null,
      }))
      setOpen(true)
    },
    close: () => {
      handleClose()
    },
    isOpen: open,

  }));

  const handleClose = () => {
    setOpen(false)

    if (typeof props.onClose === 'function') {
      props.onClose()
    }
  }

  const renderChildren = () => {
    const Children = config.Component || props.children

    if (config.body) {
      return (
        <div style={{ padding: 20 }}>
          {Children}
        </div>
      )
    }

    return (
      Children
    )
  }

  return (
    <Drawer
      size='xs'
      placement='right'
      backdrop={false}
      open={open}
      onClose={handleClose}>
      <Drawer.Header className={classes.header}>
        {typeof config.title === 'string' ? (
          <Drawer.Title>
            {config.title}
          </Drawer.Title>
        ) : (config.title)}

        {props.ActionsComponent ? (
          <Drawer.Actions style={{
            marginRight: -20,
          }}>
            {props.ActionsComponent}
          </Drawer.Actions>
        ) : ''}
      </Drawer.Header>
      <div
        onWheel={(e: any) => {
          e.stopPropagation()
        }}
        className={classes.container}>
        {renderChildren()}
      </div>
    </Drawer>
  );
})