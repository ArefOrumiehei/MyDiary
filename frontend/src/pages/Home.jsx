import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Styles
import "../styles/home.css"

// Components
import Header from "../components/Header";
import Diary from "../components/Diary";

// Helpers
import { addDays, format, isValidISO } from "../helpers/dateHelpers";

function Home() {
  
  const { date } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(() => new Date(date));


  const goTo = (days) => {
    const next = addDays(selectedDate, days);
    if (next > new Date()) return;
    navigate(`/${format(next)}`);
  };


  useEffect(() => {
  if (!isValidISO(date)) {
    navigate(`/${format(new Date())}`, { replace: true });
  } else {
    setSelectedDate(new Date(date));
  }
}, [date, navigate]);

  return (
    <>
      <Header selectedDate={selectedDate} onJump={goTo} />
      <div className="previewContainer">
        <Diary selectedDate={selectedDate} />
      </div>
    </>
  );
}

export default Home;
