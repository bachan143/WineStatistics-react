export interface WineData {
    Alcohol: number;
    "Malic Acid": number; // You need to specify the data type for Malic Acid
    Ash: number;
    "Alcalinity of ash": number;
    Magnesium: number;
    "Total phenols": number;
    Flavanoids: number;
    "Nonflavanoid phenols": number;
    Proanthocyanins: number;
    "Color intensity": number;
    Hue: number;
    "OD280/OD315 of diluted wines": number;
    Unknown: number;
  }
  export interface WineStatisticsProps {
    wineData: WineData[];
  }
  export interface Metrics {
    [className: string]: {
      Flavanoids: {
        Mean: number;
        Median: number;
        Mode: number;
      };
      Gamma: {
        Mean: number;
        Median: number;
        Mode: number;
      };
    };
  }
  export interface StatisticTableProps {
    title: string;
    metrics: Metrics;
    measureName: 'Flavanoids' | 'Gamma'; // Specify valid measure names

  }
  
  
  
  
  
  