import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Building2, Link, Mail, Calendar, ArrowRight, User, CheckCircle2, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

interface SignupFormData {
  fullName: string;
  companyName: string;
  companyLogoUrl: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  package: string;
  termsAccepted: boolean;
}

const packages = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: 5,
    members: 5,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'growth',
    name: 'Growth Package',
    price: 8,
    members: 10,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'pro',
    name: 'Pro Package',
    price: 15,
    members: 20,
    color: 'from-indigo-500 to-indigo-600'
  }
];

const ManagerSignup = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<SignupFormData>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: SignupFormData) => {
    console.log('Form submitted:', { ...data, profileImage });
  };

  return (

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <Controller
              control={control}
              name="dateOfBirth"
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <input
                  type="date"
                  onChange={field.onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              )}
            />
          </div>
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth.message}</p>
                      )}
      </div>
               
             
          
     
   
    
 
  );
};

export default ManagerSignup;