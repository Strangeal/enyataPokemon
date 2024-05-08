type SimilarProps = {
  similarPokes: any;
};

const SimilarContent = ({ similarPokes }: SimilarProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <h4 className="text-2xl font-bold">Stats</h4>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 py-10 xs:grid-cols-2 w-full">
        {similarPokes?.map((poke: any, index: number) => (
          <div
            key={index}
            className="bg-white shadow-2xl rounded-2xl p-2 h-full border"
          >
            <div className="bg-prime_gray rounded-2xl h-32 border flex justify-center">
              <img
                className="size-44 relative -top-16"
                src={`${poke.data.sprites?.other["official-artwork"].front_default}`}
                alt={poke.name}
              />
            </div>
            <div className="flex flex-col justify-center items-center space-y-1 py-5">
              <h4 className="text-xl text-center font-medium">{poke.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarContent;
