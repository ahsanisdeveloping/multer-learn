import React, { useEffect, useState } from 'react';

const App = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pdf/get-files');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFiles(data.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:3001/api/pdf/upload-files', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchFiles(); // Refresh the list of files
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDownload = async (id, filename) => {
    try {
      const response = await fetch(`http://localhost:3001/api/pdf/download/${id}/${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <h1>PDF Upload and Download</h1>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {files.map(file => (
          <li key={file._id}>
            <button  onClick={() => handleDownload(file._id, file.pdf)}>Download {file.pdf}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
