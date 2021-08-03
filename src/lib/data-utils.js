import Papa from 'papaparse';

export async function fetchCsv(path) {
  const response = await fetch(path);
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = await decoder.decode(result.value);
  return Papa.parse(csv).data.slice(1, -1);
}
