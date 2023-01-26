import './App.css'

import { default as GraphemeSplitter } from 'grapheme-splitter'
import { useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'

import { AlertContainer } from './components/alerts/AlertContainer'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { WordList } from './components/list/WordList'
import { InfoModal } from './components/modals/InfoModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { Navbar } from './components/navbar/Navbar'
import {
  DISCOURAGE_INAPP_BROWSERS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WORD_LENGTH,
} from './constants/settings'
import {
  CORRECT_WORD_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
  EMPTY_LETTERS,
  NOT_ENOUGH_LETTERS_MESSAGE,
  NOT_VALID_INPUT,
  WORD_NOT_FOUND_MESSAGE,
} from './constants/strings'
import { WORDS } from './constants/wordlist'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import {
  getStoredIsHighContrastMode,
  setStoredIsHighContrastMode,
} from './lib/localStorage'
import { CharStatus, getValidGuesses } from './lib/statuses'
import { isWordInWordList, unicodeLength } from './lib/words'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const { showError: showErrorAlert } = useAlert()

  const [currentGuess, setCurrentGuess] = useState('')
  const [currentStatus, setCurrentStatus] = useState<CharStatus[]>(() => {
    return Array(WORD_LENGTH).fill('unknown')
  })
  const [guesses, setGuesses] = useState<string[]>(() => {
    return []
  })
  const [statuses, setStatuses] = useState<CharStatus[][]>(() => {
    return []
  })
  const [validGuesses, setValidGuesses] = useState([...WORDS.sort()])
  const [charStatus, setCharStatus] = useState<CharStatus[]>(() => {
    return Array(26).fill('unknown')
  })
  const [isRevealing, setIsRevealing] = useState(-1)

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )

  useEffect(() => {
    if (!localStorage.getItem('infoSeen')) {
      localStorage.setItem('infoSeen', 'true')
      setIsInfoModalOpen(true)
    }
  }, [setIsInfoModalOpen])

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  const onCell = (position: number) => {
    var newStatus = [...currentStatus]
    if (currentStatus[position] === 'unknown') {
      newStatus[position] = 'absent'
    } else if (currentStatus[position] === 'absent') {
      newStatus[position] = 'present'
    } else if (currentStatus[position] === 'present') {
      newStatus[position] = 'correct'
    } else {
      newStatus[position] = 'unknown'
    }
    setCurrentStatus(newStatus)
    setIsRevealing(position)
    setTimeout(() => {
      setIsRevealing(-1)
    }, REVEAL_TIME_MS)
  }

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES
    ) {
      setCurrentGuess((currentGuess) => `${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    if (currentGuess.length > 0) {
      let newCurrentStatus = [...currentStatus]
      newCurrentStatus[currentGuess.length - 1] = 'unknown'
      setCurrentStatus(newCurrentStatus)
    }
    setCurrentGuess((currentGuess) =>
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
    console.log(currentStatus)
    console.log(currentGuess)
  }

  const onEnter = () => {
    if (isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === WORD_LENGTH)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    var newCharStatus = [...charStatus]
    for (let i = 0; i < currentStatus.length; i++) {
      let letterIndex = currentGuess[i].charCodeAt(0) - 65
      if (currentStatus[i] === 'unknown') {
        return showErrorAlert(EMPTY_LETTERS, {
          onClose: clearCurrentRowClass,
        })
      } else if (currentStatus[i] === 'absent') {
        if (
          charStatus[letterIndex] === 'present' ||
          charStatus[letterIndex] === 'correct'
        ) {
          return showErrorAlert(NOT_VALID_INPUT, {
            onClose: clearCurrentRowClass,
          })
        }
        if (newCharStatus[letterIndex] === 'unknown') {
          newCharStatus[letterIndex] = 'absent'
        }
      } else if (currentStatus[i] === 'present') {
        if (charStatus[letterIndex] === 'absent') {
          return showErrorAlert(NOT_VALID_INPUT, {
            onClose: clearCurrentRowClass,
          })
        }
        if (
          charStatus[letterIndex] !== 'correct' &&
          newCharStatus[letterIndex] !== 'correct'
        )
          newCharStatus[letterIndex] = 'present'
      } else {
        if (charStatus[letterIndex] === 'absent') {
          return showErrorAlert(NOT_VALID_INPUT, {
            onClose: clearCurrentRowClass,
          })
        }
        newCharStatus[letterIndex] = 'correct'
      }
    }

    let newValidGuesses = getValidGuesses(
      validGuesses,
      currentGuess.toLocaleLowerCase(),
      currentStatus
    )

    setValidGuesses(newValidGuesses)
    setCharStatus(newCharStatus)

    setStatuses([...statuses, currentStatus])
    setCurrentStatus(Array(WORD_LENGTH).fill('unknown'))

    setGuesses([...guesses, currentGuess])
    setCurrentGuess('')

    if (guesses.length === MAX_CHALLENGES - 1) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_WORD_MESSAGE, {
        persist: true,
      })
    }
  }

  return (
    <Div100vh>
      <div className="flex h-full flex-col">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />
        <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
          <div className="flex grow flex-col justify-center pb-6 short:pb-2">
            <div className="mainbar-content">
              <div>
                <Grid
                  guesses={guesses}
                  statuses={statuses}
                  currentGuess={currentGuess}
                  currentStatus={currentStatus}
                  onCell={onCell}
                  isRevealing={isRevealing}
                  currentRowClassName={currentRowClass}
                />
              </div>
              <WordList validWords={validGuesses} />
            </div>
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            charStatuses={charStatus}
            //isRevealing={isRevealing}
          />
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isHighContrastMode={isHighContrastMode}
            handleHighContrastMode={handleHighContrastMode}
          />
          <AlertContainer />
        </div>
      </div>
    </Div100vh>
  )
}

export default App
