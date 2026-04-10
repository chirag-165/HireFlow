import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ConversionChart({ rate = 0 }) {
  const data = [
    { name: 'Completed', value: Number(rate) },
    { name: 'Remaining', value: 100 - Number(rate) },
  ];

  // Using hex codes directly to avoid Tailwind variable conflicts
  const COLORS = ['#6366f1', '#1e293b']; 

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%"
            outerRadius="90%"
            cornerRadius={40}
            paddingAngle={0}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            stroke="none"
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index]} 
                // This adds the "Neon" glow to the indigo part
                style={{
                  filter: index === 0 ? 'drop-shadow(0px 0px 6px rgba(99, 102, 241, 0.6))' : 'none'
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-white leading-none">
          {Math.round(rate)}%
        </span>
        <span className="text-[8px] uppercase tracking-tighter text-slate-500 font-bold mt-1">
          REACHED
        </span>
      </div>
    </div>
  );
}