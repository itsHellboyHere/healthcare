import React from 'react'
import PDFUploadForm from '../components/PDFUploadForm';
import PDFList from '../components/PDFList';

const Dashboard = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-600 title">Your Medical Documents</h1>
            <PDFUploadForm />
            <PDFList />
        </div>
    );
}

export default Dashboard