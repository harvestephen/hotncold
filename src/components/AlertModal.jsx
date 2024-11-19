function AlertModal() {
  return (
    <>
      <div className="w-full flex h-full justify-center absolute z-10 items-center">
        <div className="bg-[#D9D9D9] rounded-lg relative p-4 text-center">
          <p><span className="text-[#D55B3E]">NOTICE</span>: Sign up to save your tasks.</p>
          <button className="bg-[#B6CFCF] px-2 rounded-lg mt-2 align-middle">Okay</button>
        </div>
      </div>
    </>
  );
}

export default AlertModal;
