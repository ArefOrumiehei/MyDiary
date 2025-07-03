import { useEffect, useState } from "react";

// Styles
import "./App.css";

// Contexts
import { useTheme } from "./contexts/ThemeProviderContext";

// Components
import Header from "./components/header";
import Diary from "./components/Diary";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { setTheme } = useTheme();

  useEffect(() => {
    const key = selectedDate.toISOString().split("T")[0];
    const saved = JSON.parse(localStorage.getItem(`diary-${key}`));
    setTheme(saved?.mood || "neutral");
  }, [selectedDate, setTheme]);

  return (
    <>
      <Header selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <div className="previewContainer">
        <Diary selectedDate={selectedDate} />
      </div>
    </>
  );
}

export default App;
