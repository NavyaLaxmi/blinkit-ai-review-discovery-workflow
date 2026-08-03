import Papa from "papaparse";
import { FeedbackItem, UploadedFile } from "../types";

/**
 * Parses uploaded files (CSV, TXT, JSON, MD) into structured FeedbackItems
 */
export async function parseUploadedFiles(files: FileList | File[]): Promise<UploadedFile[]> {
  const parsedFiles: UploadedFile[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileContent = await readFileAsText(file);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    let items: FeedbackItem[] = [];

    if (ext === 'csv') {
      items = parseCSVContent(fileContent, file.name);
    } else if (ext === 'json') {
      items = parseJSONContent(fileContent, file.name);
    } else {
      // txt, md, log, pdf (extracted plain text)
      items = parseTextContent(fileContent, file.name);
    }

    parsedFiles.push({
      id: `file-${Date.now()}-${i}`,
      name: file.name,
      size: file.size,
      type: file.type || ext.toUpperCase(),
      lineCount: items.length,
      items,
    });
  }

  return parsedFiles;
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || '');
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

function parseCSVContent(content: string, fileName: string): FeedbackItem[] {
  const result = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
  });

  const items: FeedbackItem[] = [];
  const rows = result.data as Record<string, any>[];

  rows.forEach((row, idx) => {
    // Detect column key for content
    const contentKey = Object.keys(row).find((k) =>
      /review|feedback|comment|text|body|description|opinion|message/i.test(k)
    ) || Object.keys(row)[0];

    const sourceKey = Object.keys(row).find((k) =>
      /source|platform|channel|app|store/i.test(k)
    );

    const ratingKey = Object.keys(row).find((k) =>
      /rating|stars|score|grade/i.test(k)
    );

    const dateKey = Object.keys(row).find((k) =>
      /date|time|timestamp|created/i.test(k)
    );

    const authorKey = Object.keys(row).find((k) =>
      /author|user|reviewer|name|customer/i.test(k)
    );

    const textValue = row[contentKey];
    if (textValue && typeof textValue === 'string' && textValue.trim().length > 3) {
      items.push({
        id: `csv-${idx}-${Date.now()}`,
        source: row[sourceKey] || inferSourceFromFileName(fileName),
        content: textValue.trim(),
        rating: row[ratingKey] ? parseFloat(row[ratingKey]) : undefined,
        date: row[dateKey] || undefined,
        author: row[authorKey] || undefined,
      });
    }
  });

  return items;
}

function parseJSONContent(content: string, fileName: string): FeedbackItem[] {
  try {
    const parsed = JSON.parse(content);
    const arrayData = Array.isArray(parsed) ? parsed : [parsed];
    const items: FeedbackItem[] = [];

    arrayData.forEach((obj, idx) => {
      const text = obj.review || obj.content || obj.comment || obj.feedback || obj.text || (typeof obj === 'string' ? obj : '');
      if (text && typeof text === 'string' && text.trim().length > 3) {
        items.push({
          id: `json-${idx}-${Date.now()}`,
          source: obj.source || inferSourceFromFileName(fileName),
          content: text.trim(),
          rating: obj.rating || obj.score,
          date: obj.date || obj.timestamp,
          author: obj.author || obj.user,
        });
      }
    });

    return items;
  } catch (err) {
    return parseTextContent(content, fileName);
  }
}

function parseTextContent(content: string, fileName: string): FeedbackItem[] {
  // Split by double newlines or lines starting with bullet points / numbers
  const chunks = content
    .split(/\n\s*\n|\r\n\s*\r\n/)
    .map((c) => c.trim())
    .filter((c) => c.length > 5);

  const items: FeedbackItem[] = [];
  const defaultSource = inferSourceFromFileName(fileName);

  chunks.forEach((chunk, idx) => {
    items.push({
      id: `txt-${idx}-${Date.now()}`,
      source: defaultSource,
      content: chunk,
    });
  });

  return items;
}

function inferSourceFromFileName(fileName: string): string {
  const lower = fileName.toLowerCase();
  if (lower.includes('play') || lower.includes('google')) return 'Play Store';
  if (lower.includes('appstore') || lower.includes('ios') || lower.includes('apple')) return 'App Store';
  if (lower.includes('reddit')) return 'Reddit';
  if (lower.includes('survey') || lower.includes('nps')) return 'Survey';
  if (lower.includes('community') || lower.includes('forum')) return 'Community';
  return 'Uploaded File';
}
