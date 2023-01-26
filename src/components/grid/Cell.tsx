import classnames from 'classnames'

import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { CharStatus } from '../../lib/statuses'

type Props = {
  value?: string
  status?: CharStatus
  isRevealingBool?: boolean
  isOtherReveal?: boolean
  isCompleted?: boolean
  position?: number
  onCell?: (position: number) => void
}

export const Cell = ({
  value,
  status,
  isRevealingBool,
  isOtherReveal,
  isCompleted,
  onCell,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealingBool && isCompleted
  const animationDelay = `0ms`
  const isHighContrast = getStoredIsHighContrastMode()
  const temp =
    'xxshort:w-11 xxshort:h-11 short:text-2xl short:w-12 short:h-12 w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white'

  const classes = classnames(temp, {
    'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
      !status,
    'unknown border-black dark:border-slate-100': status === 'unknown',
    'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
      status === 'absent',
    'correct shadowed bg-orange-500 text-white border-orange-500':
      status === 'correct' && isHighContrast,
    'present shadowed bg-cyan-500 text-white border-cyan-500':
      status === 'present' && isHighContrast,
    'correct shadowed bg-green-500 text-white border-green-500':
      status === 'correct' && !isHighContrast,
    'present shadowed bg-yellow-500 text-white border-yellow-500':
      status === 'present' && !isHighContrast,
    'cell-fill-animation': isFilled,
    'cell-reveal': shouldReveal,
  })

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onCell && event.detail >= 1 && !isOtherReveal) {
      onCell(position)
    }
  }

  return (
    <button onClick={handleClick}>
      <div className={classes} style={{ animationDelay }}>
        <div className="letter-container" style={{ animationDelay }}>
          {value}
        </div>
      </div>
    </button>
  )
}
