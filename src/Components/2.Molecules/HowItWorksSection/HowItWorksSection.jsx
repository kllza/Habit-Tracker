import HowItWorksCard from "../../1.Atoms/HowItWorksCard/HowItWorksCard";

const HowItWorksSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Cómo funciona</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <HowItWorksCard
            icon="nombredelicono.svg"
            heading="Crea un hábito"
            description="Define la meta de tu hábito y configura la frecuencia en la que deseas llevarla a cabo."
          />
          <HowItWorksCard
            icon="nombredelicono.svg"
            heading="Lorem Ipsum"
            description="Non velit ea culpa fugiat qui est sit magna amet cillum. Eiusmod tempor duis magna adipisicing anim aliqua."
          />
          <HowItWorksCard
            icon="nombredelicono.svg"
            heading="Lorem Ipsum"
            description="Non velit ea culpa fugiat qui est sit magna amet cillum. Eiusmod tempor duis magna adipisicing anim aliqua."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
