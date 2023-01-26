import { CharStatus } from '@/lib/statuses'

import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  statuses: CharStatus[][]
  currentGuess: string
  currentStatus: CharStatus[]
  onCell: (position: number) => void
  isRevealing: number
  currentRowClassName: string
}

export const Grid = ({
  guesses,
  statuses,
  currentGuess,
  currentStatus,
  onCell,
  isRevealing,
  currentRowClassName,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} status={statuses[i]} guess={guess} />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow
          guess={currentGuess}
          status={currentStatus}
          onCell={onCell}
          className={currentRowClassName}
          isRevealing={isRevealing}
          isCompleted
        />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </>
  )
}
