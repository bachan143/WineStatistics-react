import React from 'react';
import { Metrics, StatisticTableProps, WineStatisticsProps } from './types';
import { calculateClassWiseMetrics } from './utility';
import './WineStatistics.css';

// Component for displaying statistics in a table
function StatisticTable({ title, metrics, measureName }: StatisticTableProps) {
  return (
    <div>
      {/* Display the title of the statistics */}
      <h2>{title} Statistics</h2>
      <table className="statistics-table">
        <thead>
          <tr>
            <th>Measure</th>
            {/* Generate table headers for each class */}
            {Object.keys(metrics).map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Display Mean, Median, and Mode for the specified measure */}
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
    </div>
  );
}

// Component for displaying wine statistics
function WineStatistics({ wineData }: WineStatisticsProps) {
  // Calculate class-wise metrics for the wine data
  const metricsData: Metrics | undefined = calculateClassWiseMetrics(wineData);

  // If there are no metrics data, return null
  if (!metricsData) {
    return null;
  }

  return (
    <div>
      {/* Display statistics for Flavanoids and Gamma */}
      <StatisticTable title="Flavanoids" metrics={metricsData} measureName="Flavanoids" />
      <StatisticTable title="Gamma" metrics={metricsData} measureName="Gamma" />
    </div>
  );
}

export default WineStatistics;
