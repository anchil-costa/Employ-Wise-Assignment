import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const observer = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      if (response.data.data.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...response.data.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchUsers();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success('User Deleted Successfully!');
    } catch (error) {
      toast.error('Failed to delete user.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleSave = async (id, updatedUser) => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, updatedUser);
      setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)));
      setEditingUser(null);
      setModalOpen(false);
      toast.success('User Info Updated Successfully!');
    } catch (error) {
      toast.error('Failed to update user info.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/*User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        {users.map((user, index) => (
          <div
            key={user.id}
            ref={index === users.length - 1 ? lastUserRef : null}
            className="flex flex-col items-center border p-4 rounded-2xl shadow-md bg-white"
          >
            <img className="rounded-full w-24 h-24 mb-3" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <p className="text-lg font-semibold">{user.first_name} {user.last_name}</p>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex gap-3 mt-3">
              <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
              <Button variant="outline-danger" onClick={() => handleDelete(user.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>

      
      {loading && <p className="mt-6 text-gray-500">Loading more users...</p>}
      {!hasMore && <p className="pt-4 text-gray-500">No more users to load.</p>}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} user={editingUser} onSave={handleSave} />
    </div>
  );
};

export default UsersList;