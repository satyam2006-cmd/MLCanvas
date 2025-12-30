const fs = require('fs');

let content = fs.readFileSync('src/app/lab/page.tsx', 'utf8');

// Pattern to match section headers and their content
const sectionPattern = /{\/\* (.+) \*\/\s*<div>\s*<h3 className="text-lg font-semibold mb-3 flex items-center">\s*<Folder className="h-4 w-4 mr-2 text-blue-500" \/>\s*(.+?)<\/h3>\s*<div className="ml-6 space-y-2">([\s\S]*?)<\/div>\s*<\/div>/g;

const sectionMap = {
  'NumPy Basics': 'numpy',
  'Data Preprocessing': 'preprocessing',
  'Regression': 'regression',
  'Classification': 'classification',
  'Clustering': 'clustering',
  'Model Evaluation': 'evaluation',
  'Associate Rule Mining': 'association',
  'Reinforcement Learning': 'reinforcement',
  'Natural Language Processing': 'nlp',
  'Neural Networks': 'neural',
  'Dimensionality Reduction': 'dimensionality',
  'Model Selection and Boosting': 'boosting',
  'Unsupervised Neural Networks': 'unsupervised'
};

content = content.replace(sectionPattern, (match, comment, title, notebooks) => {
  const sectionKey = sectionMap[title] || title.toLowerCase().replace(/\s+/g, '-');
  
  return `{/* ${comment} */}
          <div>
            <button
              onClick={() => toggleSection('${sectionKey}')}
              className="w-full text-left flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <h3 className="text-lg font-semibold flex items-center">
                <Folder className="h-4 w-4 mr-2 text-blue-500" />
                ${title}
              </h3>
              {expandedSections['${sectionKey}'] ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {expandedSections['${sectionKey}'] && (
              <div className="ml-6 space-y-2 mt-2">${notebooks}</div>
            )}
          </div>`;
});

fs.writeFileSync('src/app/lab/page.tsx', content);
console.log('Successfully converted all sections to dropdowns!');
