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

// styles
import { styled, alpha } from 'metalib/styles/'

// hooks
import useCommands from './useCommands'

// blocks
import CommandForm from './CommandForm'
import ExportDialog from './ExportDialog'
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

  const refCommandForm = React.useRef(null)
  const refExportDialog = React.useRef(null)

  const commands = useCommands()

  const [show, setShow] = React.useState(true)
  const [cbEmulation, setCbEmulation] = React.useState(true)
  const [showDefaults, setShowDefaults] = React.useState(true)

  const [verifiedCommands, setVerifiedCommands] = React.useState({})

  const onAdd = (fields) => {
    commands.addCommand(fields)
    setShow(true)
  }

  const onUpdate = (fields) => {
    commands.updateCommand(fields)
  }

  const onDelete = (fields) => {
    commands.deleteCommand(fields)
  }

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
      command: item.command,
      verification_id: undefined, //item.id,
      initiator: cbEmulation && 'fake',
      request: {
        body: item.body
      },
      fakeBody: cbEmulation ? item.fakeBody : undefined,
    }).then(res => {

      if (res) {
        setStatus('success')
        setTimeout(() => setStatus(undefined), 1000)
      } else {
        setStatus('error')
      }

    })

  }

  const commands_list = commands.commandsList

  const renderList = () => {

    if (commands_list.length === 0) {
      return (<div />);
    }

    let list = _.orderBy(commands_list, ['time', 'group'], ['asc', 'asc']);
    if (!showDefaults) {
      list = list.filter(item => !item.default)
    }

    return (
      <div>
        <Box sx={{ my: 2 }}>
          <CustomSwitcher
            label="Callback emulation"
            value={cbEmulation}
            onChange={setCbEmulation} />

          <CustomSwitcher
            label="Show defaults"
            value={showDefaults}
            onChange={setShowDefaults} />
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

            return (
              <ul key={index}>
                <li data-li="content" onClick={() => refCommandForm.current.edit(item)}>
                  <ul>
                    <li>
                      {item.command}
                    </li>
                    <li>
                      {item.group}
                    </li>
                  </ul>
                  <ul data-list="right">
                    <li>
                      {item.name}
                      <br />
                      {status.name}
                    </li>
                    {!item.default && (
                      <li>
                        id:{item.id}
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

  const myCommandCounter = commands_list.filter(item => !item.default).length

  return (
    <div>

      <ButtonGroup
        fullWidth
        variant="outlined"
        color="inherit">
        <Button onClick={() => setShow(c => !c)}>My commands: {myCommandCounter}</Button>
        <Button sx={{ width: 50 }} onClick={() => {
          refCommandForm.current.addNew()
        }}>
          <Icon>add</Icon>
        </Button>
        <Button sx={{ width: 50 }} onClick={() => {
          refExportDialog.current.open()
        }}>
          <Icon>cloud_upload</Icon>
        </Button>
      </ButtonGroup>

      <ExportDialog
        ref={refExportDialog}
        onImport={commands.importData}
        onExport={commands.exportData}
      />

      <CommandForm
        ref={refCommandForm}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete} />

      <Collapse in={show}>
        {renderList()}
      </Collapse>


    </div>
  )
}

export default MyCommands
