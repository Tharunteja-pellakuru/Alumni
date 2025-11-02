import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

const ProfileEdit = ({ user, onDone }) => {
  const { updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    batch: user.batch || "",
    about: user.about || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API/save
    setTimeout(() => {
      updateProfile(form);
      setIsSaving(false);
      onDone();
    }, 600);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Batch
          </label>
          <input
            name="batch"
            value={form.batch}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About
        </label>
        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          rows={4}
        />
      </div>
      <div className="flex items-center space-x-3">
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-school-blue text-white"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
        <button
          type="button"
          onClick={onDone}
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;
