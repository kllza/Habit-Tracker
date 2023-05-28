import HabitForm from "../HabitForm/HabitForm";

const AddHabitSection = ({onHabitAdded}) => {
  return (
    <section className="bg-gray-100 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Agregar un hábito</h2>
        <HabitForm onHabitAdded={onHabitAdded}/>
      </div>
    </section>
  );
};

export default AddHabitSection;
