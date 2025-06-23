import React, { useState, useRef } from 'react';
import { FiFileText, FiVideo, FiImage } from 'react-icons/fi';

const IdeaModal = ({ onClose, onPost }) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [funding, setFunding] = useState('');
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [files, setFiles] = useState({ pitch: null, video: null, image: null });
  const [showFunding, setShowFunding] = useState(false);


  const pitchRef = useRef(null);
  const videoRef = useRef(null);
  const imageRef = useRef(null);

  const handleAddTag = () => {
    const trimmed = inputTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputTag('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValid = {
      pitch: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      video: ['video/mp4', 'video/webm', 'video/ogg'],
      image: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
    };

    if (!isValid[type]?.includes(file.type)) {
      alert(`Please upload a valid ${type === 'pitch' ? 'PDF or DOC' : type} file.`);
      return;
    }

    setFiles(prev => ({ ...prev, [type]: file }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const imageUrl = files.image ? URL.createObjectURL(files.image) : null;

 const idea = {
  title,
  description: descr,
  funding: showFunding ? funding : null, // ✅ Only send if checkbox is checked
  tags,
  image: imageUrl,
  createdAt: new Date().toISOString(),
  author: "You"
};


  onPost(idea); // send to HomePage
  onClose();
};


  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl border border-purple-200 relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-purple-600 text-lg font-bold hover:text-purple-800">&times;</button>
        <h2 className="text-center text-2xl font-bold text-primary mb-6">Share your Startup Idea</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-primary text-sm">
          <div>
            <label className="block font-semibold mb-1">Idea Title</label>
            <input
              type="text"
              placeholder="Enter your startup name or concept"
              className="input text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your idea..."
              className="input text-black"
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Funding Goal</label>
            <input
              type="text"
              placeholder="₹"
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

          {/* Tags */}
          <div>
            <label className="block font-semibold mb-1">Add Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                placeholder="e.g. FinTech"
                className="flex-1 px-3 py-1 rounded-full border border-purple-200 text-xs outline-none text-black"
              />
              <button type="button" onClick={handleAddTag} className="text-xs px-3 py-1 rounded-full bg-purple-100 text-primary font-semibold">+ Add</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, i) => (
                <span key={i} className="bg-purple-100 text-primary px-3 py-1 text-xs rounded-full font-medium flex items-center gap-2">
                  #{tag}
                  <button onClick={() => handleRemoveTag(tag)} className="text-[10px] text-purple-600 hover:text-purple-900">&times;</button>
                </span>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block font-semibold mb-1">Attachments</label>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => pitchRef.current.click()} className="flex items-center gap-2 border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50">
                <FiFileText /> Upload Pitch Deck
              </button>
              <input type="file" accept=".pdf,.doc,.docx" ref={pitchRef} onChange={(e) => handleFileSelect(e, 'pitch')} className="hidden" />

              <button type="button" onClick={() => videoRef.current.click()} className="flex items-center gap-2 border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50">
                <FiVideo /> Upload Demo Video
              </button>
              <input type="file" accept="video/*" ref={videoRef} onChange={(e) => handleFileSelect(e, 'video')} className="hidden" />

              <button type="button" onClick={() => imageRef.current.click()} className="flex items-center gap-2 border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50">
                <FiImage /> Upload Image
              </button>
              <input type="file" accept="image/*" ref={imageRef} onChange={(e) => handleFileSelect(e, 'image')} className="hidden" />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between pt-4">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full font-semibold">
              Post Idea
            </button>
            <button type="button" className="border-2 border-purple-300 px-6 py-2 rounded-full font-semibold text-primary">
              Preview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaModal;
