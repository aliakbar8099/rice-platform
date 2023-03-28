import React, { useState } from "react";

interface IProps {
    items: string[] | JSX.Element[];
}

const Menu = ({ items }: IProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [left, setLeft] = React.useState<number | null | undefined>(1000);

    React.useEffect(() => {
        const target = document.querySelector<HTMLButtonElement>(".active_btn-nav");
        if(target){
            setLeft(target.offsetLeft - 2.6);
        }            
    }, [activeIndex])


    const onItemClick = (index: number) => {
        setActiveIndex(index)
    };


    return (
        <div className="bg-[#92a760d1] w-[90%] p-[12px] px-3 fixed left-[5%] rounded-full bottom-4">
            <ul id="navbar_v" className="flex justify-between items-center w-full">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={`${index === activeIndex ? "active_btn-nav" : ""} text-[#fff] p-2 rounded-full`}
                        onClick={() => onItemClick(index)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <div id="select_nav" className="bg-[#fff] w-[44px] h-[44px] absolute left-0 top-[50%] translate-y-[-50%] z-[-1] rounded-full transition-all" style={{ left: left + "px" }} />
        </div>
    );
};

export default Menu;
