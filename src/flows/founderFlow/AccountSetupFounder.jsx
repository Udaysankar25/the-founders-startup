import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid e-mail').required('E-mail is required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  privacy: Yup.string().oneOf(['public', 'private'], 'Select privacy').required('Privacy is required'),
});

const AccountSetupFounder = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = (values) => {
    console.log('Founder Setup Submitted:', values);
    navigate('/founder/onboarding/step-1');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-[1000px] bg-white rounded-[24px] shadow-lg flex flex-col lg:flex-row font-sans min-h-[600px] transition-all duration-300">
        {/* Left Side */}
        <div className="w-full lg:w-[40%] bg-cover bg-center text-white flex flex-col justify-start items-center p-6 md:p-10 
           rounded-[24px] lg:rounded-tr-none lg:rounded-br-none"


          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="bg-white/10 border border-white/30 rounded-[24px] p-4 md:p-6 text-center max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Account Setup</h2>
            <p className="text-sm md:text-base">
              Start your journey—create your founder profile and begin building bold ideas.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
           rounded-b-[24px] lg:rounded-r-[24px] lg:rounded-tl-none lg:rounded-bl-none">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">Account Setup</h2>

            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                privacy: '',
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values }) => (
                <Form className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">Name</label>
                    <Field name="name" className="input h-[40px]" />
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">E-mail</label>
                    <Field name="email" type="email" className="input h-[40px]" />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">Password</label>
                    <div className="relative">
                      <Field
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className="input h-[40px] pr-10"
                      />
                      {values.password && (
                        <span
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                      )}
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Privacy */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">Account Privacy</label>

                    {/* Radio on desktop */}
                    <div className="hidden sm:flex gap-6 mt-1">
                      <label className="flex items-center gap-2 text-sm">
                        <Field type="radio" name="privacy" value="public" />
                        Public
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <Field type="radio" name="privacy" value="private" />
                        Private
                      </label>
                    </div>

                    {/* Select on mobile */}
                    <div className="sm:hidden mt-1">
                      <Field as="select" name="privacy" className="input h-[40px]">
                        <option value="">Select privacy</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </Field>
                    </div>

                    <ErrorMessage name="privacy" component="div" className="text-red-600 text-sm" />
                  </div>

                  {/* Submit */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90"
                    >
                      Next <FiArrowRight className="text-lg" />
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

export default AccountSetupFounder;
