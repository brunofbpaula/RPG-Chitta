import { useUserContext } from '@/context/AuthContext';
import logo from '@/assets/icons/samurai.png';
import discord from '@/assets/icons/discord.png';
import { toast } from "sonner";
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

  const { checkAuthUser } = useUserContext();
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
      return toast.error("Credenciais inválidas.")
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/');
    } else {
      return toast.error("Não foi possivel logar.")
    }
  
  };


  return (
    <div className="form-black flex items-center justify-center text-center text-white gap-x-30">
      <div>
        <img src={logo} alt="logo" className="h-68 w-auto mx-auto" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-5">
          Pague o preço da liberdade.
        </h2> 
      </div>

      <div className="flex flex-col items-center justify-center w-80">
        <Form {...form}>
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
                    <Input placeholder="player@rpg.com" type="text" className="shad-input bg-white text-black" {...field} />
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
                    <Input placeholder="••••••••••" type="password" className="shad-input bg-white text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

            <Button type="submit" className="shad-button_primary bg-white text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
              {isSigningIn ? (
                <div className="flex-center gap-2">
                  <Loader size={24}/>
                </div>
              ) : (
                "Entrar"
              )}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Consulte seu login no Discord.
            </p>
            <p className='flex justify-center'>
              <Link
                to="https://discord.com/channels/1306386412207079466/1328257170701287435"
                className="text-primary-500 text-small-semibold ml-1">
                <img src={discord} alt="logo" className="h-5 w-5" />
              </Link>
            </p>
            <p className="text-small-regular text-center">
              <Link to="/register" className="text-primary-500 underline hover:text-primary-700">
                Primeira vez? Clique aqui para criar sua ficha
              </Link>
            </p>
          </form>
        </Form>
        </div>
    </div>
  )
}

export default LoginForm