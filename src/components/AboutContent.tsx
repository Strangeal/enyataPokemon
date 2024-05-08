type AboutProps = {
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
};

const AboutContent = ({ height, weight, abilities }: AboutProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <h4 className="text-2xl font-bold">About</h4>
      <ul className="space-y-2">
        <li className="flex items-center gap-5 border-b pb-2">
          <p className="text-sm font-light">Height:</p>
          <p className="text-sm font-extrabold">{height}m</p>
        </li>
        <li className="flex items-center gap-5 border-b pb-2">
          <p className="text-sm font-light">Weight:</p>
          <p className="text-sm font-extrabold">{weight}.0kg</p>
        </li>
        <li className="flex gap-5 border-b pb-2">
          <p className="text-sm font-light">Abilities:</p>
          <div>
            {abilities?.map((ability, index) => (
              <p key={index} className="text-sm font-extrabold">
                {ability.ability.name}
                {index < abilities.length - 1 ? ", " : ""}
              </p>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AboutContent;
