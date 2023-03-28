import { ReactNode, useState } from "react";

type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <>
            <div className="w-full overflow-auto mt-[5rem] -mb-10">
                {children}
            </div>
        </>
    );
};

export default DefaultLayout;