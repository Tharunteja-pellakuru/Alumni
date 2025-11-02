import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileEdit from "../components/ProfileEdit";

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Not signed in</h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-school-blue text-white flex items-center justify-center text-3xl font-semibold">
              {(user.name && user.name[0]) || user.email[0]}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{user.name || user.email}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
            <div className="ml-auto">
              <button
                onClick={() => setEditing((s) => !s)}
                className="px-4 py-2 bg-school-orange text-white rounded-md"
              >
                {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {!editing ? (
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-medium">Phone:</span> {user.phone || "—"}
              </p>
              <p>
                <span className="font-medium">Batch:</span> {user.batch || "—"}
              </p>
              <p>
                <span className="font-medium">About:</span> {user.about || "—"}
              </p>
            </div>
          ) : (
            <ProfileEdit user={user} onDone={() => setEditing(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
