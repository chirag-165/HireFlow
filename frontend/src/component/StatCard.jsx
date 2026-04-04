const StatCard = ({ title, value, color }) => {
  return (
    <div className="bg-[#171717] p-5 rounded-2xl shadow-md flex flex-col gap-2 hover:scale-105 transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-2xl font-bold ${color}`}>{value}</h2>
    </div>
  );
};

export default StatCard;