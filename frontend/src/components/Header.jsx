import { useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/colors/purple.css"

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

  const [open, setOpen] = useState(false);
  const dateRef = useRef(null);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handlePick = (d) => {
    setOpen(false);
    onJump((d - selectedDate) / 86400000);
  };

  const today = new Date();
  const diffDays = Math.abs(
    Math.floor((selectedDate - today) / (1000 * 60 * 60 * 24))
  );
  const showBackBtn = diffDays >= 5;


  const isSameDate = (d1, d2) => {
    return d1.toDateString() === d2.toDateString()
  }
  
  return (
    <div className="header">
      <div className="searchWrap">
        <LogOut size={20} onClick={logout} className="logoutBtn"  />
        <SearchBox />
      </div>
      <div className="daysContainer">
        {showBackBtn && (
          <button onClick={() => onJump(0)} className="todayBtn">
            برگرد به امروز
          </button>
        )}

        <div className="daysSection">
          <button onClick={() => onJump(-1)}>روز قبل</button>
          <div className="dateSection">
            <span ref={dateRef} title="باز کردن تقویم" onClick={() => setOpen(!open)}>{formattedDate}</span>
            {open && 
              <Calendar
                value={selectedDate}
                onChange={handlePick}
                calendar={persian}
                locale={persian_fa}
                maxDate={today}
                className="rmdp-mobile purple"
                style={{
                  position: "absolute",
                  top: "calc(100% + 16px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 999,
                  borderRadius: 10,
                  boxShadow: "0 6px 18px rgba(0,0,0,.15)",
                }}
              />
            }
          </div>
          <button onClick={() => onJump(+1)} disabled={isSameDate(selectedDate, new Date())}>روز بعد</button>
        </div>
        
      </div>
    </div>
  )
}
