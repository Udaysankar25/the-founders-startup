import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FiArrowRight } from 'react-icons/fi';
import bg from '../../assets/images/bg-auth.png';

const interestOptions = ['AI', 'EdTech', 'Health'];
const lookingForOptions = [
    'Investors',
    'Startup Accelerators',
    'Team members',
    'Technical Co-founder',
    'Mentorship',
    'Design Partner (UI/UX)',
    'Product Feedback',
    'Beta Testers/Early Users',
];

const validationSchema = Yup.object({
    interests: Yup.array().min(1, 'Select at least one interest'),
    skills: Yup.string().required('Skills are required'),
    lookingFor: Yup.array().min(1, 'Select at least one option'),
});

const Step2_InterestAreas = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log('Step 2 Data:', values);
        navigate('/founder/onboarding/step-3');
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
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">Areas of Interest</h2>
                        <p className="text-sm md:text-base">
                            Tell us what excites you—AI, education, sustainability? We’ll match you with the right ideas or investors.
                        </p>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full lg:w-[60%] bg-card px-6 md:px-10 lg:px-20 py-10 flex justify-center 
        rounded-b-[24px] lg:rounded-r-[24px] lg:rounded-tl-none lg:rounded-bl-none">
                    <div className="w-full max-w-[530px]">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                            Areas of Interest
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
                                        <label className="block text-primary font-semibold mb-2">Areas of Interest</label>
                                        <div className="w-full border-2 border-primary rounded-[20px] bg-white px-3 py-2 min-h-[44px] flex flex-wrap gap-2">
                                            {interestOptions.map((tag) => (
                                                <button
                                                    type="button"
                                                    key={tag}
                                                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-150 border ${values.interests.includes(tag)
                                                        ? 'bg-purple-100 text-primary border-primary'
                                                        : 'bg-transparent text-primary border-transparent'
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
                                        <label className="block text-primary font-semibold mb-2">Skills</label>
                                        <Field
                                            name="skills"
                                            placeholder="e.g., React, Node.js, UI Design"
                                            className="input h-[40px]"
                                        />
                                        {errors.skills && touched.skills && (
                                            <p className="text-sm text-red-600 mt-1">{errors.skills}</p>
                                        )}
                                    </div>

                                    {/* Looking For */}
                                    <div>
                                        <label className="block text-primary font-semibold mb-2">Looking For</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                            {lookingForOptions.map((option) => (
                                                <label key={option} className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                                                    <Field
                                                        type="checkbox"
                                                        name="lookingFor"
                                                        value={option}
                                                        className="accent-primary w-4 h-4"
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
                                            onClick={() => navigate('/founder/onboarding/step-1')}
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

export default Step2_InterestAreas;
