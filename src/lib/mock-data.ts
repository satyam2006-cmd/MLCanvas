export const dataPreview = [
    { "age": 39, "job": "blue-collar", "marital": "married", "education": "secondary", "balance": 1350, "housing": "yes", "loan": "no", "y": "no" },
    { "age": 52, "job": "management", "marital": "single", "education": "tertiary", "balance": 0, "housing": "no", "loan": "no", "y": "yes" },
    { "age": 30, "job": "technician", "marital": "married", "education": "secondary", "balance": 2476, "housing": "yes", "loan": "no", "y": "no" },
    { "age": 42, "job": "admin.", "marital": "single", "education": "secondary", "balance": 2, "housing": "yes", "loan": "yes", "y": "no" },
    { "age": 33, "job": "services", "marital": "married", "education": "secondary", "balance": 2, "housing": "yes", "loan": "no", "y": "no" }
];

export const correlationMatrix: Record<string, Record<string, number>> = {
    age: { age: 1.0, balance: 0.09, duration: -0.00, campaign: 0.00, pdays: -0.02 },
    balance: { age: 0.09, balance: 1.0, duration: 0.02, campaign: -0.01, pdays: 0.00 },
    duration: { age: -0.00, balance: 0.02, duration: 1.0, campaign: -0.08, pdays: -0.00 },
    campaign: { age: 0.00, balance: -0.01, duration: -0.08, campaign: 1.0, pdays: -0.08 },
    pdays: { age: -0.02, balance: 0.00, duration: -0.00, campaign: -0.08, pdays: 1.0 },
};

export const featureDistribution = [
    { value: '10-20', count: 15 },
    { value: '20-30', count: 45 },
    { value: '30-40', count: 80 },
    { value: '40-50', count: 55 },
    { value: '50-60', count: 25 },
    { value: '60+', count: 10 },
];

export const lossData = Array.from({ length: 20 }, (_, i) => ({
    epoch: i + 1,
    loss: 0.69 - (i * 0.02) * Math.random() - i * 0.01,
}));

export const accuracyData = Array.from({ length: 20 }, (_, i) => ({
    epoch: i + 1,
    accuracy: 0.55 + (i * 0.015) * Math.random() + i * 0.005,
}));

export const predictionFeatures = ["age", "balance", "duration", "campaign", "pdays", "previous"];

export const modelCoefficients = {
    age: 0.003,
    balance: 0.00002,
    duration: 0.004,
    campaign: -0.09,
    pdays: -0.0001,
    previous: 0.1,
};

export const shapValues = {
    age: -0.12,
    balance: -0.05,
    duration: 0.85,
    campaign: -0.25,
    pdays: -0.01,
    previous: 0.08,
};

export const algorithmComparisonData = [
    { model: "Logistic Regression", accuracy: 0.88, precision: 0.86, recall: 0.90 },
    { model: "KNN", accuracy: 0.85, precision: 0.84, recall: 0.87 },
    { model: "Decision Tree", accuracy: 0.91, precision: 0.90, recall: 0.92 },
    { model: "Random Forest", accuracy: 0.93, precision: 0.92, recall: 0.94 },
];
