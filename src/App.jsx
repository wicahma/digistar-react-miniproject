import { useContext, useEffect, useState } from "react";
import "./App.css";
import { ThemeContext } from "./context/ThemeContext";
import Nav from "./Nav";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.getElementById("root");
    root.classList.add("transition-all", "duration-300");
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <>
      <Nav />
    </>
  );
}

export default App;
