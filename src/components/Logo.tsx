const Logo = () => {
  return (
    <div className="flex flex-co items-center gap-1 text-white text-sm sm:text-base bg-black p-1.5 rounded-md">
      <span className="bg-[#f7ca18] font-semibold w-0.5 h-8 block" />
      <div className="uppercase">
        <p className="text-sm font-medium leading-tight">Master</p>
        <p className="text-lg font-bold leading-tight tracking-wider">Born</p>
      </div>
    </div>
  );
};

export default Logo;
