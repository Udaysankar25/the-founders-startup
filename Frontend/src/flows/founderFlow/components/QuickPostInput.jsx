import React, { useState } from 'react';
import { FiMic, FiVideo, FiImage, FiPlus } from 'react-icons/fi';
import IdeaModal from '../dashboard/pages/IdeaModal';

const QuickPostInput = ({ onPost }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="bg-white p-5 rounded-2xl shadow-md border border-purple-200">
        <div
          onClick={openModal}
          className="flex items-center gap-3 cursor-pointer hover:bg-purple-50 transition-colors border border-purple-300 rounded-full px-4 py-2"
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-purple-400"
          />
          <span className="text-purple-700 text-sm flex items-center gap-2">
            <FiPlus className="text-lg" /> Post your ideas!
          </span>
        </div>

        <div className="flex justify-between mt-6 px-6 text-sm text-purple-700">
          <button className="flex items-center gap-2 hover:text-purple-900 transition-colors">
            <FiMic /> Audio
          </button>
          <button className="flex items-center gap-2 hover:text-purple-900 transition-colors">
            <FiVideo /> Video
          </button>
          <button className="flex items-center gap-2 hover:text-purple-900 transition-colors">
            <FiImage /> Image
          </button>
        </div>
      </div>

      {showModal && <IdeaModal onClose={closeModal} onPost={onPost} />}
    </>
  );
};

export default QuickPostInput;
