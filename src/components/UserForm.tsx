import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools"


type FormValue = {
  username: string,
  email: string,
  password: string
}

const UserForm = () => {

  const form = useForm<FormValue>({

    // Set a Default value 
    // defaultValues: {
    //   username: "string",
    //   email: "string",
    //   password: "string"
    // }
  });

  const onSubmit = (Data: FormValue) => {
    console.log(Data);
  }

  // Extract Method Form the Hook Form
  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">User Name</label>
        <input type="text" id="username" {...register("username", { required: { value: true, message: "UserName is Required!" } })} />
        {errors.username?.message}

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email", {
          pattern: {
            value:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email format"
          },
          validate: {
            notAdmin: (fieldValue) => {
              return (
                fieldValue !== "admin@gmail.com" || "Enter Different Email Address"
              )
            },
            notBlackListed: (fieldValue) => {
              return !fieldValue.endsWith("beddomain.com") || "This Domain is Not Supported"
            }
          }
        },)} />
        {errors.email?.message}

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password", { required: { value: true, message: "Password is Required!" } })} />
        {errors.password?.message}

        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default UserForm;
