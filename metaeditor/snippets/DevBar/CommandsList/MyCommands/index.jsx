import * as React from 'react';

// styles
import { styled } from 'metalib/styles/'

// context
import { useSystem } from '../../../../context/'

// material
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MuiListSubheader from '@mui/material/ListSubheader';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';

// blocks
import ButtonConnect from './ButtonConnect'

// hooks
import useCommands from './useCommands'

// components
import { CopyToClipboard } from '../../../../components/'


const List = styled.custom(MuiList, theme => ({
  // backgroundColor: 'red'
  // '& .MuiList-root': {
  //   backgroundColor: 'red'
  // },

  width: '100%',
  // bgcolor: 'background.paper',
  position: 'relative',
  overflow: 'auto',
  maxHeight: 500,
  '& ul': {
    padding: 0,
  },

}))

const ListSubheader = styled.custom(MuiListSubheader, theme => ({
  backgroundColor: 'rgba(255,255,255, .05)',
  padding: theme.spacing(1, 2),
  lineHeight: 'inherit',
  // borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  cursor: 'default',
}))

const ListItem = styled.custom(MuiListItem, theme => ({
  borderBottom: `solid 1px ${theme.palette.divider}`,
  padding: theme.spacing(.5, 2),
}))


export default function CommandsList() {
  const system = useSystem()
  const commands = useCommands()

  const commandsList = system.state.metaeditor?.commands || []

  let commandsGroup = {}
  for (let item of commandsList) {
    const key = item.group.name
    if (!commandsGroup.hasOwnProperty(key)) {
      commandsGroup[key] = {
        name: item.group.name,
        commands: [],
      }
    }
    commandsGroup[key].commands.push(item)
  }
  commandsGroup = Object.values(commandsGroup)
  // console.error('@@commandsGroup', commandsGroup)

  return (
    <>
      {/* {JSON.stringify(system.state.metaeditor, null, 4)} */}

      <Box sx={{ mb: 2 }}>
        <ButtonConnect />
      </Box>

      <List subheader={<li />}>
        {commandsGroup.map((group, index) => (
          <li key={index}>
            <ul>
              <ListSubheader>{group.name}</ListSubheader>
              {group.commands.map((item, i) => {
                const status = commands.getCommandStatus(item)
                let iconName = item.icon || ''
                if (status.value) {
                  iconName = status.icon
                }

                let label = item.name
                if (item.is_fake) {
                  label += ' (emulation)'
                }

                const getSecondary = () => {
                  return (
                    <CopyToClipboard text={item.command_uuid}>
                      {({ copied, label }) => (
                        <span>
                          {copied ? label : (
                            `${item.slug} #${item.command_uuid}`
                          )}
                        </span>
                      )}
                    </CopyToClipboard>
                  )
                }

                return (
                  <ListItem key={`${index}-${i}`}
                    onClick={() => commands.handleEmit(item)}
                    button
                    secondaryAction={
                      iconName ? (<Icon>{iconName}</Icon>) : undefined
                    }>
                    <ListItemText primary={label} secondary={getSecondary()} />
                  </ListItem>
                )
              })}
            </ul>
          </li>
        ))}
      </List>
    </>
  );
}
