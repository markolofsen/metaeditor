import * as React from 'react';

// context
import { usePlayer, useSystem } from '../../../context/';

// ui
import { jss } from '../../../assets/styled';
import IconButton from 'rsuite/IconButton';

// icons
import CopyIcon from '@rsuite/icons/Copy';



const useStyles = jss({
  groupList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: `solid 1px rgba(255,255,255,.1)`,
    '& > li': {
      '&:nth-child(1)': {
        opacity: .7,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: 200,
        marginBottom: 10,
      },
      '&:nth-child(2)': {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5,
      }
    }
  },
})

interface Props {
  list: any,
}

export const CommandsList: React.FC<Props> = (props) => {
  const classes = useStyles()
  const player = usePlayer()
  const system = useSystem()

  const [performers, setPerformers] = React.useState<any>({})

  React.useEffect(() => {
    system.cls.loadData()
  }, [])

  const handlePerformer = (id: any, status: string) => {
    setPerformers((c: any) => ({ ...c, [id]: status }))
  }

  const handlerCommand = async (item: any) => {
    handlePerformer(item.id, 'loading')
    await player.cls.emitAsyncCommand(item.slug, item.value).then((res: any) => {
      if (res) {
        handlePerformer(item.id, 'success')
      } else {
        handlePerformer(item.id, 'error')
      }
    })
  }

  const renderCommandsList = () => {

    let groups: any = {}
    props.list.map((item: any) => {
      if (typeof groups[item.slug] === 'undefined') {
        groups[item.slug] = {
          name: item.slug,
          group: item.group?.name,
          items: [],
        }
      }
      groups[item.slug].items.push(item)
    })
    const group_list = Object.values(groups)

    return (
      <div>
        {group_list.map((group: any, index: number) => {
          return (
            <ul key={index} className={classes.groupList}>
              <li>
                {group.name} ({group.group})
              </li>
              <li>
                {group.items.map((item: any, i: number) => {
                  let status: string | boolean = false
                  if (performers.hasOwnProperty(item.id)) {
                    status = performers[item.id]
                  }
                  const isLoading = status === 'loading'
                  // const isError = status === 'error'
                  // const isSuccess = status === 'success'

                  const getName = () => {
                    if (typeof item?.name === 'undefined') return ''
                    if (item.name.length > 20) {
                      return item.name.substr(0, 17) + '...'
                    }
                    return item.name
                  }
                  return (
                    <div key={`${index}-${i}`}>
                      <IconButton
                        onClick={() => handlerCommand(item)}
                        loading={isLoading}
                        icon={(
                          <CopyIcon
                            style={{
                              zIndex: 10,
                            }}
                            onClick={(event) => {
                              event.preventDefault()
                              event.stopPropagation()

                              navigator.clipboard.writeText(item.command_uuid).then(function () {
                                alert(`Uuid copied:\n${item.command_uuid}`)
                              }, function (err) {
                                console.error('Async: Could not copy text: ', err);
                              });

                            }} />
                        )}
                        placement="left">
                        {getName()}
                      </IconButton>
                    </div>
                  )
                })}
              </li>
            </ul>
          )
        })}
      </div>
    )
  }


  return (
    <div>
      {renderCommandsList()}
    </div>
  )
}