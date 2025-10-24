"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Copy, Download, Check, Heart } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";

function cleanForCopy(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/(^|\n)#+\s?/g, "$1")
    .replace(/`/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function ParsedMessageBubble({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const markdown = content.trim();
  const plain = cleanForCopy(markdown);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
      compress: true,
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    const margin = 50;
    const maxWidth = 500;
    const lineHeight = 20;
    let y = margin;

    const lines = plain.split("\n");
    for (let line of lines) {
      const text = line.trim();
      if (!text) {
        y += 10;
        continue;
      }

      // Handle title separately
      if (text.toLowerCase().startsWith("title:")) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        const wrapped = doc.splitTextToSize(
          text.replace(/^title:\s*/i, "").trim(),
          maxWidth
        );
        wrapped.forEach((ln: string) => {
          doc.text(ln, margin, y);
          y += lineHeight * 1.4;
        });
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
      } else {
        // Wrap normal text safely
        const wrapped = doc.splitTextToSize(text, maxWidth);
        wrapped.forEach((ln: string) => {
          doc.text(ln, margin, y);
          y += lineHeight;
        });
      }

      // Add page break if needed
      if (y > 760) {
        doc.addPage();
        y = margin;
      }
    }

    doc.save("sermon-outline.pdf");
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-2xl p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-2xl shadow-lg overflow-hidden"
    >
      {/* Toolbar */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          className="p-2 rounded-md bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 hover:scale-105 transition relative shadow-sm"
        >
          {copied ? (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 text-xs text-green-600 dark:text-green-500 font-medium"
            >
              <Check className="w-3 h-3" /> Copied
            </motion.div>
          ) : (
            <Copy className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleDownload}
          className="p-2 rounded-md bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 hover:scale-105 transition relative shadow-sm"
        >
          {downloaded ? (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-500 font-medium"
            >
              <Check className="w-3 h-3" /> Saved
            </motion.div>
          ) : (
            <Download className="w-4 h-4 text-gray-700 dark:text-gray-200" />
          )}
        </motion.button>

        <motion.button
          disabled
          className="p-2 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 cursor-not-allowed opacity-50"
          title="Save to Library (Coming Soon)"
        >
          <Heart className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </motion.button>
      </div>

      {/* Markdown */}
      <div className="prose dark:prose-invert max-w-none pr-3">
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ ...props }) => (
              <h1
                {...props}
                className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-cyan-400 mb-4"
              />
            ),
            h2: ({ ...props }) => (
              <h2
                {...props}
                className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2"
              />
            ),
            p: ({ ...props }) => (
              <p
                {...props}
                className="text-gray-700 text-sm dark:text-gray-300 leading-relaxed mb-3"
              />
            ),
            li: ({ ...props }) => (
              <li
                {...props}
                className="text-gray-700 text-sm dark:text-gray-300 leading-relaxed list-disc ml-6"
              />
            ),
            blockquote: ({ ...props }) => (
              <blockquote
                {...props}
                className="border-l-4 text-sm border-blue-400/50 pl-4 italic text-gray-600 dark:text-gray-400 my-4"
              />
            ),
            strong: ({ ...props }) => (
              <strong
                {...props}
                className="text-gray-900 dark:text-white font-semibold"
              />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}
