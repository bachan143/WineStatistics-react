import { useEffect, useState } from 'react';
import './App.css';
import { WineData } from './types';
import WineStatistics from './WineStatistics';

function App() {
  const [wineData, setWineData] = useState<WineData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Load Wine Data from JSON
    fetch('/Wine-Data.json') // Assuming you placed the file in the public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching wine data');
        }
        return response.json();
      })
      .then((data) => {
        setWineData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <WineStatistics wineData={wineData} />
    </div>
  );
}

export default App;