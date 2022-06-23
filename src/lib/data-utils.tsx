import Papa from 'papaparse';

export async function fetchCSV(path: string, callback: Function) {
  Papa.parse(path, {
    download: true,
    skipEmptyLines: true,
    complete: results => {
      callback(results.data.slice(1));  // remove headers
    }
  })
}

// if we need to save a generated population
// source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
export function exportToCsv(filename: string, rows: any[]) {
  const processRow = (row: any[]) => {
    let finalVal = '';
    for (let j = 0; j < row.length; j++) {
      let innerValue = row[j] === null ? '' : row[j].toString();
      if (row[j] instanceof Date) {
        innerValue = row[j].toLocaleString();
      }
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) {
        result = `"${  result  }"`;
      }
      if (j > 0) {
        finalVal += ',';
      }
      finalVal += result;
    }
    return `${finalVal  }\n`;
  };

  let csvFile = '';
  for (let i = 0; i < rows.length; i++) {
    csvFile += processRow(rows[i]);
  }

  const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  // @ts-ignore
  if (navigator.msSaveBlob) { // IE 10+
    // @ts-ignore
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
