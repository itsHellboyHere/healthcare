import { useState, useRef } from 'react';
import axios from "../utils/axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function PDFUploadForm() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const queryClient = useQueryClient();

    const uploadMutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axios.post('/documents/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            toast.success("PDF uploaded.")
            setFile(null);
            setTitle('');
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        },
    });

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file || !title.trim()) {
            toast.error("Please provide a title and select a file.");
            return;
        }

        // Check if the selected file is a PDF
        if (!file.name.toLowerCase().endsWith(".pdf")) {
            toast.error("Only PDF files are allowed.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        uploadMutation.mutate(formData);
    };
    const fileInputRef = useRef(null);

    return (
        <form onSubmit={handleUpload} className="mb-6 p-4 border rounded-lg shadow max-w-md mx-auto space-y-2 bg-white">
            <label className="block mb-2 font-semibold">Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                className="mb-4 w-full px-3 py-2 border rounded "
                required
            />

            <label className="block mb-2 font-semibold">Upload PDF:</label>
            <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4 bg-emerald-50 text-gray-700"
                required
            />

            <button
                type="submit"
                disabled={uploadMutation.isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
            >
                {uploadMutation.isPending ? 'Uploading...' : 'Upload'}
            </button>

            {uploadMutation.isError && (
                <p className="text-red-500 mt-2">
                    {(uploadMutation.error)?.response?.data?.detail || 'Upload failed.'}
                </p>
            )}
        </form>
    );
}
