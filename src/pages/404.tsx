import React from 'react';
import Error from "@/components/error/error";

const NotFoundPage: React.FC = () => {
    return (
        <div>
            <Error error="404" text="Magic! Page not found"/>
        </div>
    );
};

export default NotFoundPage;

