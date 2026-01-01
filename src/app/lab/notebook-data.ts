export interface Notebook {
    title: string;
    url: string;
    subtitle?: string;
}

export interface Category {
    id: string;
    title: string;
    description: string;
    size?: "small" | "large";
    subcategories?: {
        title: string;
        notebooks: Notebook[];
    }[];
    notebooks?: Notebook[];
}

export const NOTEBOOK_CATEGORIES: Category[] = [
    {
        id: "numpy",
        title: "NumPy Basics",
        description: "Fundamental array operations and numerical computing in Python.",
        notebooks: [
            { title: "NumPy Basics", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/00.%20NumPy%20Basics/1.%20NumPy%20Basics.ipynb" },
            { title: "100 NumPy Exercises", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/00.%20NumPy%20Basics/100_Numpy_exercises_no_solution.ipynb" }
        ]
    },
    {
        id: "preprocessing",
        title: "Data Preprocessing",
        description: "Cleaning and preparing data for machine learning models.",
        notebooks: [
            { title: "Feature Selection", subtitle: "Imputing missing values, Encoding, Binarizing", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/01.%20Data%20Preprocessing/1.%20Feature%20Selection.ipynb" },
            { title: "Feature Scaling", subtitle: "Min-Max Scaling, Normalizing, Standardizing", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/01.%20Data%20Preprocessing/2.%20Scaling%2C%20Normalizing.ipynb" },
            { title: "Feature Extraction", subtitle: "CountVectorizer, DictVectorizer, TfidfVectorizer", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/01.%20Data%20Preprocessing/3.%20Feature%20Extraction.ipynb" }
        ]
    },
    {
        id: "regression",
        title: "Regression",
        description: "Predicting continuous values using various regression techniques.",
        size: "large",
        subcategories: [
            {
                title: "Linear & Multiple Regression",
                notebooks: [
                    { title: "Linear Regression & Gradient Descent (Theory)", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/1A.%20Linear%20Regression%20and%20Gradient%20Descent(Theory).ipynb" },
                    { title: "Linear Regression & Gradient Descent", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/1B.%20Linear%20Regression%20and%20Gradient%20Descent%20.ipynb" },
                    { title: "Assumptions & Dummy variables", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/1C.%20Assumptions%20in%20Linear%20Regression%20and%20Dummy%20variables.ipynb" },
                    { title: "Sci-kit Learn Basics", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/1D.%20Simple%20and%20Multiple%20Regression%20using%20Sci-kit%20learn.ipynb" },
                    { title: "Backward Elimination", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/2.%20Backward%20Elimination.ipynb" },
                    { title: "Polynomial Regression", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/3.%20Polynomial%20Regression.ipynb" },
                    { title: "Support Vector Regression", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/4.%20Support%20Vector%20Regression.ipynb" },
                    { title: "Decision Tree Regression", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/5.%20Decision%20Tree%20Regression.ipynb" },
                    { title: "Random Forest", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/6.%20Random%20Forest.ipynb" },
                    { title: "R Squared", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/7.%20R%20Squared.ipynb" },
                    { title: "Robust Regression", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/8.%20Robust%20Regression%20(TheilSen%20Regressor).ipynb" },
                    { title: "Pipelines in Sklearn", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/02.%20Regression/9.%20Pipelines%20in%20Sklearn.ipynb" }
                ]
            }
        ]
    },
    {
        id: "classification",
        title: "Classification",
        description: "Categorizing data into predefined classes.",
        size: "large",
        subcategories: [
            {
                title: "Logistic Regression",
                notebooks: [
                    { title: "Gradient Descent Theory", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/1A.%20Logistic%20Regression%20and%20Gradient%20Descent.ipynb" },
                    { title: "Deriving Logistic Regression", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/1B.%20Deriving%20Logistic%20Regression%20.ipynb" },
                    { title: "Implementation using GD", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/1C.%20Logistic%20Regression%20using%20Gradient%20Descent.ipynb" },
                    { title: "Implementation using Sklearn", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/1D.%20Logistic%20Regression%20using%20Sci-kit%20learn.ipynb" }
                ]
            },
            {
                title: "Regularization",
                notebooks: [
                    { title: "Regularization Theory", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/2A.%20Regularization.ipynb" },
                    { title: "Regularization in Logistic Reg", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/2B.%20Regularization%20on%20Logistic%20Regression.ipynb" }
                ]
            },
            {
                title: "Other Methods",
                notebooks: [
                    { title: "K Nearest Neighbors", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/3.%20KNN.ipynb" },
                    { title: "Support Vector Machines", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/4.%20SVM.ipynb" },
                    { title: "Naive Bayes Theory", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/5a.%20Naive%20Bayes.ipynb" },
                    { title: "Naive Bayes sklearn", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/5B.%20Naive%20Bayes%20using%20sklearn.ipynb" },
                    { title: "Decision Trees & Info Theory", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/6A.%20Decision%20Trees%20%26%20Information%20Theory.ipynb" },
                    { title: "Decision Trees Implementation", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/6B.%20Decision%20Trees.ipynb" },
                    { title: "Random Forest", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/7.%20Random%20Forest%20.ipynb" },
                    { title: "Ridge & Ridge CV", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/03.%20Classification/Ridge%2C%20and%20Ridge%20CV%20for%20optimized%20alpha%20values.ipynb" }
                ]
            }
        ]
    },
    {
        id: "clustering",
        title: "Clustering",
        description: "Grouping similar data points together.",
        notebooks: [
            { title: "KMeans", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/04.%20Clustering/1.%20KMeans.ipynb" },
            { title: "MiniBatch KMeans", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/04.%20Clustering/2.%20MiniBatch%20KMeans.ipynb" },
            { title: "Hierarchical Clustering", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/04.%20Clustering/3.%20Hierarchical%20Clustering.ipynb" },
            { title: "Image Quantization", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/04.%20Clustering/4.%20Image%20Quantization%20using%20Clustering.ipynb" },
            { title: "Outlier Detection", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/04.%20Clustering/05.%20Outlier%20Detection%20using%20KMeans.ipynb" }
        ]
    },
    {
        id: "evaluation",
        title: "Model Evaluation",
        description: "Metrics and techniques for assessing model performance.",
        notebooks: [
            { title: "Cross Validation Types", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/05.%20Model%20Evaluation/1.%20Cross%20Validation%20and%20its%20types.ipynb" },
            { title: "Confusion Matrix & Metrics", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/05.%20Model%20Evaluation/Confusion%20Matrix%2C%20Precision%2C%20Recall.ipynb" },
            { title: "Grid & Randomized Search", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/05.%20Model%20Evaluation/Grid%20Search%20and%20Randomized%20Search.ipynb" },
            { title: "ROC Curve & AUC", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/05.%20Model%20Evaluation/ROC%20Curve%20%26%20AUC.ipynb" },
            { title: "Silhoutte Distance", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/05.%20Model%20Evaluation/Silhoutte%20Distance%20for%20Clustering.ipynb" },
            { title: "XGBoost", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/05.%20Model%20Evaluation/3.%20XGBoost.ipynb" }
        ]
    },
    {
        id: "rule-mining",
        title: "Associate Rule Mining",
        description: "Discovering interesting relations between variables.",
        notebooks: [
            { title: "Apriori Algorithm", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/06.%20Associate%20Rule%20Mining/1.%20Apriori%20Algorithm.ipynb" },
            { title: "Eclat Model", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/06.%20Associate%20Rule%20Mining/2.%20Eclat%20Model.ipynb" }
        ]
    },
    {
        id: "reinforcement",
        title: "Reinforcement Learning",
        description: "Training models through rewards and punishments.",
        notebooks: [
            { title: "Upper Confidence Bound", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/07.%20Reinforcement%20Learning/1.%20Upper%20Confidence%20Bound.ipynb" },
            { title: "Thompson Sampling", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/07.%20Reinforcement%20Learning/2.%20Thompson%20Sampling.ipynb" }
        ]
    },
    {
        id: "nlp",
        title: "NLP",
        description: "Processing and understanding human language.",
        notebooks: [
            { title: "Sentiment Analysis", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/08.%20Natural%20Language%20Processing/1.%20Sentiment%20Analysis.ipynb" }
        ]
    },
    {
        id: "neural-networks",
        title: "Neural Networks",
        description: "Deep learning and complex pattern recognition.",
        size: "large",
        notebooks: [
            { title: "Activation Functions", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/1.%20Activation%20Functions.ipynb" },
            { title: "Vanilla Neural Network (ANN)", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/2.%20ANN.ipynb" },
            { title: "Backpropagation Derivation", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/2A.%20Backpropagation%20.ipynb" },
            { title: "Backpropagation in Python", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/2B.%20Neural%20Networks%20using%20Backpropagation.ipynb" },
            { title: "CNN Theory", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/3a.%20Convolutional%20Neural%20Networks%20Theory.ipynb" },
            { title: "CNN in TensorFlow", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/3B.%20Convolutional%20Neural%20Networks%20in%20TensorFlow.ipynb" },
            { title: "RNN & LSTM Theory", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/4.%20Recurrent%20Neural%20Networks%20and%20LSTM%20(Theory).ipynb" },
            { title: "LSTM Implementation", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/09.%20Neural%20Networks/5.%20LSTM%20.ipynb" }
        ]
    },
    {
        id: "dimensionality",
        title: "Dimensionality Reduction",
        description: "Reducing the number of features while preserving information.",
        size: "large",
        notebooks: [
            { title: "PCA", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/1.%20Principal%20Component%20Analysis.ipynb" },
            { title: "LDA", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/2.%20Linear%20Discriminant%20Analysis.ipynb" },
            { title: "Factor Analysis", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/3.%20Factor%20Analysis.ipynb" },
            { title: "Kernel PCA", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/4.%20Kernel%20PCA.ipynb" },
            { title: "Truncated SVD", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/5.%20Truncated%20SVD.ipynb" },
            { title: "Self Organizing Maps", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/6.%20Self%20Organizing%20Maps.ipynb" },
            { title: "Dictionary Learning", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/7.%20Dictionary%20Learning.ipynb" },
            { title: "t-SNE", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/10.%20Dimensionality%20Reduction/8.%20t-SNE.ipynb" }
        ]
    },
    {
        id: "boosting",
        title: "Model Selection & Boosting",
        description: "Advanced techniques for model enhancement.",
        notebooks: [
            { title: "K-Fold Cross Validation", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/11.%20Model%20Selection%20and%20Boosting/1.%20K-Fold%20Cross%20Validation.ipynb" },
            { title: "Grid Search", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/11.%20Model%20Selection%20and%20Boosting/2.%20Grid%20Search.ipynb" },
            { title: "XGBoost", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/11.%20Model%20Selection%20and%20Boosting/3.%20XGBoost.ipynb" }
        ]
    },
    {
        id: "unsupervised-nn",
        title: "Unsupervised Neural Networks",
        description: "Learning from unlabeled data using neural architectures.",
        notebooks: [
            { title: "Boltzmann Machine", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/12.%20Unsupervised%20Neural%20Networks/1.%20Boltzmann%20Machine.ipynb" },
            { title: "Autoencoders", url: "http://nbviewer.jupyter.org/github/satyam2006-cmd/MLCanvas/blob/main/Machine-Learning-Notebooks/12.%20Unsupervised%20Neural%20Networks/2.%20Autoencoders.ipynb" }
        ]
    }
];

export const SOURCES = [
    { name: "Machine Learning by Andrew Ng (Coursera)", url: "https://www.coursera.org/learn/machine-learning" },
    { name: "Machine Learning A-Z (Udemy)", url: "https://www.udemy.com/machinelearning/" },
    { name: "Deep Learning A-Z (Udemy)", url: "https://www.udemy.com/deeplearning/" },
    { name: "Neural Networks by Geoffrey Hinton (Coursera)", url: "https://www.coursera.org/learn/neural-networks" },
    { name: "Scikit-learn Cookbook (Second Edition) - Julian Avila et. al", url: "https://www.packtpub.com/big-data-and-business-intelligence/scikit-learn-cookbook-second-edition" }
];
