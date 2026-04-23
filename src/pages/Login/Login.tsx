import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { schema } from "./schema";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/users";
import { toast } from "react-toastify";
import { useContext } from "react";
import UserContext from "../../context/user-context";
import { useLocation, useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const { state } = useLocation();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Partager l'adresse mail et le token de l'utilisateur avec les autres composants de l'application
      // data.accessToken
      toast.success(`User ${data.user.email} logged in successfully`);
      onLogin(data.user.email, data.accessToken);
      const nextRoute = state?.from ?? "/";
      navigate(nextRoute, { replace: true });
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
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Login to your account
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            To access your profile and manage your account, please login with your credentials.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end"
        >
          <fieldset className="relative grow w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-500 text-xs absolute">{errors.email?.message}</p>
          </fieldset>
          <fieldset className="relative grow w-full">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            <p className="text-red-500 text-xs absolute">{errors.password?.message}</p>
          </fieldset>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
