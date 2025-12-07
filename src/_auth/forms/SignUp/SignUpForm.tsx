import { useUserContext } from '@/context/AuthContext';
import logo from '@/assets/icons/samurai.png';
import discord from '@/assets/icons/discord.png';
import { toast } from "sonner";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  useCreateUserAccountMutation,
  useSignInAccount
} from '@/lib/react-query/queriesAndMutation';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { Input } from '@/components/ui/input';
import { SignupValidation } from '@/lib/validation';
import FileUploader from '@/components/shared/FileUploader';
import './SignUpForm.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      age: undefined,
      goal: "",
      image: undefined,
      strength: undefined,
      agility: undefined,
      intelligence: undefined,
      moral: undefined,
      resilience: undefined
    },
  });

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount({
        email: user.email,
        password: user.password,
        name: user.name,
        age: user.age,
        goal: user.goal,
        image: user.image,
        sanity: 100,
        health: 100,
        strength: user.strength,
        agility: user.agility,
        intelligence: user.intelligence,
        moral: user.moral,
        resilience: user.resilience
      });

      if (!newUser) {
        toast.error("Falha no cadastro. Tente novamente.");
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });


      if (!session) {
        toast.error("Login falhou. Tente novamente.");
        navigate("/login");
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast.error("Login falhou. Tente novamente.");
        return;
      }

    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="main-form">
        <div className="left-box">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="">
            Pague o preço da liberdade.
        </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4">
          <Form {...form}>
              <form
              onSubmit={form.handleSubmit(handleSignup)}
              className="flex flex-col gap-5 w-full mt-4"
              >
              <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem className='relative pb-6'>
                      <FormLabel style={{ fontSize: '12px' }}>Email</FormLabel>
                      <FormControl>
                          <Input
                          type="email"
                          placeholder="player@rpg.com"
                          className="max-h-7 bg-white text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          {...field}
                          />
                      </FormControl>
                      <div className="absolute left-0 bottom-0 mt-1 w-full">
                        <FormMessage id="name-error" className="text-red-500 text-xs" />
                      </div>
                      </FormItem>
                  )} />

                  {/* Senha */}
                  <FormField control={form.control} name="password" render={({ field }) => (
                      <FormItem className="relative pb-6">
                      <FormLabel style={{ fontSize: '12px' }}>Senha</FormLabel>
                      <FormControl>
                          <Input
                          type="password"
                          placeholder="••••••••"
                          className="max-h-7 bg-white text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          {...field}
                          />
                      </FormControl>
                      <div className="absolute left-0 bottom-0 mt-1 w-full">
                        <FormMessage id="name-error" className="text-red-500 text-xs" />
                      </div>
                      </FormItem>
                  )} />

              {/* Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="relative pb-6">
                    <FormLabel style={{ fontSize: "12px" }}>Nome do Personagem</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Nome"
                        className="max-h-7 bg-white text-black rounded-md border border-gray-300"
                        aria-invalid={!!form.formState.errors.name}
                        aria-describedby="name-error"
                      />
                    </FormControl>
                    <div className="absolute left-0 bottom-0 mt-1 w-full">
                      <FormMessage id="name-error" className="text-red-500 text-xs" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Objetivo */}
              <FormField control={form.control} name="goal" render={({ field }) => (
                  <FormItem className="relative pb-6">
                  <FormLabel style={{ fontSize: '12px' }}>Objetivo</FormLabel>
                  <FormControl>
                      <Input
                      type="text"
                      placeholder="Objetivo"
                      className="max-h-7 bg-white text-black rounded-md border border-gray-300"
                      {...field}
                      />
                  </FormControl>
                    <div className="absolute left-0 bottom-0 mt-1 w-full">
                      <FormMessage id="name-error" className="text-red-500 text-xs" />
                    </div>
                  </FormItem>
              )} />
              </div>


              {/* Imagem */}
              <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="shad-form_label">Imagem</FormLabel>
                  <FormControl
                  style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                  >
                      <FileUploader
                      fieldChange={field.onChange}
                      mediaUrl={''}
                      />
                  </FormControl>
                  <FormMessage/>
                  </FormItem>
              )}
              />

              {/* Atributos organizados em grid */}
              <div className="grid grid-cols-3 gap-4">
                  {['age', 'strength', 'agility', 'intelligence', 'moral', 'resilience'].map((name) => (
                  <FormField
                      key={name}
                      control={form.control}
                      name={name as any}
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel style={{ fontSize: '12px' }}>
                          {(() => {
                              switch(name) {
                              case 'age': return 'Idade';
                              case 'strength': return 'Força';
                              case 'agility': return 'Agilidade';
                              case 'intelligence': return 'Inteligência';
                              case 'moral': return 'Moral';
                              case 'resilience': return 'Resiliência';
                              default: return name;
                              }
                          })()}
                          </FormLabel>
                          <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            className="max-h-7 bg-white text-black rounded-md border border-gray-300"
                            {...field}
                            onChange={e => {
                                const rawValue = e.target.value;
                                const value = rawValue === '' ? undefined : Number(rawValue);

                                // Clamp entre 0 e 100
                                const clamped = value !== undefined ? Math.max(0, Math.min(100, value)) : undefined;

                                field.onChange(clamped);
                            }}
                          />
                          </FormControl>
                          <FormMessage className='error-message'/>
                      </FormItem>
                      )}
                  />
                  ))}
              </div>

              {/* Botão */}
              <Button
                  type="submit"
                  className="cursor-pointer mt-4 bg-gray-600 text-white rounded-md border border-gray-600 hover:bg-gray-400 transition"
              >
                  {(isCreatingAccount || isSigningInUser) ? (
                  <div className="flex-center gap-2">
                      <Loader size={24}/>
                  </div>
                  ) : (
                  "Criar Jogador"
                  )}
              </Button>

              <p className="text-sm text-light-2 text-center mt-2">
                  Consulte sua ficha no Discord.
              </p>
              <p className="flex justify-center">
                  <Link
                  to="https://discord.com/channels/1306386412207079466/1328257170701287435"
                  className="text-primary-500 text-sm font-semibold ml-1"
                  >
                  <img src={discord} alt="logo" className="h-5 w-5" />
                  </Link>
              </p>
              </form>
          </Form>
        </div>
    </div>
);
}
export default SignUpForm;