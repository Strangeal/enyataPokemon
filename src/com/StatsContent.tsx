type StatsProps = {
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];
};

const StatsContent = ({ stats }: StatsProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <h4 className="text-2xl font-bold">Stats</h4>
      <ul className="w-[90%]">
        {stats?.map((stat, index) => (
          <li
            key={index}
            className="grid grid-cols-6 items-center gap-3 border-b pb-2 mx-auto"
          >
            <p className="text-sm font-light col-span-3 text-right">
              {stat.stat.name}
            </p>
            <div className="w-full col-span-2 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full w-[45%]"
                style={{ width: `${stat.base_stat}%` }}
              ></div>
            </div>
            <h4 className="text-sm font-extrabold">{stat.base_stat}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsContent;
