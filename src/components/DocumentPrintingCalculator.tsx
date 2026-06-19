"use client";

import { useState, useRef, useMemo } from "react";
import { FileText, Upload, X } from "lucide-react";
import {
  PaperSize,
  ColorMode,
  Binding,
  PAPER_SIZE_LABELS,
  BINDING_LABELS,
  calculatePrice,
} from "@/lib/pricing";
import { PROVIDERS } from "@/data/providers";
import { QuotePanel, formatRand } from "@/components/QuotePanel";
import { FieldLabel, OptionButton } from "@/components/OrderFormPrimitives";

export function DocumentPrintingCalculator() {
  const [paperSize, setPaperSize] = useState<PaperSize>("A4");
  const [colorMode, setColorMode] = useState<ColorMode>("mono");
  const [binding, setBinding] = useState<Binding>("none");
  const [doubleSided, setDoubleSided] = useState(true);
  const [pages, setPages] = useState(20);
  const [copies, setCopies] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const breakdown = useMemo(
    () => calculatePrice({ paperSize, colorMode, pages, copies, binding, doubleSided }),
    [paperSize, colorMode, pages, copies, binding, doubleSided]
  );

  const matchedProviders = useMemo(
    () =>
      PROVIDERS.filter((p) => p.capabilities.includes("document-printing"))
        .sort((a, b) => a.leadTimeDays - b.leadTimeDays)
        .slice(0, 3),
    []
  );

  function handleFile(file: File) {
    setFileName(file.name);
    setFileType(file.type);
    if (file.type === "application/pdf" || file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
  }

  function clearFile() {
    setFileName(null);
    setFilePreviewUrl(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const lineItems = [
    { label: `Pages (${pages} × ${copies})`, value: formatRand(breakdown.pageSubtotal) },
    ...(breakdown.bindingSubtotal > 0
      ? [{ label: "Finishing", value: formatRand(breakdown.bindingSubtotal) }]
      : []),
    ...(breakdown.doubleSidedDiscount > 0
      ? [{ label: "Volume discount", value: formatRand(breakdown.doubleSidedDiscount), isDiscount: true }]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-8">
        {/* Upload zone */}
        <div>
          <FieldLabel step={1}>Upload your file</FieldLabel>
          {!fileName ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed rule hover:border-signal transition-colors py-12 flex flex-col items-center gap-3 text-stock-dim"
            >
              <Upload className="h-6 w-6" />
              <span className="font-body text-sm">
                Click to upload PDF, JPG or PNG
              </span>
            </button>
          ) : (
            <div className="border rule p-4 flex items-start gap-4">
              {filePreviewUrl && fileType?.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={filePreviewUrl}
                  alt="Upload preview"
                  className="h-24 w-24 object-cover border rule shrink-0"
                />
              ) : filePreviewUrl && fileType === "application/pdf" ? (
                <object
                  data={filePreviewUrl}
                  type="application/pdf"
                  className="h-24 w-24 border rule shrink-0 bg-stock"
                  aria-label="PDF preview"
                />
              ) : (
                <div className="h-24 w-24 border rule shrink-0 flex items-center justify-center bg-ink-raised">
                  <FileText className="h-8 w-8 text-board" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-stock truncate">{fileName}</p>
                <p className="font-mono text-[10px] text-confirmed uppercase tracking-wider mt-1">
                  File received
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove file"
                className="text-board hover:text-signal transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>

        <div>
          <FieldLabel step={2}>Paper size</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(PAPER_SIZE_LABELS) as PaperSize[]).map((size) => (
              <OptionButton key={size} active={paperSize === size} onClick={() => setPaperSize(size)}>
                {size}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel step={3}>Color</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {(["mono", "color"] as ColorMode[]).map((mode) => (
              <OptionButton key={mode} active={colorMode === mode} onClick={() => setColorMode(mode)}>
                {mode === "mono" ? "Black & white" : "Full color"}
              </OptionButton>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <FieldLabel step={4}>Pages</FieldLabel>
            <input
              type="number"
              min={1}
              value={pages}
              onChange={(e) => setPages(Math.max(1, Number(e.target.value) || 1))}
              className="w-full border rule bg-ink-raised text-stock font-mono text-lg px-4 py-3 focus:border-signal outline-none"
            />
          </div>
          <div>
            <FieldLabel step={5}>Copies</FieldLabel>
            <input
              type="number"
              min={1}
              value={copies}
              onChange={(e) => setCopies(Math.max(1, Number(e.target.value) || 1))}
              className="w-full border rule bg-ink-raised text-stock font-mono text-lg px-4 py-3 focus:border-signal outline-none"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={doubleSided}
              onChange={(e) => setDoubleSided(e.target.checked)}
              className="h-4 w-4 accent-[#ff4d1c]"
            />
            <span className="font-body text-sm text-stock-dim">Double-sided printing</span>
          </label>
        </div>

        <div>
          <FieldLabel step={6}>Finishing</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(BINDING_LABELS) as Binding[]).map((b) => (
              <OptionButton key={b} active={binding === b} onClick={() => setBinding(b)}>
                {BINDING_LABELS[b]}
              </OptionButton>
            ))}
          </div>
        </div>
      </div>

      <QuotePanel
        total={breakdown.total}
        subLabel={`${formatRand(breakdown.costPerCopy)} per copy · ${copies} cop${copies === 1 ? "y" : "ies"}`}
        lineItems={lineItems}
        matchedProviders={matchedProviders}
        checkoutHref="/checkout?service=document-printing"
      />
    </div>
  );
}
