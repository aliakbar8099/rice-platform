import { ReactNode, useState } from "react";

type DefaultLayoutProps = {
    children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const [open, setOpen] = useState<Boolean>(false);

    return (
        <>
            <div className="w-full overflow-auto mt-[5rem] -mb-10">
                {children}
            </div>
        </>
    );
};

export default DefaultLayout;