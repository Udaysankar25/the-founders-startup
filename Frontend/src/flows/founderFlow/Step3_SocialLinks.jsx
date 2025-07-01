import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiArrowRight } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const validationSchema = Yup.object({
  linkedin: Yup.string().url('Invalid URL').nullable(),
  github: Yup.string().url('Invalid URL').nullable(),
  website: Yup.string().url('Invalid URL').nullable(),
});

const Step3_SocialLinks = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const email = localStorage.getItem('signupEmail');
      const step1 = JSON.parse(localStorage.getItem('step1') || '{}');
      const step2 = JSON.parse(localStorage.getItem('step2') || '{}');

      if (!email) {
        alert('❌ Email not found. Please restart signup.');
        return;
      }

      const payload = {
        email,
        profilePicture: step1.profilePicture || null,
        headline: step1.headline || null,
        bio: step1.bio || null,
        interests: step2.interests || [],
        skills: step2.skills || null,
        lookingFor: step2.lookingFor || [],
        linkedin: values.linkedin || null,
        github: values.github || null,
        website: values.website || null,
      };

      const response = await fetch('/api/auth/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      alert('🎉 Account created successfully!');
      localStorage.removeItem('signupEmail');
      localStorage.removeItem('step1');
      localStorage.removeItem('step2');

      navigate('/founder/login');
    } catch (err) {
      alert(`❌ ${err.message}`);
    }
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Social & Web Links</h2>
            <p className="text-sm md:text-base">
              Build your presence. Add LinkedIn, GitHub, or your personal site to show you're real and ready.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-r-[24px] lg:rounded-tl-none lg:rounded-bl-none">
          <div className="w-full max-w-[530px]">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
              Social & Web Links
            </h2>

            <Formik
              initialValues={{ linkedin: '', github: '', website: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-6">
                  {/* LinkedIn */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">LinkedIn</label>
                    <Field
                      name="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      className="input h-[40px]"
                    />
                    <ErrorMessage name="linkedin" component="div" className="text-sm text-red-600 mt-1" />
                  </div>

                  {/* GitHub / Portfolio */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">GitHub / Portfolio</label>
                    <Field
                      name="github"
                      placeholder="https://github.com/username"
                      className="input h-[40px]"
                    />
                    <ErrorMessage name="github" component="div" className="text-sm text-red-600 mt-1" />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-primary font-semibold mb-1">
                      Personal Website <span className="text-gray-600 text-xs">(optional)</span>
                    </label>
                    <Field
                      name="website"
                      placeholder="https://yourwebsite.com"
                      className="input h-[40px]"
                    />
                    <ErrorMessage name="website" component="div" className="text-sm text-red-600 mt-1" />
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    <button
                      type="button"
                      onClick={() => navigate('/founder/onboarding/step-2')}
                      className="text-purple-700 font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-primary/90"
                    >
                      Get Started <FiArrowRight />
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

export default Step3_SocialLinks;
