import React, { useMemo } from 'react';
import { Metrics, StatisticTableProps, WineStatisticsProps } from './types';
import { calculateClassWiseMetrics } from './utility';
import './WineStatistics.css';

// Component for displaying statistics in a table
const StatisticTable = React.memo(({ title, metrics, measureName }: StatisticTableProps) => {
  return (
    <section>
      <h2>{title} Statistics</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(metrics).map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{`${measureName} Mean`}</td>
            {Object.keys(metrics).map((className) => (
              <td key={className}>{metrics[className][measureName].Mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{`${measureName} Median`}</td>
            {Object.keys(metrics).map((className) => (
              <td key={className}>{metrics[className][measureName].Median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>{`${measureName} Mode`}</td>
            {Object.keys(metrics).map((className) => (
              <td key={className}>{metrics[className][measureName].Mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
});

// Component for displaying wine statistics
function WineStatistics({ wineData }: WineStatisticsProps) {
  const metricsData: Metrics | undefined = useMemo(() => calculateClassWiseMetrics(wineData), [wineData]);

  if (!metricsData) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <StatisticTable title="Flavanoids" metrics={metricsData} measureName="Flavanoids" />
      <StatisticTable title="Gamma" metrics={metricsData} measureName="Gamma" />
    </div>
  );
}

export default WineStatistics;