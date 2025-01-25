import { RandomImage } from "./RandomImage";

export const ImageGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-[800px] mx-auto">
      <div className="text-center md:block">
        <RandomImage width={150} height={150} className="w-[150px] h-auto" />
      </div>
      <div className="text-center md:block">
        <RandomImage width={150} height={150} className="w-[150px] h-auto" />
      </div>
      <div className="text-center hidden md:block">
        <RandomImage width={150} height={150} className="w-[150px] h-auto" />
      </div>
      <div className="text-center hidden md:block">
        <RandomImage width={150} height={150} className="w-[150px] h-auto" />
      </div>
    </div>
  );
};
