import { useForm } from "react-hook-form";

const Form = ({ inputs, onSubmit, submitLabel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      className="text-center mt-5"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        border: "1px solid #DCDBD4",
        borderRadius: "8px",
        padding: "30px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      {inputs.map((input) => (
        <div className="text-center mt-5" key={input.name}>
          <label className="form-label w-100">{input.label}</label>

          <input
            className="form-control"
            type={input.type}
            {...register(input.name, input.validation)}
          />

          {errors[input.name] && <p>{errors[input.name].message}</p>}
        </div>
      ))}

      <button className="text-center mt-5" type="submit">
        {submitLabel}
      </button>
    </form>
  );
};

export default Form;
