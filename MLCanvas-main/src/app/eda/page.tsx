'use client';
import { EdaSection } from "@/components/dashboard/eda-section";
import { DataPreview } from "@/components/dashboard/data-preview";
import { CsvUploader } from "@/components/dashboard/csv-uploader";
import { CsvDataProvider } from "@/contexts/csv-data-context";

export default function EdaPage() {
  return (
    <CsvDataProvider>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <CsvUploader />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <DataPreview />
        </div>
        <div className="col-span-12">
          <EdaSection />
        </div>
      </div>
    </CsvDataProvider>
  );
}
