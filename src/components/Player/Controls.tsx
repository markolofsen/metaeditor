
// components
import Carousel from 'src/components/Carousel'

// libs
import { Hooks } from 'pixel-streaming';


export default function Controls() {
  const actions = Hooks.actions()

  const items = Array.from(Array(10).keys()).map((item) => ({
    src: 'https://fakeimg.pl/350x230/282828/eae0d0/?retina=1&text=MetaEditor',
    title: `Item ${item}`,
    onClick: () => {
      actions.emitUi({ action: 'ui_command' }, { debug: true })
      // actions.emitSys({ action: 'system_command' }, { debug: true })
    }
  }))

  return (
    <Carousel items={items} />
  )
}