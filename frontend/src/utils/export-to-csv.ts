export function exportToCSV(filename: string, rows: Record<string, any>[]) {
    if (!rows || !rows.length) {
      return;
    }
  
    const separator = ',';
    const keys = Object.keys(rows[0]);
  
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) =>
          keys
            .map((fieldName) => {
              const val = row[fieldName] ?? '';
              const escaped = typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
              return escaped;
            })
            .join(separator)
        )
        .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    link.click();
  }
  