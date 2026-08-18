import React, { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import ChooseFile from "../components/ui/ChooseFile";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { registerFields } from "../constants/fields/register";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <section>
                <PageHeader
                    title={"Profile Account"}
                    description={"Manage and update your accounts details here."}
                />
            </section>

            {/* UPLOAD IMAGE SECTION  */}
            <section className="bg-surface mt-5 pt-8 px-6 pb-8 rounded-2xl border border-body/10 shadow-sm">
                <section className="flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-32 h-32 aspect-square rounded-full overflow-hidden border-2 border-primary/20 shadow-sm shrink-0">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            alt="Profile avatar"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D"
                        />
                    </div>
                    <div className="w-full max-w-md">
                        <ChooseFile
                            label="Upload your image"
                            accept="image/*"
                            disabled={!isEditing}
                        />
                    </div>
                </section>

                <div className="mt-8">
                    {/* SECTION TO SHOW PERSONAL DETAILS  */}
                    <h2 className="text-2xl font-heading font-bold text-heading mb-4">Personal Details</h2>
                    <form className="grid grid-cols-2 gap-y-4 gap-x-4 max-w-2xl">
                        {registerFields.map((field) => (
                            <div
                                key={field.name}
                                className={`space-y-1.5 ${field.halfWidth ? "col-span-2 sm:col-span-1" : "col-span-2"}`}
                            >
                                <label className="text-sm font-medium text-heading">
                                    {field.label}
                                </label>
                                <Input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    disabled={!isEditing}
                                />
                            </div>
                        ))}


                        <div className="col-span-2 mt-2">
                            <Button
                                type="button"
                                className="px-6 py-2.5"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? "Save Changes" : "Edit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Profile;
