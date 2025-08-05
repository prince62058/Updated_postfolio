import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface DatabaseInfo {
  type: string;
  connected: boolean;
  timestamp: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

interface SubmissionsResponse {
  success: boolean;
  submissions: ContactSubmission[];
  total: number;
  page: number;
  totalPages: number;
}

export default function DatabaseStatus() {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch database status
  const { data: dbStatus, isLoading: dbLoading } = useQuery<{
    success: boolean;
    database: DatabaseInfo;
  }>({
    queryKey: ['/api/database-status'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch contact submissions with pagination
  const { data: submissions, isLoading: submissionsLoading, refetch } = useQuery<SubmissionsResponse>({
    queryKey: ['/api/contact-submissions', currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/contact-submissions?page=${currentPage}&limit=5`);
      return response.json();
    },
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    
    try {
      const response = await fetch(`/api/contact-submissions/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        refetch(); // Refresh the list
        alert('Submission deleted successfully');
      } else {
        const result = await response.json();
        alert(`Failed to delete: ${result.message}`);
      }
    } catch (error) {
      alert('Error deleting submission');
      console.error(error);
    }
  };

  if (dbLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Database Status</h1>
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Database Management</h1>
        
        {/* Database Status Card */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Database Status</h2>
          {dbStatus?.success ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-sm font-medium text-gray-400">Type</h3>
                <p className="text-lg font-semibold text-white">{dbStatus.database.type}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-sm font-medium text-gray-400">Status</h3>
                <p className={`text-lg font-semibold ${
                  dbStatus.database.connected ? 'text-green-400' : 'text-red-400'
                }`}>
                  {dbStatus.database.connected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded">
                <h3 className="text-sm font-medium text-gray-400">Last Check</h3>
                <p className="text-lg font-semibold text-white">
                  {new Date(dbStatus.database.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-red-400">Failed to fetch database status</p>
          )}
        </div>

        {/* Contact Submissions */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Contact Submissions</h2>
          
          {submissionsLoading ? (
            <div className="animate-pulse">Loading submissions...</div>
          ) : submissions?.success ? (
            <>
              <div className="mb-4 text-gray-400">
                Total: {submissions.total} submissions | Page {submissions.page} of {submissions.totalPages}
              </div>
              
              <div className="space-y-4">
                {submissions.submissions.map((submission) => (
                  <div key={submission.id} className="bg-gray-800 p-4 rounded border border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-cyan-400">{submission.subject}</h3>
                      <div className="flex gap-2">
                        <span className="text-sm text-gray-400">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                        {dbStatus?.database.type === 'MongoDB' && (
                          <button
                            onClick={() => handleDeleteSubmission(submission.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">
                      <strong>From:</strong> {submission.name} ({submission.email})
                    </p>
                    <p className="text-gray-300 bg-gray-700 p-2 rounded text-sm">
                      {submission.message}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {submissions.totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <span className="px-4 py-2 text-gray-300">
                    Page {currentPage} of {submissions.totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === submissions.totalPages}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-600 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-red-400">Failed to fetch contact submissions</p>
          )}
        </div>

        {/* Seed Database Button */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={async () => {
              try {
                const response = await fetch('/api/seed-database', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                });
                const result = await response.json();
                if (result.success) {
                  alert(`Successfully added ${result.addedCount} sample submissions!`);
                  refetch(); // Refresh the submissions list
                } else {
                  alert(`Failed to seed database: ${result.message}`);
                }
              } catch (error) {
                alert('Error seeding database');
                console.error(error);
              }
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Sample Data
          </button>
          
          <a
            href="/"
            className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}