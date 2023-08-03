import React from 'react';
import Error from "@/components/error/error";

const ServerErrorPage: React.FC = () => {
    return (
        <div>
            <Error error="500" text="Oops! Something went wrong"/>
        </div>
    );
};

export default ServerErrorPage;

