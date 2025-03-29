import React, { useState, useEffect } from "react";

const Modal = ({isOpen, onClose, user, onSave}) => {
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });


    useEffect(() => {
        if (user) {
          setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
        }
      }, [user]);


      const isDisabled = formData.first_name.trim() === "" || formData.last_name.trim() === "" || formData.email.trim() === "";





    if (!isOpen) return null; // Don't render if modal is not open

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-96">
          <h3 className="text-xl font-semibold mb-4">Edit User</h3>
          <input
            type="text"
            value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          required
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="text"
            value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          required
            className="w-full border p-2 mb-2 rounded"
          />
          <input
            type="email"
            value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
            className="w-full border p-2 mb-4 rounded"
          />
          <div className="flex justify-end space-x-2 gap-2">
            <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 rounded">
              Cancel
            </button>
            <button onClick={() => onSave(user.id, formData)} disabled={isDisabled} // Disable button if fields are empty
            className={`px-3 py-1 rounded text-white ${
              isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
}

export default Modal