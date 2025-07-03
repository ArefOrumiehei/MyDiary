// Styles
import "../styles/header.css"

// Components
import SearchBox from "./SearchBox"

export default function Header({ selectedDate, onJump }) {
  const formattedDate = selectedDate.toLocaleDateString('fa-IR', {
    weekday: 'long',
    // year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const isSameDate = (d1, d2) => {
    return d1.toDateString() === d2.toDateString()
  }
  
  return (
    <div className="header">
      <SearchBox />
      <div className="daysContainer">
        <button onClick={() => onJump(-1)}>روز قبل</button>
        <span>{formattedDate}</span>
        <button onClick={() => onJump(+1)} disabled={isSameDate(selectedDate, new Date())}>روز بعد</button>
      </div>
    </div>
  )
}
