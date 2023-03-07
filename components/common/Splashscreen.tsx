function Splashscreen() {
    return (
        <div className="h-screen bg-secondaryColor flex justify-center items-center flex-col one_load">
            <h2 className="text-[38px] text-[#fff]">!برنج</h2>
            <div>
                <div className="loader mt-10"></div>
            </div>
        </div>
    );
}

export default Splashscreen;