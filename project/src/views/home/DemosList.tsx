import * as React from 'react';
import { Link } from 'react-router-dom';

// hooks
import { useApi } from 'src/hooks/useApi';

// ui
import { jss, colors, media } from 'pixel-streaming';

// icons
import GearIcon from '@rsuite/icons/Gear';

// components
import { SvgIcon } from 'pixel-streaming'

const useStyles = jss({
  itemsRoot: {
    display: 'flex',
    flexDirection: 'column',
    '& > ul': {
      [media.down.sm]: {
        marginBottom: '.5em',
      },
      [media.up.sm]: {
        marginBottom: '1.5em',
      },
    }
  },
  itemList: {
    backdropFilter: 'blur(20px)',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,.2)',
    border: `solid 1px rgba(255,255,255, .1)`,
    transition: 'border-color .5s linear',
    overflow: 'hidden',
    '&:hover': {
      borderColor: `rgba(255,255,255, .35)`,
      '& > [data-li="image"]': {
        backgroundColor: 'rgba(0,0,0,.6)',
        '& em': {
          opacity: 1,
        }
      }
    },

    [media.up.md]: {
      display: 'flex',
      '& > li': {
        minHeight: 230,
      },
    },


    '& > [data-li="image"]': {

      position: 'relative',

      transition: 'all .5s ease-in-out',
      [media.down.md]: {
        overflow: 'hidden',
        height: 300,
      },
      [media.up.md]: {
        width: '30%',
      },
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,.4)',
      },
      '& a': {
        color: '#ffffff',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem',
        '& > em': {
          opacity: 0,
          transition: 'opacity .5s linear',
        },
        '& > span:nth-child(1)': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,.4)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          zIndex: -1,
        },
      },
    },
    '& > [data-li="content"]': {
      flex: 1,
      padding: 30,
      position: 'relative',
      '& > p': {
        opacity: .8,
      }
    }
  },
  badgeNew: {
    backgroundColor: colors.success[800],
    borderRadius: 100,
    padding: '5px 10px',
    marginRight: 20,
    pointerEvents: 'none',
    [media.down.xs]: {
      position: 'absolute',
      top: -50,
    }
  },
  preloader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 10,
    padding: 30,
  }
})




function DemosList() {
  const classes = useStyles()
  const api = useApi()

  const [data, setData] = React.useState<any>(false)

  React.useEffect(() => {

    loadData()

    // if (router.isReady) {

    //   const current = url.parse(document.location.href, true, false)
    //   const dev = url.parse(env.DEV_URL, true, false)
    //   if (current.hostname === dev.hostname) {
    //     router.push('/localhost')
    //   } else {

    //   }
    // }

  }, [])

  const loadData = async () => [
    await api.getDemosList().then(res => {
      if (res.ok) {
        setData(res.body)
      }
    })
  ]



  if (data === false) {
    return (
      <div className={classes.preloader}>
        <GearIcon spin style={{ fontSize: '2em' }} />
      </div>
    )
  }

  return (
    <div className={classes.itemsRoot}>
      {data.map((item: any, index: number) => {
        const href = `/player/${item.slug}`
        return (
          <ul key={index} className={classes.itemList}>
            <li data-li="image">
              <Link to={href} target='_blank'>
                <>
                  <span style={{
                    backgroundImage: `url(${item.preview_small})`
                  }} />
                  {/* <Link href={`player/${item.slug}/?view=${item.view_mode}`} passHref> */}

                  <em>
                    <SvgIcon name='play' size={100} />
                  </em>
                </>
              </Link>
            </li>
            <li data-li="content">

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                {item.is_best && (
                  <h5 className={classes.badgeNew}>
                    New!
                  </h5>
                )}
                <h4>
                  <Link to={href} target='_blank'>
                    {item.title}
                  </Link>
                </h4>
              </div>
              <p>
                {item.description}
              </p>
            </li>
          </ul>
        )
      })}
    </div>
  )

}

export default DemosList

