function ModalLayout({ exit, children }: any) {
  return (
    <>
      <div className="fixed inset-0 z-30">
        <div className="flex items-center justify-center min-h-screen text-center">
          <div
            className="fixed inset-0 bg-[#2d2f30d3] dark:bg-[#000000d3] cursor-pointer fade-in z-20"
            onClick={exit}
          ></div>

          <div className="fade-in inline-block transform transition-all duration-300 modal z-30 mt-10 tablet:mt-12 max-h-[85vh] overflow-auto scrollbar-none">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalLayout;
