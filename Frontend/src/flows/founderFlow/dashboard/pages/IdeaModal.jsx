import React, { useState, useRef } from "react";
import { FiFileText, FiVideo, FiImage } from "react-icons/fi";

const IdeaModal = ({ isOpen, onClose, onPost }) => {
  // All hooks at the top level
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [funding, setFunding] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [files, setFiles] = useState({ pitch: null, video: null, image: null });
  const [showFunding, setShowFunding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pitchRef = useRef(null);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  // Conditional rendering after hooks
  if (!isOpen) return null;

  const handleAddTag = () => {
    const trimmed = inputTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputTag("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      alert(
        `File too large. Maximum size is 50MB. Selected file: ${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB`
      );
      e.target.value = ""; // Clear the input
      return;
    }

    const isValid = {
      pitch: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      video: ["video/mp4", "video/webm", "video/ogg"],
      image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    };

    if (!isValid[type]?.includes(file.type)) {
      alert(
        `Please upload a valid ${type === "pitch" ? "PDF or DOC" : type} file.`
      );
      e.target.value = ""; // Clear the input
      return;
    }

    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!title.trim()) {
        throw new Error("Title is required");
      }
      if (!descr.trim()) {
        throw new Error("Description is required");
      }

      // Upload files first
      let coverImagePath = null;
      let pitchDeckPath = null;
      let videoPath = null;

      // Upload cover image if selected
      if (files.image) {
        const imageFormData = new FormData();
        imageFormData.append("file", files.image);

        const imageResponse = await fetch("/api/ideas/upload/cover", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: imageFormData,
        });

        const imageData = await imageResponse.json();
        if (!imageResponse.ok) {
          throw new Error(imageData.message || "Failed to upload image");
        }
        coverImagePath = imageData.filePath;
      }

      // Upload pitch deck if selected
      if (files.pitch) {
        const pitchFormData = new FormData();
        pitchFormData.append("file", files.pitch);

        const pitchResponse = await fetch("/api/ideas/upload/pitch", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: pitchFormData,
        });

        const pitchData = await pitchResponse.json();
        if (!pitchResponse.ok) {
          throw new Error(pitchData.message || "Failed to upload pitch deck");
        }
        pitchDeckPath = pitchData.filePath;
      }

      // Upload video if selected
      if (files.video) {
        const videoFormData = new FormData();
        videoFormData.append("file", files.video);

        const videoResponse = await fetch("/api/ideas/upload/video", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: videoFormData,
        });

        const videoData = await videoResponse.json();
        if (!videoResponse.ok) {
          throw new Error(videoData.message || "Failed to upload video");
        }
        videoPath = videoData.filePath;
      }

      const ideaData = {
        title: title.trim(),
        description: descr.trim(),
        funding: showFunding && funding ? parseFloat(funding) : null,
        tags: tags,
        coverImage: coverImagePath,
        pitchDeck: pitchDeckPath,
        video: videoPath,
      };

      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(ideaData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create idea");
      }

      // Call the onPost callback with the created idea
      if (onPost) {
        onPost(data.idea);
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl border border-purple-200 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-purple-600 text-lg font-bold hover:text-purple-800"
        >
          &times;
        </button>
        <h2 className="text-center text-2xl font-bold text-primary mb-6">
          Share your Startup Idea
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-primary text-sm"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block font-semibold mb-1">Idea Title</label>
            <input
              type="text"
              className="input text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows={4}
              className="input text-black"
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Funding Goal</label>
            <input
              type="text"
              className="input text-black"
              value={funding}
              onChange={(e) => setFunding(e.target.value)}
            />
            <label className="flex items-center gap-2 mt-2 text-xs">
              <input
                type="checkbox"
                checked={showFunding}
                onChange={(e) => setShowFunding(e.target.checked)}
                className="accent-purple-600"
              />
              Display funding goals publicly
            </label>
          </div>

          <div>
            <label className="block font-semibold mb-1">Add Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                className="flex-1 px-3 py-1 rounded-full border border-purple-200 text-xs outline-none text-black"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="text-xs px-3 py-1 rounded-full bg-purple-100 text-primary font-semibold"
              >
                + Add
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-purple-100 text-primary px-3 py-1 text-xs rounded-full font-medium flex items-center gap-2"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-[10px] text-purple-600 hover:text-purple-900"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Attachments</label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => pitchRef.current.click()}
                className="flex items-center gap-2 border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50"
              >
                <FiFileText /> Upload Pitch Deck
              </button>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={pitchRef}
                onChange={(e) => handleFileSelect(e, "pitch")}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => videoRef.current.click()}
                className="flex items-center gap-2 border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50"
              >
                <FiVideo /> Upload Demo Video
              </button>
              <input
                type="file"
                accept="video/*"
                ref={videoRef}
                onChange={(e) => handleFileSelect(e, "video")}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => imageRef.current.click()}
                className="flex items-center gap-2 border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50"
              >
                <FiImage /> Upload Image
              </button>
              <input
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={(e) => handleFileSelect(e, "image")}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Posting..." : "Post Idea"}
            </button>
            <button
              type="button"
              className="border-2 border-purple-300 px-6 py-2 rounded-full font-semibold text-primary"
            >
              Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaModal;
