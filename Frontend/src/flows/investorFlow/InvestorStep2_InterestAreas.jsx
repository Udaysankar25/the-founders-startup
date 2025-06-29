import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiArrowRight } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const interestOptions = ['AI', 'EdTech', 'Health'];
const lookingForOptions = [
  'Founders',
  'Co-Investors',
  'Mentorship Opportunities',
  'Product Demo Access',
  'Early-Stage Startups',
];

const validationSchema = Yup.object({
  interests: Yup.array().min(1, 'Select at least one interest'),
  skills: Yup.string().required('Skills are required'),
  lookingFor: Yup.array().min(1, 'Select at least one option'),
});

const InvestorStep2_InterestAreas = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Investor Step 2:', values);
    navigate('/investor/onboarding/step-3');
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Investor Interests</h2>
            <p className="text-sm md:text-base">
              Choose your areas of investment interest to discover aligned opportunities.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-r-[24px] lg:rounded-tl-none lg:rounded-bl-none">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#800080] mb-8 text-center">
              Investment Interests
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
              {({ values, setFieldValue, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Interests */}
                  <div>
                    <label className="block text-[#800080] font-semibold mb-2">Interest Areas</label>
                    <div className="w-full border-2 border-[#800080] rounded-[20px] bg-white px-3 py-2 min-h-[44px] flex flex-wrap gap-2">
                      {interestOptions.map((tag) => (
                        <button
                          type="button"
                          key={tag}
                          className={`px-3 py-1 rounded-full text-sm border transition-all ${
                            values.interests.includes(tag)
                              ? 'bg-purple-100 text-[#800080] border-[#800080]'
                              : 'bg-transparent text-[#800080] border-transparent'
                          }`}
                          onClick={() => {
                            const isActive = values.interests.includes(tag);
                            const newValues = isActive
                              ? values.interests.filter((item) => item !== tag)
                              : [...values.interests, tag];
                            setFieldValue('interests', newValues);
                          }}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                    {errors.interests && touched.interests && (
                      <p className="text-sm text-red-600 mt-1">{errors.interests}</p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-[#800080] font-semibold mb-2">Expertise</label>
                    <Field
                      name="skills"
                      placeholder="e.g., VC, Angel Investing, SaaS Strategy"
                      className="input h-[40px] border border-[#800080]"
                    />
                    {errors.skills && touched.skills && (
                      <p className="text-sm text-red-600 mt-1">{errors.skills}</p>
                    )}
                  </div>

                  {/* Looking For */}
                  <div>
                    <label className="block text-[#800080] font-semibold mb-2">Looking to Connect With</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {lookingForOptions.map((option) => (
                        <label key={option} className="inline-flex items-center gap-2 text-sm text-[#800080] font-medium">
                          <Field type="checkbox" name="lookingFor" value={option} />
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
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorStep2_InterestAreas;
