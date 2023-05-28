import FeatureCard from "../FeatureCard/FeatureCard";

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
            heading="Seguimiento en tiempo real"
            description="Obtén información sobre tu progreso con gráficos y calendarios detallados."
          />
          <FeatureCard
            icon="nombredelicono.svg"
            heading="Recordatorios personalizables"
            description="Configura recordatorios que se adapten a tu rutina diaria para que desarrolles tus hábitos con éxito."
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
