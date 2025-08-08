import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/axios';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { handleDocumentDownload, handleDocumentPreview } from '../utils/handleDocument';
export default function PDFList() {
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['documents'],
        queryFn: async () => {
            const res = await axios.get('documents/');
            return res.data;
        },
    });

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);




    const deleteMutation = useMutation({
        mutationFn: async (docId) => {
            await axios.delete(`documents/${docId}/delete/`);
        },
        onSuccess: () => {
            toast.success("Document deleted.");
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        },
        onError: () => {
            toast.error("Failed to delete document.");
        }
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse p-4 bg-gray-100 rounded-xl h-40"
                    >
                        <div className="h-6 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) return <p className="text-red-500">Failed to load documents.</p>;
    if (data?.length === 0) return <p className="text-gray-500 text-center mt-10">No documents uploaded yet.</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.map((doc) => (
                <div
                    key={doc.id}
                    className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition border pdf-card"
                >
                    <div
                        className="cursor-pointer"
                        onClick={() => handleDocumentPreview(doc.id)}
                    >
                        <p className="font-semibold text-lg">{doc.title}</p>
                        <p className="text-sm text-gray-600 break-all">{doc.filename}</p>
                        <p className="text-sm text-gray-500">
                            {(doc.file_size / 1024).toFixed(1)} KB
                        </p>
                        <p className="text-xs text-gray-400">
                            {format(new Date(doc.uploaded_at), 'dd MMM yyyy, hh:mm a')}
                        </p>
                    </div>

                    <button
                        onClick={() => handleDocumentDownload(doc.id, doc.filename)}
                        className="mt-5 px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                    >
                        Download
                    </button>

                    {confirmDeleteId === doc.id ? (
                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => {
                                    deleteMutation.mutate(doc.id);
                                    setConfirmDeleteId(null);
                                }}
                                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className='trash-icon-parent'>
                            <button
                                className="trash-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirmDeleteId(doc.id);
                                }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
