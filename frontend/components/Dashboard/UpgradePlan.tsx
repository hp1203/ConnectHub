import { LuLock } from "react-icons/lu";

const UpgradePlan = () => {
  return (
    <div className="absolute w-full h-full rounded-lg cursor-pointer" onClick={() => alert("hii")}>
      <p className="bg-gray-900 text-white text-xs py-1 px-2 flex items-center gap-1 rounded-lg absolute top-2 right-2">
        <LuLock />
        <span>Upgrade</span>
      </p>
    </div>
  );
};

export default UpgradePlan;
