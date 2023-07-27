import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [BoardModel, setBoardModel] = useState(false);
  return (
    <>
      <div>
        {/* Header Section */}
        <Header BoardModel={BoardModel} setBoardModel={setBoardModel} />
        {/* 
    Main Section
    */}
      </div>
    </>
  );
}

export default App;
