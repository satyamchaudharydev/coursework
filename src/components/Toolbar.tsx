import { Icons } from "./Icons";

const Toolbar = () => {
  return (
    <div className="fixed top-[12px] right-[12px] flex-col gap-5 items-center hidden sm:flex">
      <div className="space-y-2">
        <div className="bg-white rounded-full text-gray-200 font-bold flex gap-[2px] items-center justify-center px-1 py-1 pr-[10px] border border-[#EAF0F2]">
          <Icons.zuiCoin />
          <span>120</span>
        </div>
        <div className="bg-white rounded-full text-gray-200 font-bold flex gap-[2px] items-center justify-center px-1 py-1 pr-[10px] border border-[#EAF0F2]">
          <Icons.fire />
          <span>120</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-[#FFFFFFA3] rounded-full text-gray-200 font-bold    w-[48px] h-[48px]  p-[8px]">
          <div className="bg-white border border-[#EAF0F2] rounded-full w-full h-full flex justify-center items-center p-1">
            <Icons.eventIcon />
          </div>
        </div>
        <div className="bg-[#FFFFFFA3] rounded-full text-gray-200 font-bold    w-[48px] h-[48px]  p-[8px]">
          <div className="bg-white border border-[#EAF0F2] rounded-full w-full h-full flex justify-center items-center p-1">
            <Icons.nodeStack />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Toolbar;
