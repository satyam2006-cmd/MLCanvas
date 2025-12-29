"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileTree, NotebookViewer } from "@/components/notebook-viewer";
import { NotebookFile } from "@/lib/notebook-explorer";
import { Folder, FileText, ChevronRight, ExternalLink } from "lucide-react";

export default function LabPage() {
  const [selectedFile, setSelectedFile] = useState<NotebookFile | null>(null);

  const handleFileSelect = (file: NotebookFile) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  if (selectedFile) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <NotebookViewer 
          notebookPath={selectedFile.path} 
          onBack={handleBack} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">ML Canvas Learning Lab</h1>
        <p className="text-muted-foreground">
          Browse and explore machine learning notebooks from our collection
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <FileText className="h-6 w-6 mr-2 text-blue-500" />
            Machine Learning Notebooks
          </CardTitle>
          <p className="text-muted-foreground">
            Helpful Jupyter notebooks that I compiled while learning Machine Learning and Deep Learning from various sources on the Internet.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* NumPy Basics */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              NumPy Basics
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>NumPy Basics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. NumPy Basics.ipynb', path: 'Machine-Learning-Notebooks-master/00. NumPy Basics/1. NumPy Basics.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/00.%20NumPy%20Basics/1.%20NumPy%20Basics.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>100 NumPy Exercises (No Solution)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '100_Numpy_exercises_no_solution.ipynb', path: 'Machine-Learning-Notebooks-master/00. NumPy Basics/100_Numpy_exercises_no_solution.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/00.%20NumPy%20Basics/100_Numpy_exercises_no_solution.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Data Preprocessing */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Data Preprocessing
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <div>
                    <span>Feature Selection</span>
                    <p className="text-xs text-muted-foreground">Imputing missing values, Encoding, Binarizing</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Feature Selection.ipynb', path: 'Machine-Learning-Notebooks-master/01. Data Preprocessing/1. Feature Selection.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/01.%20Data%20Preprocessing/1.%20Feature%20Selection.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <div>
                    <span>Feature Scaling</span>
                    <p className="text-xs text-muted-foreground">Min-Max Scaling, Normalizing, Standardizing</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. Scaling, Normalizing.ipynb', path: 'Machine-Learning-Notebooks-master/01. Data Preprocessing/2. Scaling, Normalizing.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/01.%20Data%20Preprocessing/2.%20Scaling%2C%20Normalizing.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <div>
                    <span>Feature Extraction</span>
                    <p className="text-xs text-muted-foreground">CountVectorizer, DictVectorizer, TfidfVectorizer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '3. Feature Extraction.ipynb', path: 'Machine-Learning-Notebooks-master/01. Data Preprocessing/3. Feature Extraction.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/01.%20Data%20Preprocessing/3.%20Feature%20Extraction.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Regression */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Regression
            </h3>
            <div className="ml-6 space-y-2">
              <div className="font-medium mb-2">Linear & Multiple Regression</div>
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Linear Regression and Gradient Descent (Theory)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1A. Linear Regression and Gradient Descent(Theory).ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/1A. Linear Regression and Gradient Descent(Theory).ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/1A.%20Linear%20Regression%20and%20Gradient%20Descent(Theory).ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Linear Regression and Gradient Descent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1B. Linear Regression and Gradient Descent .ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/1B. Linear Regression and Gradient Descent .ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/1B.%20Linear%20Regression%20and%20Gradient%20Descent%20.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Assumptions in Linear Regression and Dummy variables</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1C. Assumptions in Linear Regression and Dummy variables.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/1C. Assumptions in Linear Regression and Dummy variables.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/1C.%20Assumptions%20in%20Linear%20Regression%20and%20Dummy%20variables.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Simple and Multiple Regression using Sci-kit learn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1D. Simple and Multiple Regression using Sci-kit learn.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/1D. Simple and Multiple Regression using Sci-kit learn.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/1D.%20Simple%20and%20Multiple%20Regression%20using%20Sci-kit%20learn.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Backward Elimination</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '2. Backward Elimination.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/2. Backward Elimination.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/2.%20Backward%20Elimination.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Polynomial Regression</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '3. Polynomial Regression.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/3. Polynomial Regression.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/3.%20Polynomial%20Regression.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Support Vector Regression</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '4. Support Vector Regression.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/4. Support Vector Regression.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/4.%20Support%20Vector%20Regression.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Decision Tree Regression</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '5. Decision Tree Regression.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/5. Decision Tree Regression.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/5.%20Decision%20Tree%20Regression.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Random Forest</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '6. Random Forest.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/6. Random Forest.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/6.%20Random%20Forest.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>R Squared</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '7. R Squared.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/7. R Squared.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/7.%20R%20Squared.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Robust Regression (TheilSen Regressor)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '8. Robust Regression (TheilSen Regressor).ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/8. Robust Regression (TheilSen Regressor).ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/8.%20Robust%20Regression%20(TheilSen%20Regressor).ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Pipelines in Sklearn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '9. Pipelines in Sklearn.ipynb', path: 'Machine-Learning-Notebooks-master/02. Regression/9. Pipelines in Sklearn.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/02.%20Regression/9.%20Pipelines%20in%20Sklearn.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Classification
            </h3>
            <div className="ml-6 space-y-2">
              <div className="font-medium mb-2">Logistic Regression</div>
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Logistic Regression and Gradient Descent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1A. Logistic Regression and Gradient Descent.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/1A. Logistic Regression and Gradient Descent.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/1A.%20Logistic%20Regression%20and%20Gradient%20Descent.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Deriving Logistic Regression</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1B. Deriving Logistic Regression .ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/1B. Deriving Logistic Regression .ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/1B.%20Deriving%20Logistic%20Regression%20.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Logistic Regression using Gradient Descent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1C. Logistic Regression using Gradient Descent.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/1C. Logistic Regression using Gradient Descent.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/1C.%20Logistic%20Regression%20using%20Gradient%20Descent.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Logistic Regression using Sci-kit learn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '1D. Logistic Regression using Sci-kit learn.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/1D. Logistic Regression using Sci-kit learn.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/1D.%20Logistic%20Regression%20using%20Sci-kit%20learn.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="font-medium mb-2 mt-4">Regularization</div>
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Regularization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '2A. Regularization.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/2A. Regularization.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/2A.%20Regularization.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Regularization on Logistic Regression</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '2B. Regularization on Logistic Regression.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/2B. Regularization on Logistic Regression.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/2B.%20Regularization%20on%20Logistic%20Regression.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="font-medium mb-2 mt-4">Other Classification Methods</div>
              <div className="ml-4 space-y-2">
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>K Nearest Neighbors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '3. KNN.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/3. KNN.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/3.%20KNN.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Support Vector Machines</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '4. SVM.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/4. SVM.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/4.%20SVM.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Naive Bayes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '5a. Naive Bayes.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/5a. Naive Bayes.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/5a.%20Naive%20Bayes.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Naive Bayes using sklearn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '5B. Naive Bayes using sklearn.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/5B. Naive Bayes using sklearn.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/5B.%20Naive%20Bayes%20using%20sklearn.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Decision Trees & Information Theory</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '6A. Decision Trees & Information Theory.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/6A. Decision Trees & Information Theory.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/6A.%20Decision%20Trees%20%26%20Information%20Theory.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Decision Trees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '6B. Decision Trees.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/6B. Decision Trees.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/6B.%20Decision%20Trees.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Random Forest</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: '7. Random Forest .ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/7. Random Forest .ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/7.%20Random%20Forest%20.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Logistic Regression example 2</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: 'Logistic Regression example 2.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/Logistic Regression example 2.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/Logistic%20Regression%20example%202.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                  <div className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-gray-500" />
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Ridge, and Ridge CV for optimized alpha values</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleFileSelect({ type: 'file', name: 'Ridge, and Ridge CV for optimized alpha values.ipynb', path: 'Machine-Learning-Notebooks-master/03. Classification/Ridge, and Ridge CV for optimized alpha values.ipynb' })}
                    >
                      View Notebook
                    </Button>
                    <a 
                      href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/03.%20Classification/Ridge%2C%20and%20Ridge%20CV%20for%20optimized%20alpha%20values.ipynb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clustering */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Clustering
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>KMeans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. KMeans.ipynb', path: 'Machine-Learning-Notebooks-master/04. Clustering/1. KMeans.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/04.%20Clustering/1.%20KMeans.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>MiniBatch KMeans</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. MiniBatch KMeans.ipynb', path: 'Machine-Learning-Notebooks-master/04. Clustering/2. MiniBatch KMeans.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/04.%20Clustering/2.%20MiniBatch%20KMeans.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Hierarchical Clustering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '3. Hierarchical Clustering.ipynb', path: 'Machine-Learning-Notebooks-master/04. Clustering/3. Hierarchical Clustering.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/04.%20Clustering/3.%20Hierarchical%20Clustering.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <div>
                    <span>Application of Clustering - Image Quantization</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '4. Image Quantization using Clustering.ipynb', path: 'Machine-Learning-Notebooks-master/04. Clustering/4. Image Quantization using Clustering.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/04.%20Clustering/4.%20Image%20Quantization%20using%20Clustering.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <div>
                    <span>Application of Clustering - Outlier Detection</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '05. Outlier Detection using KMeans.ipynb', path: 'Machine-Learning-Notebooks-master/04. Clustering/05. Outlier Detection using KMeans.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/04.%20Clustering/05.%20Outlier%20Detection%20using%20KMeans.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Model Evaluation */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Model Evaluation
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Cross Validation and its types</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Cross Validation and its types.ipynb', path: 'Machine-Learning-Notebooks-master/05. Model Evaluation/1. Cross Validation and its types.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/05.%20Model%20Evaluation/1.%20Cross%20Validation%20and%20its%20types.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Confusion Matrix, Precision, Recall</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: 'Confusion Matrix, Precision, Recall.ipynb', path: 'Machine-Learning-Notebooks-master/05. Model Evaluation/Confusion Matrix, Precision, Recall.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/05.%20Model%20Evaluation/Confusion%20Matrix%2C%20Precision%2C%20Recall.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Grid Search and Randomized Search</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: 'Grid Search and Randomized Search.ipynb', path: 'Machine-Learning-Notebooks-master/05. Model Evaluation/Grid Search and Randomized Search.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/05.%20Model%20Evaluation/Grid%20Search%20and%20Randomized%20Search.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>R Squared</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: 'R Squared.ipynb', path: 'Machine-Learning-Notebooks-master/05. Model Evaluation/R Squared.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/05.%20Model%20Evaluation/R%20Squared.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>ROC Curve & AUC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: 'ROC Curve & AUC.ipynb', path: 'Machine-Learning-Notebooks-master/05. Model Evaluation/ROC Curve & AUC.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/05.%20Model%20Evaluation/ROC%20Curve%20%26%20AUC.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Silhoutte Distance for Clustering</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: 'Silhoutte Distance for Clustering.ipynb', path: 'Machine-Learning-Notebooks-master/05. Model Evaluation/Silhoutte Distance for Clustering.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/05.%20Model%20Evaluation/Silhoutte%20Distance%20for%20Clustering.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>XGBoost</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '3. XGBoost.ipynb', path: 'Machine-Learning-Notebooks-master/05. Model Evaluation/3. XGBoost.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/05.%20Model%20Evaluation/3.%20XGBoost.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Associate Rule Mining */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Associate Rule Mining
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Apriori Algorithm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Apriori Algorithm.ipynb', path: 'Machine-Learning-Notebooks-master/06. Associate Rule Mining/1. Apriori Algorithm.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/06.%20Associate%20Rule%20Mining/1.%20Apriori%20Algorithm.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Eclat Model</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. Eclat Model.ipynb', path: 'Machine-Learning-Notebooks-master/06. Associate Rule Mining/2. Eclat Model.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/06.%20Associate%20Rule%20Mining/2.%20Eclat%20Model.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reinforcement Learning */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Reinforcement Learning
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Upper Confidence Bound Algorithm</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Upper Confidence Bound.ipynb', path: 'Machine-Learning-Notebooks-master/07. Reinforcement Learning/1. Upper Confidence Bound.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/07.%20Reinforcement%20Learning/1.%20Upper%20Confidence%20Bound.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Thompson Sampling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. Thompson Sampling.ipynb', path: 'Machine-Learning-Notebooks-master/07. Reinforcement Learning/2. Thompson Sampling.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/07.%20Reinforcement%20Learning/2.%20Thompson%20Sampling.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Natural Language Processing */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Natural Language Processing
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Sentiment Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Sentiment Analysis.ipynb', path: 'Machine-Learning-Notebooks-master/08. Natural Language Processing/1. Sentiment Analysis.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/08.%20Natural%20Language%20Processing/1.%20Sentiment%20Analysis.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Neural Networks */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Neural Networks
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>What are Activation Functions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Activation Functions.ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/1. Activation Functions.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/1.%20Activation%20Functions.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Vanilla Neural Network</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. ANN.ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/2. ANN.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/2.%20ANN.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Backpropagation Derivation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2A. Backpropagation .ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/2A. Backpropagation .ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/2A.%20Backpropagation%20.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Backpropagation in Python</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2B. Neural Networks using Backpropagation.ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/2B. Neural Networks using Backpropagation.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/2B.%20Neural%20Networks%20using%20Backpropagation.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Convolutional Neural Networks Theory</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '3a. Convolutional Neural Networks Theory.ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/3a. Convolutional Neural Networks Theory.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/3a.%20Convolutional%20Neural%20Networks%20Theory.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Convolutional Neural Networks in TensorFlow</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '3B. Convolutional Neural Networks in TensorFlow.ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/3B. Convolutional Neural Networks in TensorFlow.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/3B.%20Convolutional%20Neural%20Networks%20in%20TensorFlow.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>LSTM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '5. LSTM .ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/5. LSTM .ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/5.%20LSTM%20.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Long Short Term Memory Neural Networks (LSTM)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '4. Recurrent Neural Networks and LSTM (Theory).ipynb', path: 'Machine-Learning-Notebooks-master/09. Neural Networks/4. Recurrent Neural Networks and LSTM (Theory).ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/09.%20Neural%20Networks/4.%20Recurrent%20Neural%20Networks%20and%20LSTM%20(Theory).ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dimensionality Reduction */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Dimensionality Reduction
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Principal Component Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Principal Component Analysis.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/1. Principal Component Analysis.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/1.%20Principal%20Component%20Analysis.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Linear Discriminant Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. Linear Discriminant Analysis.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/2. Linear Discriminant Analysis.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/2.%20Linear%20Discriminant%20Analysis.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Factor Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '3. Factor Analysis.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/3. Factor Analysis.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/3.%20Factor%20Analysis.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Kernel PCA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '4. Kernel PCA.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/4. Kernel PCA.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/4.%20Kernel%20PCA.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Truncated SVD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '5. Truncated SVD.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/5. Truncated SVD.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/5.%20Truncated%20SVD.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Self Organizing Maps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '6. Self Organizing Maps.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/6. Self Organizing Maps.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/6.%20Self%20Organizing%20Maps.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Dictionary Learning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '7. Dictionary Learning.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/7. Dictionary Learning.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/7.%20Dictionary%20Learning.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>t-SNE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '8. t-SNE.ipynb', path: 'Machine-Learning-Notebooks-master/10. Dimensionality Reduction/8. t-SNE.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/10.%20Dimensionality%20Reduction/8.%20t-SNE.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Model Selection and Boosting */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Model Selection and Boosting
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>K-Fold Cross Validation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. K-Fold Cross Validation.ipynb', path: 'Machine-Learning-Notebooks-master/11. Model Selection and Boosting/1. K-Fold Cross Validation.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/11.%20Model%20Selection%20and%20Boosting/1.%20K-Fold%20Cross%20Validation.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Grid Search</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. Grid Search.ipynb', path: 'Machine-Learning-Notebooks-master/11. Model Selection and Boosting/2. Grid Search.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/11.%20Model%20Selection%20and%20Boosting/2.%20Grid%20Search.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>XGBoost</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '3. XGBoost.ipynb', path: 'Machine-Learning-Notebooks-master/11. Model Selection and Boosting/3. XGBoost.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/11.%20Model%20Selection%20and%20Boosting/3.%20XGBoost.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Unsupervised Neural Networks */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Folder className="h-4 w-4 mr-2 text-blue-500" />
              Unsupervised Neural Networks
            </h3>
            <div className="ml-6 space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Boltzmann Machine</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '1. Boltzmann Machine.ipynb', path: 'Machine-Learning-Notebooks-master/12. Unsupervised Neural Networks/1. Boltzmann Machine.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/12.%20Unsupervised%20Neural%20Networks/1.%20Boltzmann%20Machine.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Autoencoders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileSelect({ type: 'file', name: '2. Autoencoders.ipynb', path: 'Machine-Learning-Notebooks-master/12. Unsupervised Neural Networks/2. Autoencoders.ipynb' })}
                  >
                    View Notebook
                  </Button>
                  <a 
                    href="http://nbviewer.jupyter.org/github/maykulkarni/Machine-Learning-Notebooks/blob/master/12.%20Unsupervised%20Neural%20Networks/2.%20Autoencoders.ipynb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sources / References */}

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">Sources / References:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>1. <a href="https://www.coursera.org/learn/machine-learning" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Machine Learning by Andrew Ng (Coursera)</a></li>
              <li>2. <a href="https://www.udemy.com/machinelearning/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Machine Learning A-Z (Udemy)</a></li>
              <li>3. <a href="https://www.udemy.com/deeplearning/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Deep Learning A-Z (Udemy)</a></li>
              <li>4. <a href="https://www.coursera.org/learn/neural-networks" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Neural Networks by Geoffrey (Hinton Coursera)</a></li>
              <li>5. <a href="https://www.packtpub.com/big-data-and-business-intelligence/scikit-learn-cookbook-second-edition" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">Scikit-learn Cookbook (Second Edition) - Julian Avila et. al</a></li>
            </ul>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
