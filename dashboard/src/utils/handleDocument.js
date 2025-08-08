import axios from "./axios";

export const handleDocumentPreview = async (docId) => {
    try {
        const response = await axios.get(`documents/${docId}/download/`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    } catch (err) {
        console.error('Failed to open document:', err);
        alert('Failed to preview document.');
    }
};


export const handleDocumentDownload = async (docId, filename) => {
    try {
        const response = await axios.get(`documents/${docId}/download/`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'document.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Download failed:', err);
        alert('Failed to download document.');
    }
};

