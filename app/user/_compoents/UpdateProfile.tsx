"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";


import { z } from "zod";
import { UpdateUserData, updateUserSchema } from "../schema";
import { UserEditData } from "@/app/admin/users/schema";
import { handleUpdateProfile } from "@/lib/actions/auth-actions";

export default function UpdateUserForm() {
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } =
        useForm<UpdateUserData>({
            resolver: zodResolver(updateUserSchema),
            values: {
                firstName: '',
                lastName:  '',
                // email: '',
            }
        });

    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
        onChange(file);
    };

    const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
        setPreviewImage(null);
        onChange?.(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const onSubmit = async (data: UserEditData) => {
        setError(null);
        try {
            const formData = new FormData();
            if(data.firstName){
                formData.append('firstName', data.firstName);
            }
            if(data.lastName){
                formData.append('lastName', data.lastName);
            }
            if (data.profile) {
                formData.append('profile', data.profile);
            }

            const response = await handleUpdateProfile(formData);
            
            if (!response.success) {
                throw new Error(response.message || 'Update profile failed');
            }

            handleDismissImage();
        } catch (error: Error | any) {
            setError(error.message || 'Profile update failed');
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-[#0F172A] text-white p-6 rounded-xl shadow-lg border border-green-500">
            <h1 className="text-2xl font-bold mb-4 text-green-400 text-center">
                 Update Futsal Profile
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <p className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
                        {error}
                    </p>
                )}

                
                <div className="flex justify-center mb-4">
                    {previewImage ? (
                        <div className="relative w-24 h-24">
                            <img
                                src={previewImage}
                                alt="Profile Image Preview"
                                className="w-24 h-24 rounded-full object-cover border-2 border-green-400"
                            />
                            <Controller
                                name="profile"
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <button
                                        type="button"
                                        onClick={() => handleDismissImage(onChange)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            />
                        </div>
                    ) : (
                        <div className="w-24 h-24 bg-green-800 rounded-full flex items-center justify-center border-2 border-green-400">
                            <span className="text-white text-sm">No Image</span>
                        </div>
                    )}
                </div>

                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1 text-green-400">
                        Profile Image
                    </label>
                    <Controller
                        name="profile"
                        control={control}
                        render={({ field: { onChange } }) => (
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                                accept=".jpg,.jpeg,.png,.webp"
                                className="text-white"
                            />
                        )}
                    />
                    {errors.profile && (
                        <p className="text-sm text-red-400 mt-1">
                            {errors.profile.message}
                        </p>
                    )}
                </div>

                
                <div>
                    <label className="block text-sm font-medium mb-1 text-green-400" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        {...register("firstName")}
                        className="w-full border border-green-500 rounded px-3 py-2 bg-[#020617] text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-400">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                
                <div>
                    <label className="block text-sm font-medium mb-1 text-green-400" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        {...register("lastName")}
                        className="w-full border border-green-500 rounded px-3 py-2 bg-[#020617] text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-400">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>

                
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 font-semibold"
                >
                    {isSubmitting ? 'Updating...' : 'Update Profile '}
                </button>
            </form>
        </div>
    );
}
