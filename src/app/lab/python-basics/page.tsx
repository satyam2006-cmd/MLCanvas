import fs from "fs";
import path from "path";
import PythonBasicsClient from "./PythonBasicsClient";

export default async function Page() {
  const filePath = path.join(process.cwd(), "python.md");
  let markdownContent = "";
  
  try {
    markdownContent = fs.readFileSync(filePath, "utf-8");
    // Strip frontmatter if it exists
    if (markdownContent.startsWith("---")) {
      const parts = markdownContent.split("---");
      if (parts.length >= 3) {
        markdownContent = parts.slice(2).join("---").trim();
      }
    }
  } catch (error) {
    console.error("Error reading python.md:", error);
    markdownContent = "# Error\nCould not load the Python documentation.";
  }

  return <PythonBasicsClient markdownContent={markdownContent} />;
}
