const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
      {children}
    </div>
  );
};

export default CardWrapper;
