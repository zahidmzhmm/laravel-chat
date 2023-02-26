import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({auth, mustVerifyEmail, status}) => {
    return (
        <>

            <AuthenticatedLayout auth={auth}>
                <Head title="Chat"/>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        This is User Chatting Section
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Index;
