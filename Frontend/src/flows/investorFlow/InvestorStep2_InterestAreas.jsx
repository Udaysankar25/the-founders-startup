import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiArrowRight, FiX } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const lookingForOptions = [
  'Investors',
  'Team members',
  'Mentorship',
  'Product Feedback',
  'Startup Accelerators',
  'Technical Co-founder',
  'Design Partner (UI/UX)',
  'Beta Testers/Early Users',
];

const validationSchema = Yup.object({
  interests: Yup.array().min(1, 'Select at least one interest'),
  skills: Yup.string().required('Expertise is required'),
  lookingFor: Yup.array().min(1, 'Select at least one option'),
});

const InvestorStep2_InterestAreas = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (values) => {
    console.log('Investor Step 2:', values);
    navigate('/investor/onboarding/step-3');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row min-h-[540px]">

        {/* Left Panel */}
        <div
          className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-start items-center p-6 md:p-10 rounded-[24px] lg:rounded-tr-none lg:rounded-br-none"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[20px] p-4 md:p-6 text-center max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Investor Preferences</h2>
            <p className="text-sm md:text-base">
              Fine-tune your interests so we only show you the deals that matter.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[60%] bg-[#FCEEFF] px-6 md:px-10 lg:px-20 py-10 flex justify-center rounded-b-[24px] lg:rounded-r-[24px] lg:rounded-tl-none lg:rounded-bl-none">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#800080] mb-8 text-center">
              Investor Preferences
            </h2>

            <Formik
              initialValues={{
                interests: [],
                skills: '',
                lookingFor: [],
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, errors, touched }) => {
                const addInterest = () => {
                  const clean = inputValue.trim().replace(/^#/, '');
                  if (clean && !values.interests.includes(clean)) {
                    setFieldValue('interests', [...values.interests, clean]);
                  }
                  setInputValue('');
                };

                return (
                  <Form className="space-y-6">
                    {/* Interest Tags */}
                    <div>
                      <label className="block text-[#800080] font-semibold mb-2">Investment Categories</label>
                      <div className="w-full border-2 border-[#800080] rounded-[20px] bg-white px-3 py-2 min-h-[44px] flex flex-wrap gap-2">
                        {values.interests.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 bg-[#F6E6FA] text-[#800080] border border-[#800080] px-3 py-1 rounded-full text-sm"
                          >
                            #{tag}
                            <FiX
                              className="cursor-pointer"
                              onClick={() =>
                                setFieldValue(
                                  'interests',
                                  values.interests.filter((item) => item !== tag)
                                )
                              }
                            />
                          </span>
                        ))}

                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === 'Enter') {
                              e.preventDefault();
                              addInterest();
                            }
                          }}
                          placeholder="#Type interest"
                          className="flex-1 min-w-[100px] outline-none text-sm text-[#800080]"
                        />
                      </div>
                      {errors.interests && touched.interests && (
                        <p className="text-sm text-red-600 mt-1">{errors.interests}</p>
                      )}
                    </div>

                    {/* Expertise */}
                    <div>
                      <label className="block text-[#800080] font-semibold mb-2">Expertise</label>
                      <Field
                        name="skills"
                        placeholder="e.g., VC, Angel Investing, SaaS Strategy"
                        className="w-full border border-[#800080] rounded-[12px] px-4 py-2 text-sm"
                      />
                      {errors.skills && touched.skills && (
                        <p className="text-sm text-red-600 mt-1">{errors.skills}</p>
                      )}
                    </div>

                    {/* Looking For */}
                    <div>
                      <label className="block text-[#800080] font-semibold mb-2">Looking for</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {lookingForOptions.map((option) => (
                          <label
                            key={option}
                            className="inline-flex items-center gap-2 text-sm text-[#800080] font-medium"
                          >
                            <Field
                              type="checkbox"
                              name="lookingFor"
                              value={option}
                              className="accent-[#800080]"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                      {errors.lookingFor && touched.lookingFor && (
                        <p className="text-sm text-red-600 mt-1">{errors.lookingFor}</p>
                      )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-6">
                      <button
                        type="button"
                        onClick={() => navigate('/investor/onboarding/step-1')}
                        className="text-[#800080] font-medium"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#800080] text-white rounded-full font-semibold hover:bg-purple-900"
                      >
                        Next <FiArrowRight />
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorStep2_InterestAreas;
