import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: "Learning Lab | ML Canvas",
  description: "Learn fundamental machine learning concepts with interactive tutorials and explanations.",
  alternates: {
    canonical: "/lab",
  },
};

const learningModules = [
  {
    title: "Introduction to Machine Learning",
    content: "Machine learning is a field of artificial intelligence (AI) that uses statistical techniques to give computer systems the ability to 'learn' (e.g., progressively improve performance on a specific task) from data, without being explicitly programmed."
  },
  {
    title: "Supervised Learning: Regression",
    content: "Regression is a supervised learning technique used to predict a continuous outcome variable (y) based on one or more predictor variables (x). The goal is to find a function that best maps the input variables to the continuous output variable."
  },
  {
    title: "Supervised Learning: Classification",
    content: "Classification is a supervised learning technique used to predict a categorical class label. It is the process of predicting the class of given data points. Classes are sometimes called as targets/ labels or categories."
  },
  {
    title: "Unsupervised Learning: Clustering",
    content: "Clustering is an unsupervised learning task that involves grouping a set of objects in such a way that objects in the same group (called a cluster) are more similar (in some sense) to each other than to those in other groups (clusters)."
  },
  {
    title: "Model Evaluation Metrics",
    content: "In machine learning, it's crucial to evaluate the performance of your models. Common metrics include Accuracy, Precision, Recall, F1-Score for classification tasks, and Mean Squared Error (MSE) or R-squared for regression tasks."
  }
];


export default function LabPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Learning Lab</CardTitle>
          <CardDescription>
            Learn the fundamental concepts of Machine Learning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {learningModules.map((module, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{module.title}</AccordionTrigger>
                <AccordionContent>
                  {module.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
