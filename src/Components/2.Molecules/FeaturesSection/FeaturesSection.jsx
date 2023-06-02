import FeatureCard from "../../1.Atoms/FeatureCard/FeatureCard";

const FeatureSection = () => {
  return (
    <section className="py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Características</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="nombredelicono.svg"
            heading="Creación de hábitos personalizados"
            description="Crea hábitos que se adapten a tu estilo de vida y a tus necesidades personales."
          />
          <FeatureCard
            icon="nombredelicono.svg"
            heading="Lorem Ipsum"
            description="Non velit ea culpa fugiat qui est sit magna amet cillum. Eiusmod tempor duis magna adipisicing anim aliqua."
          />
          <FeatureCard
            icon="nombredelicono.svg"
            heading="Lorem Ipsum"
            description="Non velit ea culpa fugiat qui est sit magna amet cillum. Eiusmod tempor duis magna adipisicing anim aliqua."
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
