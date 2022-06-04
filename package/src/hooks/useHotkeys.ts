/* Usage
// https://www.npmjs.com/package/react-hotkeys-hook

// hooks
import {useHotkeys} from 'hooks/'

function App() {
  const [amount, setAmount] = useState<any>(0)
  useHotkeys('ctrl+a', () => setAmount(prevAmount => prevAmount + 100))
  useHotkeys('ctrl+d', () => setAmount(prevAmount => prevAmount - 100))

  useHotkeys('ctrl+t', (e, ke) => {
     if(!e.repeat) {
       console.log(e.repeat);
       return ;
     }
     setAmount(prevAmount => prevAmount - 100)
   }, [c])

  return (
    <div>
      {amount >= 0 ? 'Add' : 'Remove'} {Math.abs(amount)} dollars{' '}
      {amount >= 0 ? 'from' : 'to'} my bank account.
    </div>
  )
}
*/

import * as React from 'react'

export { useHotkeys } from 'react-hotkeys-hook';
