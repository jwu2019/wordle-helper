import { CharStatus } from '@/lib/statuses'

import { WORD_LENGTH } from '../..//constants/settings'
import { unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  guess: string
  status: CharStatus[]
  isRevealing: number
  isCompleted?: boolean
  onCell: (position: number) => void
  className: string
}

export const CurrentRow = ({
  guess,
  status,
  onCell,
  isRevealing,
  className,
}: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(WORD_LENGTH - splitGuess.length))
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          status={status[i]}
          value={letter}
          position={i}
          onCell={onCell}
          isRevealingBool={isRevealing === i}
          isOtherReveal={isRevealing >= 0}
          isCompleted
        />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
