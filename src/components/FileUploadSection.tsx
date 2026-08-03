import React, { useState, useRef } from "react";
import { Upload, FileText, Sparkles, CheckCircle2, Trash2, Database, AlertCircle, FileSpreadsheet, ArrowRight } from "lucide-react";
import { FeedbackItem, UploadedFile, SampleDataset } from "../types";
import { parseUploadedFiles } from "../utils/fileParser";
import { SAMPLE_DATASETS } from "../data/sampleDatasets";

interface FileUploadSectionProps {
  onStartAnalysis: (items: FeedbackItem[], datasetName: string) => void;
  isAnalyzing: boolean;
}

export const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  onStartAnalysis,
  isAnalyzing,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [parsingError, setParsingError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Combine items from uploaded files OR active sample dataset
  const activeSampleDataset = SAMPLE_DATASETS.find((s) => s.id === activeSampleId);
  const totalItems: FeedbackItem[] = activeSampleDataset
    ? activeSampleDataset.items
    : uploadedFiles.flatMap((f) => f.items);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const processFiles = async (files: FileList | File[]) => {
    try {
      setParsingError(null);
      const newParsed = await parseUploadedFiles(files);
      if (newParsed.length > 0) {
        setUploadedFiles((prev) => [...prev, ...newParsed]);
        setActiveSampleId(null); // Clear sample dataset if user uploads custom file
      }
    } catch (err: any) {
      setParsingError("Failed to parse one or more files. Please check file format (CSV, TXT, PDF, JSON).");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSelectSample = (sample: SampleDataset) => {
    setActiveSampleId(sample.id);
    setUploadedFiles([]); // Reset custom uploaded files when choosing a sample
    setParsingError(null);
  };

  const handleTriggerAnalysis = () => {
    if (totalItems.length === 0) return;
    const name = activeSampleDataset
      ? activeSampleDataset.name
      : uploadedFiles.map((f) => f.name).join(", ");
    onStartAnalysis(totalItems, name);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Intro Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          Blinkit AI Review Discovery Workflow
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Analyze Customer Feedback & Uncover Product Opportunities
        </h2>
        <p className="mt-2 text-base text-slate-600 max-w-2xl mx-auto">
          Upload reviews from Play Store, App Store, Reddit, surveys or community forums. Gemini AI will cluster feedback, identify top pain points, and generate prioritized PM features.
        </p>
      </div>

      {/* Preset Sample Datasets Bar */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 mb-6 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
            <Database className="w-4 h-4 text-emerald-700" />
            <span>Or test with pre-loaded Blinkit sample feedback:</span>
          </div>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
            1-Click PM Testing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_DATASETS.map((sample) => {
            const isSelected = activeSampleId === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`text-left p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-emerald-600 ring-2 ring-emerald-500/30 shadow-md"
                    : "bg-white/90 border-emerald-100 hover:border-emerald-300 hover:bg-white shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {sample.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {sample.itemCount} reviews
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs line-clamp-1">
                    {sample.name}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    {sample.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {isSelected ? "Selected ✓" : "Load dataset"}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-slate-300"
                    }`}
                  >
                    {isSelected && "✓"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main File Dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all bg-white shadow-sm ${
          isDragging
            ? "border-emerald-500 bg-emerald-50/50 scale-[1.01]"
            : "border-slate-300 hover:border-emerald-400"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".csv,.txt,.json,.pdf,.md"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="w-14 h-14 bg-yellow-100 text-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-300 shadow-inner">
          <Upload className="w-7 h-7 text-emerald-800" />
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-1">
          Upload customer feedback files
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
          Supports CSV, TXT, PDF, or JSON exports from Google Play Store, App Store, Reddit, Zendesk, or Typeform surveys.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Browse Files
          </button>
        </div>

        {parsingError && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center justify-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {parsingError}
          </div>
        )}
      </div>

      {/* Uploaded Files Summary List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Uploaded Files ({uploadedFiles.length})
            </h4>
            <button
              onClick={() => setUploadedFiles([])}
              className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-slate-800 truncate">{file.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB • {file.lineCount} items extracted
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(file.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Footer Button */}
      <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-yellow-400 text-emerald-950 px-2.5 py-0.5 rounded-full">
              Ready for Review Analysis
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {totalItems.length} review items selected
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {activeSampleDataset
              ? `Dataset: ${activeSampleDataset.name}`
              : uploadedFiles.length > 0
              ? `${uploadedFiles.length} file(s) loaded`
              : "Upload review files or choose a sample dataset to begin the AI review analysis workflow."}
          </p>
        </div>

        <button
          onClick={handleTriggerAnalysis}
          disabled={totalItems.length === 0 || isAnalyzing}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition flex items-center gap-2.5 shadow-md cursor-pointer ${
            totalItems.length > 0 && !isAnalyzing
              ? "bg-yellow-400 hover:bg-yellow-300 text-emerald-950 ring-2 ring-yellow-400/50"
              : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-70"
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-900" />
          Analyze Reviews
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
