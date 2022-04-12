import * as React from 'react';
import PropTypes from 'prop-types';

// context
import { usePlayer } from '../../../../context/';

// libs
import _ from 'lodash'

// material
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// styles
import { styled, alpha } from '../../../../common/styles/'

// hooks
import useCommands from './useCommands'

// blocks
import CustomSwitcher from './CustomSwitcher'


const CommandList = styled.div(theme => ({
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
  overflow: 'auto',
  maxHeight: '25vh',
  '& > ul': {
    borderBottom: `solid 1px ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'stretch',
    ...theme.typography.body2,
    '&:hover': {
      backgroundColor: alpha(theme.palette.divider, .04),
    },
    '&:last-child': {
      borderBottom: 0,
    },
    '& > li': {
      flex: 1,
      padding: theme.spacing(1, 1),
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: alpha(theme.palette.divider, .1),
      },
    },
    '& > [data-li="content"]': {
      justifyContent: 'space-between',
      '& > ul': {
        '& > li': {
          ...theme.typography.body2,
          maxWidth: 200,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.2em',
          '&:nth-child(2)': {
            fontSize: 11,
            opacity: .5,
          },
        },
      },
      '& > [data-list="right"]': {
        '& > li': {
          textAlign: 'right',
        },
      },
    },
    '& > [data-li="icon"]': {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      minWidth: 45,
      maxWidth: 45,
      justifyContent: 'center',
      // backgroundColor: alpha(theme.palette.divider, .1),
      '&[data-disabled="true"]': {
        opacity: .5,
        pointerEvents: 'none',
      },
    }
  }
}))

function MyCommands(props) {
  const player = usePlayer()

  const commands = useCommands()

  const [show, setShow] = React.useState(true)
  const [systemCommands, setSystemCommands] = React.useState(true)

  const [verifiedCommands, setVerifiedCommands] = React.useState({})

  const handleEmit = async (item) => {

    // console.error('@@@@@item', item, index)

    // const generateRandomIntegerInRange = (min, max) => {
    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // const verification_id = item.id + generateRandomIntegerInRange(1000, 10000)

    const setStatus = (status) => {
      setVerifiedCommands(c => {
        c[item.id] = status
        return c
      })
    }

    setStatus('await')

    await player.cmd.emit({
      command: item.slug,
      verification_id: undefined, //item.id,
      initiator: item.is_fake && 'fake',
      request: {
        body: item.value
      },
      fakeBody: item.is_fake ? item.value_fake_response : undefined,
    }).then(res => {

      if (res) {
        setStatus('success')
        setTimeout(() => setStatus(undefined), 1000)
      } else {
        setStatus('error')
      }

    })

  }

  const { commandsList } = commands

  const renderList = () => {

    if (commandsList.length === 0) {
      return (<div />);
    }

    // let list = _.orderBy(commandsList, ['time', 'group'], ['asc', 'asc']);
    let list = commandsList
    if (!systemCommands) {
      list = list.filter(item => item.variant !== 'system')
    }

    return (
      <div>
        <Box sx={{ my: 2 }}>
          <CustomSwitcher
            label="System commands"
            value={systemCommands}
            onChange={setSystemCommands} />
        </Box>

        <CommandList>
          {list.map((item, index) => {

            const getStatus = () => {

              let [value, icon] = [undefined, 'play_arrow']

              if (verifiedCommands.hasOwnProperty(item.id)) {
                value = verifiedCommands[item.id]
                if (value === 'await') {
                  icon = 'hourglass_full'
                } else if (value === 'success') {
                  icon = 'check'
                } else if (value === 'error') {
                  icon = 'error'
                }
              }

              return { value, icon }
            }

            const status = getStatus()
            const buttonDisabled = status.value && status.value !== 'error'
            const chipLabel = item.slug
            const chipVariant = item.is_fake ? 'outlined' : 'filled'

            return (
              <ul key={index}>
                <li data-li="content" onClick={() => {
                  // ...
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.icon ? (
                      <Icon sx={{ mr: 1, fontSize: '2rem' }}>{item.icon}</Icon>
                    ) : ''}
                    <Chip
                      size="small"
                      variant={chipVariant}
                      label={chipLabel} />
                  </Box>
                  <ul data-list="right">
                    <li>
                      {item.name}
                      <br />
                      {status.name}
                    </li>
                    {item.variant !== 'system' && (
                      <li>
                        {item.group?.name} // #{item.id}
                      </li>
                    )}
                  </ul>
                </li>
                <li data-li="icon" data-disabled={buttonDisabled} onClick={() => handleEmit(item)}>
                  <Icon>{status.icon}</Icon>
                </li>
              </ul>
            )
          })}
        </CommandList>
      </div>
    )
  }

  const myCommandCounter = commandsList.filter(item => item.variant !== 'system').length

  return (
    <div>

      <ButtonGroup
        fullWidth
        variant="outlined"
        color="inherit">
        <Button onClick={() => setShow(c => !c)}>My commands: {myCommandCounter}</Button>
        <Button disabled sx={{ width: 120 }} onClick={() => {
          ///...
        }}>
          Api Key
        </Button>
      </ButtonGroup>

      <Collapse in={show}>
        {renderList()}
      </Collapse>


    </div>
  )
}

export default MyCommands
