export type CsvColumn<T> = { key: keyof T | ((row: T) => string | number | null | undefined); label: string };

function escapeCsvCell(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const header = columns.map((c) => escapeCsvCell(c.label)).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((c) => {
          const value = typeof c.key === "function" ? c.key(row) : row[c.key];
          return escapeCsvCell(value);
        })
        .join(",")
    )
    .join("\n");
  return `${header}\n${body}`;
}

export function csvResponse(csv: string, filename: string) {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
