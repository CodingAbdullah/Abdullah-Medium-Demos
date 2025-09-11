'use client';

import { useState } from 'react';
import { trpc } from './components/providers';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const users = trpc.users.getAll.useQuery();
  const createUser = trpc.users.create.useMutation({
    onSuccess: () => {
      users.refetch();
      setName('');
      setEmail('');
    },
  });
  const updateUser = trpc.users.update.useMutation({
    onSuccess: () => {
      users.refetch();
      setEditingId(null);
      setName('');
      setEmail('');
    },
  });
  const deleteUser = trpc.users.delete.useMutation({
    onSuccess: () => {
      users.refetch();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateUser.mutate({ id: editingId, name, email });
    } else {
      createUser.mutate({ name, email });
    }
  };

  const handleEdit = (user: any) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setEmail('');
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">tRPC + Drizzle + Supabase CRUD</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit User' : 'Create New User'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={createUser.isPending || updateUser.isPending}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {editingId ? 'Update' : 'Create'} User
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          
          {users.isPending && <p>Loading users...</p>}
          {users.isError && <p className="text-red-500">Error loading users</p>}
          
          {users.data && (
            <div className="space-y-2">
              {users.data.map((user) => (
                <div
                  key={user.id}
                  className="p-4 border rounded bg-gray-50 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser.mutate({ id: user.id })}
                      disabled={deleteUser.isPending}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              
              {users.data.length === 0 && (
                <p className="text-gray-500">No users found. Create your first user!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}