import { Metrics, WineData } from "./types";

// Function to calculate "Gamma" for a given data point
function calculateGamma(dataPoint: WineData): number {
    return (dataPoint.Ash * dataPoint.Hue) / dataPoint.Magnesium;
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
    //const groupStatistics: { [alcohol: string]: { Flavanoids: { Mean: number, Median: number, Mode: number }, Gamma: { Mean: number, Median: number, Mode: number } } } = {};
       const groupStatistics:Metrics={};
    // Calculate Mean, Median, and Mode for each group for both "Flavanoids" and "Gamma"
    for (const alcohol in alcoholGroups) {
        const groupData = alcoholGroups[alcohol];

        // Calculate "Flavanoids" statistics
        const flavanoidsValues = groupData.map((item) => parseFloat(item.Flavanoids.toString()))
            .filter((value) => !isNaN(value) && value !== null);

        const flavanoidsSum = flavanoidsValues.reduce((acc, val) => acc + val, 0);
        const flavanoidsMean = flavanoidsValues.length > 0 ? flavanoidsSum / flavanoidsValues.length : 0;

        const flavanoidsSortedValues = flavanoidsValues.sort((a, b) => a - b);
        const flavanoidsMiddle = Math.floor(flavanoidsSortedValues.length / 2);
        const flavanoidsMedian =
            flavanoidsSortedValues.length % 2 === 0
                ? (flavanoidsSortedValues[flavanoidsMiddle - 1] + flavanoidsSortedValues[flavanoidsMiddle]) / 2
                : flavanoidsSortedValues[flavanoidsMiddle];

        const flavanoidsModeMap: { [value: number]: number } = {};
        let flavanoidsMaxCount = 0;
        let flavanoidsMode: number | undefined;
        flavanoidsValues.forEach((value) => {
            flavanoidsModeMap[value] = (flavanoidsModeMap[value] || 0) + 1;
            if (flavanoidsModeMap[value] > flavanoidsMaxCount) {
                flavanoidsMaxCount = flavanoidsModeMap[value];
                flavanoidsMode = value;
            }
        });

        // Calculate "Gamma" statistics
        const gammaValues = groupData.map(calculateGamma);

        const gammaSum = gammaValues.reduce((acc, val) => acc + val, 0);
        const gammaMean = gammaValues.length > 0 ? gammaSum / gammaValues.length : 0;

        const gammaSortedValues = gammaValues.sort((a, b) => a - b);
        const gammaMiddle = Math.floor(gammaSortedValues.length / 2);
        const gammaMedian =
            gammaSortedValues.length % 2 === 0
                ? (gammaSortedValues[gammaMiddle - 1] + gammaSortedValues[gammaMiddle]) / 2
                : gammaSortedValues[gammaMiddle];

        const gammaModeMap: { [value: number]: number } = {};
        let gammaMaxCount = 0;
        let gammaMode: number | undefined;
        gammaValues.forEach((value) => {
            gammaModeMap[value] = (gammaModeMap[value] || 0) + 1;
            if (gammaModeMap[value] > gammaMaxCount) {
                gammaMaxCount = gammaModeMap[value];
                gammaMode = value;
            }
        });

        // Store statistics in the groupStatistics object
        groupStatistics[alcohol] = {
            Flavanoids: {
                Mean: flavanoidsMean,
                Median: flavanoidsMedian,
                Mode: flavanoidsMode !== undefined ? flavanoidsMode : 0,
            },
            Gamma: {
                Mean: gammaMean,
                Median: gammaMedian,
                Mode: gammaMode !== undefined ? gammaMode : 0,
            },
        };
    }
    return groupStatistics;
}
