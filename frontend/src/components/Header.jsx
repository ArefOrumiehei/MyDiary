// Styles
import "../styles/header.css"

export default function Header({ selectedDate, setSelectedDate }) {
  const formattedDate = selectedDate.toLocaleDateString('fa-IR', {
    weekday: 'long',
    // year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const changeDay = (offset) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + offset)
    setSelectedDate(newDate)
  }

  const isSameDate = (d1, d2) => {
    return d1.toDateString() === d2.toDateString()
  }
  
  return (
    <div className="header">
      <div className="searchBox">
        <input type="text" name="search" id="searchInput" placeholder='جستجو' />
      </div>
      <div className="daysContainer">
        <button onClick={() => changeDay(-1)}>روز قبل</button>
        <span>{formattedDate}</span>
        <button onClick={() => changeDay(+1)} disabled={isSameDate(selectedDate, new Date())}>روز بعد</button>
      </div>
    </div>
  )
}
