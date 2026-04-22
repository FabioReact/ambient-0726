import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { schema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/users";
import { toast } from "react-toastify";
import { useContext } from "react";
import UserContext from "../../context/user-context";

type Inputs = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { loginUser: onLogin } = useContext(UserContext);

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Partager l'adresse mail et le token de l'utilisateur avec les autres composants de l'application
      // data.accessToken
      toast.success(`User ${data.user.email} logged in successfully`);
      onLogin(data.user.email, data.accessToken);
    },
    onError: (error) => {
      toast.error(`An error occured: ${error.message}`);
    },
  });

  const onSubmitHandler: SubmitHandler<Inputs> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" {...register("password")} />
          <p className="text-red-500">{errors.password?.message}</p>
        </fieldset>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
