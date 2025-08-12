// src/flows/investorFlow/AccountSetupInvestor.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiArrowRight } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const validationSchema = Yup.object({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
  privacy: Yup.string().oneOf(['public', 'private']).required('Privacy is required'),
});

const AccountSetupInvestor = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Investor Basic Info:', values);
    navigate('/investor/onboarding/step-1');
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="w-full max-w-[1200px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row font-sans min-h-[660px] lg:min-h-[700px] transition-all duration-300">
        {/* Left */}
        <div
          className="w-full lg:w-1/2 bg-cover bg-center text-white flex flex-col justify-start items-center p-6 md:p-10"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[24px] p-4 md:p-6 text-center max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Investor Setup</h2>
            <p className="text-sm md:text-base">
              Begin your journey as an investor. Tell us how you'd like to discover the best ideas.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 bg-[#f4eaff] px-6 md:px-10 lg:px-20 py-12 flex justify-center">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">Account Setup</h2>

            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                privacy: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-primary font-semibold">Full Name</label>
                  <Field name="name" className="w-full h-[40px] px-4 border border-primary rounded-xl2" />
                  <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-primary font-semibold">Email</label>
                  <Field name="email" type="email" className="w-full h-[40px] px-4 border border-primary rounded-xl2" />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-primary font-semibold">Password</label>
                  <Field name="password" type="password" className="w-full h-[40px] px-4 border border-primary rounded-xl2" />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Privacy */}
                <div>
                  <label className="block text-primary font-semibold">Account Privacy</label>
                  <Field as="select" name="privacy" className="w-full h-[40px] px-4 border border-primary rounded-xl2">
                    <option value="">Select Privacy</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Field>
                  <ErrorMessage name="privacy" component="div" className="text-red-600 text-sm" />
                </div>

                {/* Submit */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90"
                  >
                    Next <FiArrowRight className="text-lg" />
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupInvestor;
