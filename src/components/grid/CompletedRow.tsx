import { CharStatus } from '../../lib/statuses'
import { unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  status: CharStatus[]
  guess: string
}

export const CompletedRow = ({ status, guess }: Props) => {
  const splitGuess = unicodeSplit(guess)
  return (
    <div className="mb-1 flex justify-center">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} status={status[i]} position={i} />
      ))}
    </div>
  )
}
