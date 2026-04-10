const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-[#171717] p-5 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
};

export default SectionCard;