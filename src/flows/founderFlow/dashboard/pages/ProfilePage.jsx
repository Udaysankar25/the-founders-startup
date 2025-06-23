import React, { useState, useRef } from 'react';

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [bgImage, setBgImage] = useState(null);
  const avatarInputRef = useRef();
  const bgInputRef = useRef();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleBgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage(url);
    }
  };

  const mockIdeas = [
    {
      title: 'Pitch Deck AI – Automate your Investor Decks',
      description: 'An AI tool that helps founders auto-generate pitch decks tailored to investors.',
      tags: ['AI', 'StartupTools', 'PitchReady'],
      timeAgo: '2 hours ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEyFJe21gTuIRWSG9GFUkAfKZinNITpLtldQ&s',
      user: {
        name: 'Anna Clark',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwZ4x8MnwdIGWxzXOeo9VROZLVAqiYY2-MQ&s',
      },
    },
    {
      title: 'CoFounder Connect',
      description: 'Find and match with cofounders who share your vision and complement your skills.',
      tags: ['Networking', 'Founders', 'Matching'],
      timeAgo: '3 days ago',
      coverImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBhUSBw8VFRIXFhARFRcVEhAVFhYSFhUXGBUbFxgbKDQgHxoxHBoaITMiJSorMi4uFx8zODUsNygtOiwBCgoKDg0OGhAQGDcdHSUtLi0tLS8uNy0tLS0tLS0tLS0tLS0vLS0tLS0tLS0rLS0rLS0tLS0tLS0tLS0tLS0tK//AABEIAKgBKwMBEQACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHBAMBAv/EAEUQAAIBAQQECgUJBQkAAAAAAAABAgMEBQYREiExYwcTFiJBUXGRk+FhcoGxshQjMlJzkqGiwTZCU2LCFSYzNUSCo9HS/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAMEBQIB/8QAKREBAAIBAgUDBAMBAAAAAAAAAAECAwQRExQhMfASMnEiM0GBUVJhI//aAAwDAQACEQMRAD8Amy4xgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOvy+aNyWPjLW9uqMV9Kcupf99Bze0VjqlxYrZJ2hn9TH9tla9KnGmofUcW1l6Zbc/Tq7CtxrbtCNFj22/K34dxdZ75ahP5ut9STWUn/ACS6ezUyamWLKebS2x9e8LESqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU7EGOqVim4XXFVZrU5N/Np+zXL2ZL0kN80R0hdxaObdbdFNtuKbdbZPjLTKK6qfzaX3dfe2QTktP5Xa6fHXtDwo4gttH/DtdX2zlL4jyL2j8upw4571dMcW3jHZape2FJ++J7xb/wAuOWxf1frlheL/ANU/Dof+Rxb/AMnLYv4ebxXeEttqn7FTXuQ4tv5e8vi/q8pYjt0ttrq+ybXuPOJb+XvAx/1cVrtlW21FK2VZza1JzlKTS26szmZme6Sta16RGzwPHp0gWy6ceWqxqMbbGNWCSWbzjUy9bY32rX1k1c0x36qmTR0t1r0lod0XpRvixqpYpZx2NPVKMulSXQyzW0WjeGdkx2pO1nadIwAAAAAAAAAAAAAAAAAAAAAAAAAAAGe4/wASOVV2SwyyitVaS6X9RPq6+vZ151suT8Q0dJg6eu36UUrr4AAAAAAAAAAAJnCd8u5b3jKT+anlCqujRz1S7U3n2Z9ZJjt6ZQ6jFxKbflsZdYoAAAAAAAAAAAAAAAAAAAAAAAAAAEBinE1O4qGjHnV5JuEV0dUp9Sz6OnLtyjyZIqsYME5J3/DI5Sc5Nzebbbbe1t622UmxEbdnwAAAAAAAAAAAAAGxYOtzt+HKUpvOSXFS684PRzfsSftL2Od6sbU09OSYTR2gAAAAAAAAAAAAAAAAAAAAAAAADmvG1qwXfUq1FmoQlPLryWeX6Hlp2jd1SvqtFWRWy77ZbrHK3WmGlCcm5SzXXo56O3Qz5q7ClaLT9TZrelZ4cd0ScJQAAAAAAAAAAAetmoStVphTo5aU5QpxzaS0pSUVm3sWb2nom8W4Nt2Ea8Y3vCOjP6FSnJypyfTHSaTUvQ0vRmJjZ5Ft1m4LrRpXfWp5/RqRn7Jxy98GWcE9Nmdrq/VErsTqIAAAAAAAAAAAAAAAAAAAAAAAAVvhCtHEYWqZP6UqcPzKT/CLIs0/StaON8sOipdjlgz5PTXO+TqC9dQzX5j30/Rs5jJ/29X+sfTzRSbAAAAAAAAAAksOXdC9r4hQrylFTVTXHLNOMJSW3o1HdK+qdkebJNKeqFwsPB78nvCE69oU6cZRm48U05ZPNJ62susmjBtPdTvrd67RCLxthX+zpOvYI/MN86P8Nv8Ao92zZkc5ce3WEmm1Hrj0W7tBwPiejie51dGOY/OTpw4mc3k61NrOm9J7Ky6H05deefHym3iesOa5MAW3Cd9V1ourZpRi6dWOTb0ZPJTgtallJ9GWraSYp2lX1cTasbJbY9ZZZoAAAAAAAAAAAAAAAAAAAAAAAAU3hMfGXfQp/XrJfla/qIc3aF3RR9Vp/wAW20z4iyykv3YyfcmyWekKletoYPH6Osz28+gAAAAAAAAJrBctHFND1pLvpzRJi90IdTH/ACs2IusV+akFUg41Emmmmms009qa6g9idlF4ULElRo1oLJpui8urJyh3NPvK+eO0r+hv1ms/Lv4M8c3nO8nQtNqlVpRpSlFVVGbTjKCXPfPepvazjFHqnaU2pt6K7wvt5XvO8Y/Pwpp/WjDKXZm+gs1pszr5Zv3hHnSIAAAAAAAAAAAAAAAAAAAAAAAUrHbdW/rBTXTVzy7alJL3Mgy94he0vSl5We/anFXJXl1Ua77oSJb9pVcUfXHyxFbCg3QPAAA2AdFisVa31NGw0pVHs5sW0u17F7T2KzPZza9a952TttwdWu6452i3zipR0Mqcec+dOMedLZ07Fn2kk4piu8oK6mt7xWqtESyASuFHliWz/aR9zO8fuhFn+3b4bOXmIAVHhM/yCP20PhmQZ/auaL7n6V7gzX94ZfY1PjpkeD3LOt+3Hy08tsoAAAAAAAAAAAAAAAAAAAAAAAAIi0XP8qxJC012tGlT0acdefGNyzk+jLJrL09hxNd7bpoy7Y5pH5fcVz4vDVoe6mu9ZfqMntk08b5K/LGSi2gAk2+as3sS630AapYMDWKlZ4/K6bnU0Y6bdSok5Zc7UnllmXIw126sq+ryTM7T0Stnw9YrM86NlpJrY3CMn3y1nUUrH4Q2z5Ld7JKMVGOUVkupbDtHuhMbLPCtf1YPuqRZHl9kp9N92rHyk2HXeNj+Run/AD0aNb76bOrV2c0t6t/nZ14S/aaz5/xF7me4/dDjP9u3w2YvMQAqXCZ+z8ftofDMgz+1c0X3P0geDCOd9VH1Un+M4nGD3LGt9kfLSy0ywAAAAAAAAAAAAAAAAAAAAAAAAAV3H9bisLVP5nSh3zi3+CZFm9qzpI3ywyenTlVqKNJZyk1GKXTJvJLvKkdWvM7RvK34uwxG6LhoTo65xehVkv3nPXn2KS0V6GibJj9NYU9PqJyZJif0r2HqXHX9Qi9jrUu5ST/Qip7oWMs7UtP+NsL7DAAELjN5YWr5/US75RSI8vtlPpvu1Y5LUik2lqx1ZlQVkcemzU6f3MmviJssbbfCppbb+r5Q2HanFX/Z3vqS75JfqR090Jssb47R/jbC+wwCrcI8NLDTa6KlJ++P6kWb2rejn/p+kDwWxzvKs+qnBd8vIjwd5WNdP0xH+tHLLMAAAAAAAAAAAAAAAAAAAAAAAAABQ+FK2NUqNGOxudWX+3KMfil3FfPPaGhoa97K1gulx2KaCexSlL7sJNfikRYvdC1qZ2xSvfCI/wC68/Xo/Gixm9rP0f3Wa3NalYr3o1Kn0YVKcpeqpLS/DMq1na0S08lfVSYbenmtRfYT6AAr2PpaOFKvpdFf8sCPN7JWdJ92GRz+i+xlJsL1wkUcrHZJdUZw/LTf6FjN2hQ0c9bQpdlq8RaoT+rOEvuyT/Qgjuu2jeJbu9uo0GCB4jsQ2D+07lq0ltlF6Prx50PzJHN43rMJcN/ReJUngtqZXhWi9rpwl92Tz+Igwd5XddH01lo5ZZoAAAAAAAAAAAAFV5fWDe+H5kXGqt8lk8k5fWDe+H5jjVOSyeScvrBvfD8xxqnJZPJOX1g3vh+Y41TksnknL6wb3w/McapyWTyTl9YN74fmONU5LJ5Jy+sG98PzHGqclk8k5fWDe+H5jjVOSyeScvrBvfD8xxqnJZPJOX1g3vh+Y41TksnknL6wb3w/McapyWRTMZ3zTvq9YzseloRpxhzlk9LSk3q9qK+W8Wnou6bFOOu0uTDN4Quq/Kda0Z6EdPSyWbycJLUu1o8pb023d5qTek1hZsWYrsl73JKlZeM03KnJaUMlzZJvXn1ZkuTJW1doVtPpr47+qVFK68vWFsa0rDdipXrptw5sJRjpZw6E/StnZkWceaIjaVDPpJtb1UTHL6wb3w/M741UPJZPJOX1g3vh+Y41TksnkojFeLbLe1xzo2TT026bWlDJZRmm9efUjjJlia7Qmwaa9L+qVDks46isvrfjLEVmvm7aULHp6cJpvShkstBp5PtyJsl4tEbKmnwWx2mZ/KoSWcSFbahQx7Yo0Iqpxuloxzyp9OWvpLcZq7MudHk36P3y+sG98PzPeNV5yWTyTl/YN74fmONU5LJ5Ko3LfVC68WVK8NLiJ8clzecozektXrJLsIK3iL7/AIXMmK18UV/K3cvrBvfD8yfjVU+SyeScvrBvfD8xxqnJZPJOX1g3vh+Y41TksnknL6wb3w/McapyWTyTl9YN74fmONU5LJ5Jy+sG98PzHGqclk8k5fWDe+H5jjVOSyeScvrBvfD8xxqnJZPJOX1g3vh+Y41TksnknL6wb3w/McapyWTyTl9YN74fmONU5LJ5Jy+sG98PzHGqclk8llpTaoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//2Q==',
      user: {
        name: 'Anna Clark',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUT8AUnmycKnS1gZjEb7XTCx-mDAB_zGrrSQ&s',
      },
    },
    {
      title: 'Startup Idea Vault',
      description: 'A secure vault for founders to document, timestamp, and validate their ideas.',
      tags: ['Security', 'StartupTools'],
      timeAgo: '1 week ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4c1y_7gy2crn2Ll_ZSWzcqb0WDZFuBnFTeQ&s',
      user: {
        name: 'Anna Clark',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_O_FmLwtxhqhCfThJBk3_aZR1Vl6r1NCGA&s',
      },
    },
     {
      title: 'Pitch Deck AI – Automate your Investor Decks',
      description: 'An AI tool that helps founders auto-generate pitch decks tailored to investors.',
      tags: ['AI', 'StartupTools', 'PitchReady'],
      timeAgo: '2 hours ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJa4_mV1FWFgxgQUzBNHrD7ROTf7hoJdzvg&s',
      user: {
        name: 'Anna Clark',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUT8AUnmycKnS1gZjEb7XTCx-mDAB_zGrrSQ&s',
      },
    },
    {
      title: 'CoFounder Connect',
      description: 'Find and match with cofounders who share your vision and complement your skills.',
      tags: ['Networking', 'Founders', 'Matching'],
      timeAgo: '3 days ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUIAcXgRaNDVvwWAkLcM5twP2KbyCMjPaqg&s',
      user: {
        name: 'Anna Clark',
        avatar: '/images/anna.jpg',
      },
    },
    {
      title: 'Startup Idea Vault',
      description: 'A secure vault for founders to document, timestamp, and validate their ideas.',
      tags: ['Security', 'StartupTools'],
      timeAgo: '1 week ago',
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRq1ZxF9BO4pzpRRhRBOmLIN_kj5yFlU6ZHA&s',
      user: {
        name: 'Anna Clark',
        avatar: '/images/anna.jpg',
      },
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans space-y-8">

      {/* Header Card */}
      <div className="rounded-xl shadow-md bg-white overflow-hidden">
        <div
          className="relative min-h-[220px] flex items-end text-white bg-cover bg-center"
          style={{
            backgroundImage: bgImage
              ? `url(${bgImage})`
              : 'linear-gradient(to right, #fb923c, #8b5cf6)',
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

          <button
            onClick={() => bgInputRef.current.click()}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full shadow transition duration-200"
            title="Change background image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h2l2-3h10l2 3h2a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2zm9 4a3 3 0 100 6 3 3 0 000-6z"
              />
            </svg>
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleBgChange}
            ref={bgInputRef}
            className="hidden"
          />

          <div className="relative z-10 w-full flex items-end gap-6 p-6 sm:p-8">
            <label htmlFor="avatar-upload" className="cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md group-hover:shadow-xl transition">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14a4 4 0 100-8 4 4 0 000 8zm0 2c-3.315 0-6 2.239-6 5v1h12v-1c0-2.761-2.685-5-6-5z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                ref={avatarInputRef}
                className="hidden"
              />
            </label>

            <div className="flex-1">
              <h2 className="text-2xl font-semibold leading-tight">Anna Clark</h2>
              <p className="italic text-sm text-gray-200 mt-1">“Turning ideas into impact”</p>
              <div className="flex gap-6 mt-4 text-sm">
                <div>
                  <span className="block font-semibold text-white text-lg">12</span>
                  <span className="text-gray-300">Ideas</span>
                </div>
                <div>
                  <span className="block font-semibold text-white text-lg">3</span>
                  <span className="text-gray-300">Teams</span>
                </div>
                <div>
                  <span className="block font-semibold text-white text-lg">5</span>
                  <span className="text-gray-300">Startups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Section */}
      <div className="rounded-xl shadow-md bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Your Ideas</h3>
            <p className="text-sm text-gray-500">All the concepts you're nurturing</p>
          </div>
          <button
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-purple-700 hover:scale-[1.02] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Idea
          </button>
        </div>

        {/* Scrollable Idea Cards */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scroll-snap-x snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="hide-scrollbar flex gap-4">
            {mockIdeas.map((idea, idx) => (
              <div
                key={idx}
                className="min-w-[300px] max-w-xs bg-gray-50 rounded-xl shadow hover:shadow-lg transition snap-start flex-shrink-0 flex flex-col"
              >
                <div className="h-40 overflow-hidden rounded-t-xl">
                  <img
                    src={idea.coverImage}
                    alt="Idea"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex flex-col h-full">
                  <div className="mb-2 flex items-center gap-3">
                    <img
                      src={idea.user.avatar}
                      alt={idea.user.name}
                      className="w-8 h-8 rounded-full border"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{idea.user.name}</div>
                      <div className="text-xs text-gray-500">{idea.timeAgo}</div>
                    </div>
                  </div>

                  <h4 className="font-semibold text-base text-gray-900 mb-1">{idea.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{idea.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto mb-3">
                    {idea.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs shadow-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-gray-400 text-lg pt-3 border-t">
                    <button className="hover:text-red-500 transition" title="Like">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                      </svg>
                    </button>
                    <button className="hover:text-blue-500 transition" title="Comment">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-6 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12l4-4z" />
                      </svg>
                    </button>
                    <button className="hover:text-green-500 transition" title="Share">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 100-6 3 3 0 000 6zM9 14a3 3 0 100-6 3 3 0 000 6zm6 6a3 3 0 100-6 3 3 0 000 6zM10.5 13.5l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
