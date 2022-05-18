import * as React from 'react';
import { Link } from 'react-router-dom';

// // libs
// import url from 'url'

// hooks
import { useApi } from 'src/hooks/useApi';

// ui
import { jss, colors, media } from 'src/components/styled';

// icons
import GearIcon from '@rsuite/icons/Gear';

// components
import { SvgIcon } from 'src/components/SvgIcon'

const useStyles = jss({
  itemList: {

    marginBottom: '1rem',
    backgroundColor: 'rgba(0,0,0,.6)',
    backdropFilter: 'blur(20px)',
    borderRadius: 10,
    overflow: 'hidden',

    [media.up.md]: {
      display: 'flex',
      '& > li': {
        minHeight: 200,
      },
    },


    '& > [data-li="image"]': {

      position: 'relative',
      backgroundColor: 'rgba(0,0,0,.7)',
      transition: 'all .5s ease-in-out',
      [media.down.md]: {
        overflow: 'hidden',
        height: 300,
      },
      [media.up.md]: {
        width: '30%',
      },
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0)'
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
    }
  },
  badgeNew: {
    backgroundColor: colors.success[800],
    borderRadius: 100,
    padding: '5px 10px',
    marginRight: 20,
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
    <div>
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

                  <SvgIcon name='play' size={100} />
                </>
              </Link>
            </li>
            <li data-li="content">



              <h4 style={{ marginBottom: 20 }}>
                {item.is_best && (
                  <span className={classes.badgeNew}>
                    New!
                  </span>
                )}
                <Link to={href} target='_blank'>
                  {item.title}
                </Link>
              </h4>
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

