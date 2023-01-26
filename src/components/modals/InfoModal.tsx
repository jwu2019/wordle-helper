import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Type in a guess. Click on the letter tiles to switch the tile color.
        After each guess, the list of remaining words will update to include the
        new information.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell
          isRevealingBool={true}
          isCompleted={true}
          value="W"
          status="correct"
        />
        <Cell value="E" isCompleted={true} />
        <Cell value="A" isCompleted={true} />
        <Cell value="R" isCompleted={true} />
        <Cell value="Y" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the word and in the correct spot.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="P" isCompleted={true} />
        <Cell value="I" isCompleted={true} />
        <Cell
          isRevealingBool={true}
          isCompleted={true}
          value="L"
          status="present"
        />
        <Cell value="O" isCompleted={true} />
        <Cell value="T" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L is in the word but in the wrong spot.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="V" isCompleted={true} />
        <Cell value="A" isCompleted={true} />
        <Cell value="G" isCompleted={true} />
        <Cell
          isRevealingBool={true}
          isCompleted={true}
          value="U"
          status="absent"
        />
        <Cell value="E" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>

      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
        Use this tool to figure out which words can be the Wordle solution!
        <br></br>
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="font-bold underline"
        >
          Check out the source code here!
        </a>
        <br></br>
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="font-bold underline"
        >
          Thanks to Reactle for the inspiration!
        </a>
      </p>
    </BaseModal>
  )
}
