function ModalLayout({ exit, children }: any) {
    return (
        <>
            <div className="fixed inset-0 z-30">
                <div className="flex items-center justify-center min-h-screen text-center px-1">
                    <div
                        className="fixed inset-0 bg-[#0f0f0fc4] cursor-pointer fade-in-fast z-20"
                        onClick={exit}
                    ></div>

                    <div className="fade-in-left inline-block bg-bgPrimaryColor rounded-lg shadow-lg transform transition-all duration-300 modal z-30 mt-10 tablet:mt-12 max-h-[80vh] overflow-auto tablet:overflow-visible scrollbar-thin scrollbar-thumb-darkbgsecondary scrollbar-track-darkbgprimary scrollbar-thumb-rounded scrollbar-track-rounded ">
                        {/*   <button
                    className="absolute right-[-5px] top-[-5px] bg-darkbgprimary h-6 w-6 flex border-2 justify-center border-bgSecondaryColor bg-bgPrimaryColor hover:bg-bgSecondaryColor rounded-full text-sm translate-all duration-150 font-bold hover:text-bgPrimaryColor"
                    onClick={() => dispatch(item(null))}
                ></button> */}
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalLayout;
