import * as React from 'react'

// hooks
import { useApi } from 'src/hooks/useApi';

// ui
import { jss, media } from "pixel-streaming"
import Animation from 'rsuite/Animation';
import Button from 'rsuite/Button';

// components
import Gallery from 'src/components/Gallery/'

const useStyles = jss({
  root: {
    height: '100vh',
    backgroundColor: '#000',
  },
  logo: {
    position: 'absolute',
    zIndex: 5,
    top: '10vh',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none',
    transition: 'top .3s ease-in-out',
    '&[data-show="true"]': {
      top: '5vh',
    },
    '& > img': {
      width: 300,
    },

  },
  popover: {
    // backgroundColor: 'red',
    position: 'absolute',
    // top: 0,
    left: 0,
    right: 0,
    bottom: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    pointerEvents: 'none',

    '& [data-inner]': {
      // marginTop: '30vh',
      width: 400 - 30,
      backgroundColor: 'black',
      boxShadow: '0 0 30px 0 rgba(0,0,0,.4)',
      border: `solid 2px rgba(255,255,255, .3)`,
      color: '#fff',
      padding: 20,
      borderRadius: 10,
      transition: 'height .3s ease-in-out',

      '&[data-show="true"]': {
        pointerEvents: 'all',
      }
    }
  },
  gallery: {
    height: '100%',
  }
})

const View: React.FC = () => {
  const classes = useStyles()
  const api = useApi()

  const [data, setData] = React.useState<any>(false)
  const [selected, setSelected] = React.useState<any>(false)

  React.useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => [
    await api.getDemosGallery().then((res) => {
      if (res.ok) {
        setData(res.body)
      }
    })
  ]

  const showPopover = selected && selected?.data?.slug ? true : false

  return (
    <div className={classes.root}>

      <div className={classes.logo} data-show={showPopover}>
        <img src="/static/logo_demos.svg" />
      </div>

      <Animation.Bounce in={showPopover} timeout={600}>
        {(props, ref) => (
          <div className={classes.popover}>
            <div ref={ref} {...props}>
              <div data-inner data-show={showPopover}>
                <div>
                  <h5>
                    {selected?.data?.title}
                  </h5>
                  <p>
                    {selected?.data?.description.substr(0, 500)}
                  </p>

                  <div style={{ height: 20 }} />

                  <Button
                    block
                    href={`/player/${selected?.data?.slug}`}
                    target="_blank"
                    appearance='primary'
                    size="lg">
                    Open
                  </Button>
                  {/* <pre>
                    {JSON.stringify(selected, null, 4)}
                  </pre> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </Animation.Bounce>


      {/* <pre>
        {JSON.stringify(data.images, null, 4)}
      </pre> */}
      {data !== false && (
        <div className={classes.gallery}>
          <Gallery
            onChange={(v: any) => {
              setSelected(v)
            }}
            images={data.images} />
        </div>
      )}

    </div>
  )
}

export default View