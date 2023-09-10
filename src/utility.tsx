import { Metrics, WineData } from "./types";

// Function to calculate "Gamma" for a given data point
function calculateGamma(dataPoint: WineData): number {
    return (dataPoint.Ash * dataPoint.Hue) / dataPoint.Magnesium;
}

// Helper function to calculate Mean, Median, and Mode
function calculateStatistics(values: number[]) {
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = values.length > 0 ? sum / values.length : 0;

    const sortedValues = values.sort((a, b) => a - b);
    const middle = Math.floor(sortedValues.length / 2);
    const median =
        sortedValues.length % 2 === 0
            ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
            : sortedValues[middle];

    const modeMap: { [value: number]: number } = {};
    let maxCount = 0;
    let mode: number | undefined;
    values.forEach((value) => {
        modeMap[value] = (modeMap[value] || 0) + 1;
        if (modeMap[value] > maxCount) {
            maxCount = modeMap[value];
            mode = value;
        }
    });

    return {
        Mean: mean,
        Median: median,
        Mode: mode !== undefined ? mode : 0,
    };
}

// Modify the existing calculateClassWiseMetrics function to include "Gamma" calculation
export function calculateClassWiseMetrics(wineData: WineData[]) {
    if (!wineData || wineData.length === 0) {
        return;
    }

    // Group data by "Alcohol" value
    const alcoholGroups: { [alcohol: string]: WineData[] } = {};

    wineData.forEach((item) => {
        const alcohol = item.Alcohol.toString();
        if (!alcoholGroups[alcohol]) {
            alcoholGroups[alcohol] = [];
        }
        alcoholGroups[alcohol].push(item);
    });

    // Create an object to store statistics for each group
    const groupStatistics: Metrics = {};

    // Calculate Mean, Median, and Mode for each group for both "Flavanoids" and "Gamma"
    for (const alcohol in alcoholGroups) {
        const groupData = alcoholGroups[alcohol];

        // Calculate "Flavanoids" statistics
        const flavanoidsValues = groupData.map((item) => parseFloat(item.Flavanoids.toString()))
            .filter((value) => !isNaN(value) && value !== null);
        const flavanoidsStats = calculateStatistics(flavanoidsValues);

        // Calculate "Gamma" statistics
        const gammaValues = groupData.map(calculateGamma);
        const gammaStats = calculateStatistics(gammaValues);

        // Store statistics in the groupStatistics object
        groupStatistics[alcohol] = {
            Flavanoids: flavanoidsStats,
            Gamma: gammaStats,
        };
    }
    return groupStatistics;
}