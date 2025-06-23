import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiArrowRight, FiEdit2, FiUser } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const validationSchema = Yup.object({
  headline: Yup.string().required('Headline is required'),
  bio: Yup.string().max(250, 'Maximum 250 characters').required('Bio is required'),
});

const Step1_ProfileBasics = () => {
  const navigate = useNavigate();
  const [profilePreview, setProfilePreview] = useState(null);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
      setFieldValue('profilePicture', file);
    }
  };

  const handleSubmit = (values) => {
    console.log('Step 1 Data:', values);
    navigate('/founder/onboarding/step-2');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">
        {/* Left Panel */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-start items-center p-6 md:p-10 
          rounded-[24px] lg:rounded-tr-none lg:rounded-br-none"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Profile Basics</h2>
            <p className="text-sm md:text-base">
              Let others know who you are. Add your name, a short bio, and what drives your mission.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-r-[24px] lg:rounded-tl-none lg:rounded-bl-none">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center flex items-center justify-center gap-2">
              Profile Basics
            </h2>

            <Formik
              initialValues={{
                profilePicture: null,
                headline: '',
                bio: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-6">
                  {/* Profile Picture Upload */}
                  <div className="text-center">
                    <label
                      title="Upload profile photo"
                      className="relative w-24 h-24 mx-auto rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-4xl overflow-hidden cursor-pointer border-2 border-primary"
                    >
                      {profilePreview ? (
                        <img
                          src={profilePreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <FiUser className="text-5xl" />
                      )}
                      <FiEdit2 className="absolute -top-2 -right-2 bg-white border border-purple-300 rounded-full p-[3px] text-primary text-sm shadow-md" />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                      />
                    </label>
                  </div>

                  {/* Headline */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">Headline</label>
                    <Field
                      name="headline"
                      placeholder='e.g., "AI Engineer | Building EdTech Solutions"'
                      className="input h-[40px]"
                    />
                    <ErrorMessage name="headline" component="div" className="text-sm text-red-600 mt-1" />
                  </div>

                  {/* Short Bio */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">
                      Short Bio <span className="text-gray-600 text-xs">(max 250 characters)</span>
                    </label>
                    <Field
                      as="textarea"
                      name="bio"
                      rows="3"
                      className="input"
                    />
                    <ErrorMessage name="bio" component="div" className="text-sm text-red-600 mt-1" />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => navigate('/founder/account-setup')}
                      className="text-purple-700 font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90"
                    >
                      Next <FiArrowRight />
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1_ProfileBasics;
