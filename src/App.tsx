import { useEffect, useState } from 'react';
import './App.css';
import { WineData } from './types';
import WineStatistics from './WineStatistics';

function App() {
  const [wineData, setWineData] = useState<WineData[]>([]);

  useEffect(() => {
    // Load Wine Data from JSON
    fetch('/Wine-Data.json') // Assuming you placed the file in the public folder
      .then((response) => response.json())
      .then((data) => setWineData(data));
  }, []);
  return (
    <div className="App">
     <WineStatistics wineData={wineData}></WineStatistics>
    </div>
  );
}

export default App;
