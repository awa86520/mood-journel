import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToCSV = (entries) => {
  const rows = entries.map((e) => [e.date, e.mood.label, e.note, e.weather.description]);
  const csv = [['Date', 'Mood', 'Note', 'Weather'], ...rows].map(e => e.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mood_journal.csv';
  a.click();
};

export const exportToPDF = (entries) => {
  const doc = new jsPDF();
  doc.text('Mood Journal Entries', 10, 10);
  const table = entries.map(e => [e.date, e.mood.label, e.note, e.weather.description]);
  doc.autoTable({ head: [['Date', 'Mood', 'Note', 'Weather']], body: table });
  doc.save('mood_journal.pdf');
};