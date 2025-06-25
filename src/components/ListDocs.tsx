// components/ListDocs.tsx
'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Doc {
  id: string;
  name: string;
}

export function ListDocs() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      const res = await fetch('/api/docs');
      const data = await res.json();
      setDocs(data);
    } catch (error) {
      toast.error('Failed to load documents.');
    } finally {
      setLoading(false);
    }
  };

  const deleteDoc = async (id: string) => {
    try {
      const res = await fetch(`/api/docs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('Document deleted.');
      setDocs(docs.filter(doc => doc.id !== id));
    } catch {
      toast.error('Failed to delete document.');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-gray-200 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Documents</h2>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : docs.length === 0 ? (
        <p className="text-gray-600">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {docs.map((doc) => (
            <li key={doc.id} className="flex justify-between items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-700 truncate max-w-[70%]">{doc.name}</span>
              <button
                onClick={() => deleteDoc(doc.id)}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
