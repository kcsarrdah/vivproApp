export const convertToCSV = (data) => {
    // Get headers from first object
    const headers = ['ID', 'Title', 'Danceability', 'Energy', 'Acousticness', 'Tempo', 'Rating'];
    
    // Create CSV header row
    let csv = headers.join(',') + '\n';
    
    // Add data rows
    data.forEach(item => {
      const row = [
        item.id,
        `"${item.title}"`,  // Wrap title in quotes to handle commas in titles
        item.danceability,
        item.energy,
        item.acousticness,
        item.tempo,
        item.star_rating || 0
      ];
      csv += row.join(',') + '\n';
    });
    
    return csv;
  };
  
  export const downloadCSV = (data, filename = 'songs.csv') => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create download link
    if (navigator.msSaveBlob) { // For IE
      navigator.msSaveBlob(blob, filename);
    } else {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };