type Props = {
  validWords: string[]
}

export const WordList = ({ validWords }: Props) => {
  return (
    <div className="container">
      <div className="list-title">Remaining Words: {validWords.length}</div>
      <div className="list-subtitle">Scroll down for more!</div>
      <ul className="box">
        {validWords.map((guess, index) => (
          <li key={index}>{guess}</li>
        ))}
      </ul>
    </div>
  )
}
