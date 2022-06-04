import * as React from 'react'

// hooks
import { useNotify } from '../../../hooks/useNotify'

// context
import { usePlayer } from '../../../context/';

// ui
import { jss } from '../../../assets/styled';
import Button from 'rsuite/Button';


// components
import { SvgIcon } from '../../../components/SvgIcon';


const useStyles = jss({
  content: {

  },
  keysList: {
    marginBottom: 20,
    width: 230,
    fontSize: '.8rem',
    '& > li': {
      display: 'flex',
      alignItems: 'center',
      padding: '3px 0',
      '& label': {
        width: 100,
      },
      '& > div': {
        display: 'flex',
        alignItems: 'center',
        '& > span': {
          margin: '0 4px',
        }
      }
    }
  },
  button: {
    backgroundColor: '#fff',
    color: 'rgba(0,0,0,.7)',
  }
})

export const KeyboardHelper = () => {
  const classes = useStyles()
  const notify = useNotify()
  const player = usePlayer()

  React.useEffect(() => {

    if (player.computed.streaming.active) {

      setTimeout(() => {
        handleOpen()
      }, 1000 * 3)

    }

  }, [player.computed.streaming.active])

  const renderContent = () => {
    const list = [
      ['Move up', 'W', 'arrowUp'],
      ['Move down', 'S', 'arrowDown'],
      ['Move left', 'A', 'arrowLeft'],
      ['Move left', 'D', 'arrowRight'],
    ].map(([label, key, icon]) => ({ label, key, icon }))

    return (
      <div className={classes.content}>
        <ul className={classes.keysList}>
          {list.map((item, index) => (
            <li key={index}>
              <label>
                {item.label}
              </label>
              <div>
                Press "{item.key}" or <SvgIcon name={item.icon} size={20} />
              </div>
            </li>
          ))}
        </ul>
        <Button
          onClick={() => notify.message.clear()}
          appearance='primary' className={classes.button}>
          I got it
        </Button>
      </div>
    )
  }


  const handleOpen = () => {
    // notify.message.clear()

    notify.message.push(renderContent(), {
      header: 'HotKeys',
      showIcon: false,
      type: 'info',
      closable: true,
      duration: 1000 * 10,
    }, {
      placement: 'bottomEnd',
    })
  }

  return (
    <SvgIcon button buttonSize='lg'
      name={'question'}
      onClick={() => {
        handleOpen()
      }} />
  )

  // return (
  //   <div
  //     onClick={() => handleOpen()}
  //     style={{
  //       top: 30,
  //       left: 30,
  //       position: 'fixed', zIndex: 1000,
  //       // backgroundColor: 'red'
  //     }}>

  //     {renderContent()}

  //   </div>
  // )
}