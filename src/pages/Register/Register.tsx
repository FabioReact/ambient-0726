import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

const schema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(6, { error: 'Le mot de passe doit faire au moins 6 charactères' })
      .max(100),
    passwordConfirmation: z.string(),
  })
  .required();

type Inputs = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<Inputs> = (data) => {
    // event.preventDefault();
    // console.log('Email:', emailRef.current?.value, 'Password:', passwordRef.current?.value);
    console.log('Email:', data.email, 'Password:', data.password);
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <fieldset>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' {...register('email')} />
          <p className='text-red-500'>{errors.email?.message}</p>
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' {...register('password')} />
          <p className='text-red-500'>{errors.password?.message}</p>
        </fieldset>
        <fieldset>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input type='password' id='passwordConfirmation' {...register('passwordConfirmation')} />
          <p className='text-red-500'>{errors.passwordConfirmation?.message}</p>
        </fieldset>
        <button type='submit'>Register</button>
      </form>
    </section>
  );
};

export default Register;
