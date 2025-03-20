import { useForm } from "react-hook-form";

// Custom example of working with a form component using React-Hook-Form
const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <p>{errors.name.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};
