import React, { useState, useEffect } from "react";

// --- Tab Form Components ---
const BasicProfileForm = ({
  profile,
  onChange,
  onSubmit,
  loading,
  error,
  success,
  onProfilePicChange,
  uploadingPic,
}) => (
  <>
    <h2 className="text-2xl font-bold text-purple-700 mb-6">Edit Profile</h2>
    <div className="flex justify-center mb-4">
      <label className="cursor-pointer group relative">
        <div className="w-24 h-24 rounded-full border-4 border-purple-300 overflow-hidden relative">
          <img
            src={getProfilePicUrl(profile?.profilePicture)}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z"
              />
            </svg>
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onProfilePicChange}
        />
      </label>
      {uploadingPic && (
        <span className="text-sm text-gray-600 ml-2">Uploading...</span>
      )}
    </div>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onSubmit}>
      <div>
        <label className="text-sm font-medium text-purple-700">Name</label>
        <input
          type="text"
          name="name"
          value={profile?.name || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Email</label>
        <input
          type="email"
          name="email"
          value={profile?.email || ""}
          onChange={onChange}
          className="input"
          disabled
        />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Headline</label>
        <input
          type="text"
          name="headline"
          value={profile?.headline || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-purple-700">Short Bio</label>
        <input
          type="text"
          name="bio"
          value={profile?.bio || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div className="md:col-span-2 flex justify-center">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {error && (
        <div className="text-red-600 text-center md:col-span-2">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-center md:col-span-2">
          {success}
        </div>
      )}
    </form>
  </>
);

const InterestForm = ({
  profile,
  onChange,
  onCheckboxChange,
  onSubmit,
  loading,
  error,
  success,
}) => (
  <>
    <h2 className="text-2xl font-bold text-purple-700 mb-6">
      Areas of Interest
    </h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onSubmit}>
      <div>
        <label className="text-sm font-medium text-purple-700">
          Areas of Interest
        </label>
        <input
          type="text"
          name="interestsInput"
          value={profile?.interestsInput || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">Skills</label>
        <input
          type="text"
          name="skills"
          value={profile?.skills || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 text-sm text-purple-800 font-medium">
        {[
          "Investors",
          "Team members",
          "Mentorship",
          "Product Feedback",
          "Startup Accelerators",
          "Technical Co-founder",
          "Design Partner (UI/UX)",
          "Beta Testers/Early Users",
        ].map((option, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-purple-600"
              checked={profile?.lookingFor?.includes(option) || false}
              onChange={() => onCheckboxChange("lookingFor", option)}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="md:col-span-2 flex justify-center mt-6">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {error && (
        <div className="text-red-600 text-center md:col-span-2">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-center md:col-span-2">
          {success}
        </div>
      )}
    </form>
  </>
);

const SocialLinksForm = ({
  profile,
  onChange,
  onSubmit,
  loading,
  error,
  success,
}) => (
  <>
    <h2 className="text-2xl font-bold text-purple-700 mb-6">
      Social & Web Links
    </h2>
    <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
      <div>
        <label className="text-sm font-medium text-purple-700">LinkedIn</label>
        <input
          type="text"
          name="linkedin"
          value={profile?.linkedin || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">
          GitHub / Portfolio
        </label>
        <input
          type="text"
          name="github"
          value={profile?.github || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-purple-700">
          Personal Website (optional)
        </label>
        <input
          type="text"
          name="website"
          value={profile?.website || ""}
          onChange={onChange}
          className="input"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {error && <div className="text-red-600 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}
    </form>
  </>
);

// Helper to get the correct profile picture URL
const getProfilePicUrl = (pic) => {
  if (!pic) return "https://randomuser.me/api/portraits/women/44.jpg";
  if (pic.startsWith("http")) return pic;
  return `http://localhost:5000${pic}`;
};

// --- Main Profile Component ---
const UpdateProfile = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingPic, setUploadingPic] = useState(false);

  useEffect(() => {
    fetch("/api/founder/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setProfile({
          ...data,
          interestsInput: (data.interests || []).join(", "),
        })
      )
      .catch(() => setError("Failed to load profile"));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (field, value) => {
    setProfile((prev) => {
      const arr = prev[field] || [];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/founder/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: profile.name,
          headline: profile.headline,
          bio: profile.bio,
          interests: profile.interestsInput
            ? profile.interestsInput.split(",").map((s) => s.trim())
            : profile.interests,
          skills: profile.skills,
          lookingFor: profile.lookingFor,
          linkedin: profile.linkedin,
          github: profile.github,
          website: profile.website,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      setSuccess("Profile updated successfully!");

      // Update localStorage user info
      const updatedUserData = {
        ...profile,
        name: profile.name,
        headline: profile.headline,
        bio: profile.bio,
        interests: profile.interestsInput
          ? profile.interestsInput.split(",").map((s) => s.trim())
          : profile.interests,
        interestsInput: profile.interestsInput,
        skills: profile.skills,
        lookingFor: profile.lookingFor,
        linkedin: profile.linkedin,
        github: profile.github,
        website: profile.website,
        profilePicture: profile.profilePicture,
      };

      localStorage.setItem("user", JSON.stringify(updatedUserData));

      // Dispatch events to notify other components
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit for profile pictures)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert(
        `File too large. Maximum size is 10MB. Selected file: ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB`
      );
      e.target.value = ""; // Clear the input
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = ""; // Clear the input
      return;
    }

    setUploadingPic(true);
    const formData = new FormData();
    formData.append("picture", file);
    try {
      const res = await fetch("/api/founder/profile/picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      // Update profile state with new picture
      setProfile((prev) => {
        const updatedProfile = { ...prev, profilePicture: data.profilePicture };

        // Update localStorage with the updated profile
        localStorage.setItem("user", JSON.stringify(updatedProfile));

        // Dispatch events to notify other components
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("profileUpdated"));

        return updatedProfile;
      });
    } catch (err) {
      console.error("Profile picture upload failed:", err);
      // Optionally show error
    } finally {
      setUploadingPic(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <BasicProfileForm
            profile={profile}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
            onProfilePicChange={handleProfilePicChange}
            uploadingPic={uploadingPic}
          />
        );
      case "interest":
        return (
          <InterestForm
            profile={profile}
            onChange={handleChange}
            onCheckboxChange={handleCheckboxChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
          />
        );
      case "social":
        return (
          <SocialLinksForm
            profile={profile}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden">
      {/* Left Tab Menu */}
      <div className="w-full md:w-64 border-r border-purple-100 bg-purple-50">
        {[
          { key: "basic", label: "Basic Profiles" },
          { key: "interest", label: "Areas of Interest" },
          { key: "social", label: "Social & Web Links" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full text-left px-6 py-4 border-l-4 ${
              activeTab === tab.key
                ? "border-purple-600 text-purple-700 font-semibold bg-white"
                : "border-transparent text-gray-700 hover:bg-purple-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right Tab Content */}
      <div className="flex-1 p-6 md:p-8">{renderTabContent()}</div>
    </div>
  );
};

export default UpdateProfile;
