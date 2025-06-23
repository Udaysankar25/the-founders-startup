// components/IdeaModal.jsx
import React from 'react';

const IdeaModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl animate-fade-in-up shadow-xl border border-purple-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-purple-600 text-lg font-bold hover:text-purple-800"
        >
          &times;
        </button>

        {/* Modal Heading */}
        <h2 className="text-center text-2xl font-bold text-primary mb-6">
          Share your Startup Idea
        </h2>

        {/* Form Start */}
        <form className="space-y-4 text-primary text-sm">
          <div>
            <label className="block font-semibold mb-1">Idea Title</label>
            <input
              type="text"
              placeholder="Enter your startup name or concept"
              className="input"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your idea, goals, and the problem it solves"
              className="input"
            />
            <p className="text-xs mt-1 text-gray-500">0/10000</p>
          </div>

          <div>
            <label className="block font-semibold mb-1">Funding Goal</label>
            <input
              type="text"
              placeholder="₹"
              className="input"
            />
            <label className="flex items-center gap-2 mt-2 text-xs">
              <input type="checkbox" />
              Display funding goals publicly
            </label>
          </div>

          <div>
            <label className="block font-semibold mb-1">Add Tags</label>
            <div className="flex gap-2 flex-wrap">
              {['AI', 'EdTech', 'Health'].map(tag => (
                <span
                  key={tag}
                  className="bg-purple-100 text-primary px-3 py-1 text-xs rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Attachments</label>
            <div className="flex gap-3 flex-wrap">
              <button type="button" className="border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50">
                📄 Upload Pitch Deck
              </button>
              <button type="button" className="border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50">
                📹 Upload Demo Video
              </button>
              <button type="button" className="border-2 border-purple-200 px-4 py-2 rounded-full text-xs font-medium hover:bg-purple-50">
                🖼️ Upload Image
              </button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-4 justify-between pt-4">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full font-semibold">
              Post Idea
            </button>
            <button type="button" className="border-2 border-purple-300 px-6 py-2 rounded-full font-semibold text-primary">
              Save as draft
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
