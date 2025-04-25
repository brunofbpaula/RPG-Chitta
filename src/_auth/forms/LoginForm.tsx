import { useUserContext } from '@/context/AuthContext';
import logo from '@/assets/icons/samurai.png';
import { toast } from "sonner";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { SigninValidation } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutation';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { Input } from '@/components/ui/input';


const LoginForm = () => {

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>(
    {
      resolver: zodResolver(SigninValidation),
      defaultValues: {
        email: "",
        password: ""
      }
    }
  );
  
  async function handleSignIn(values: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session){
      return toast.error("Não foi possível logar. Tente novamente.")
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/');
    } else {
      return toast.error("Não foi possível logar. Tente novamente.")
    }
  
  };


  return (
    <Form {...form}>
      <div className="form-black flex flex-col items-center justify-center text-center text-white">
        <img src={logo} alt="logo" className="h-40 w-auto mx-auto" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-5">
          Pague o preço da liberdade.
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Entre com sua conta.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />

          <Button type="submit" className="shad-button_primary bg-white text-black">
            {isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader /> Carregando...
              </div>
            ) : (
              "Entrar"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Não sabe sua conta? 
            Consulte no Discord.
          </p>
          <p>
            <Link
              to="/discord"
              className="text-primary-500 text-small-semibold ml-1">
              Discord
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default LoginForm