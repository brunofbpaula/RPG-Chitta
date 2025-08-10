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
      stealthiness: undefined,
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
        stealthiness: user.stealthiness,
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
    <div className="form-black flex items-center justify-center text-center text-white gap-x-30">
        <div>
        <img src={logo} alt="logo" className="h-auto w-68 mx-auto" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-5">
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
                    <FormItem>
                    <FormLabel style={{ fontSize: '12px' }}>Email</FormLabel>
                    <FormControl>
                        <Input
                        type="email"
                        placeholder="player@rpg.com"
                        className="max-h-7 bg-white text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                    <FormLabel style={{ fontSize: '12px' }}>Senha</FormLabel>
                    <FormControl>
                        <Input
                        type="password"
                        placeholder="••••••••"
                        className="max-h-7 bg-white text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )} />
            </div>

            {/* Nome */}
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                <FormLabel style={{ fontSize: '12px' }}>Nome do Personagem</FormLabel>
                <FormControl>
                    <Input
                    type="text"
                    placeholder="Nome"
                    className="max-h-7 bg-white text-black rounded-md border border-gray-300"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )} />

            {/* Objetivo */}
            <FormField control={form.control} name="goal" render={({ field }) => (
                <FormItem>
                <FormLabel style={{ fontSize: '12px' }}>Objetivo</FormLabel>
                <FormControl>
                    <Input
                    type="text"
                    placeholder="Objetivo do personagem"
                    className="max-h-7 bg-white text-black rounded-md border border-gray-300"
                    {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )} />

            {/* Imagem */}
            <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Imagem</FormLabel>
                <FormControl
                style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={''}
                    />
                </FormControl>
                <FormMessage className="shad-form_message" />
                </FormItem>
            )}
            />

            {/* Atributos organizados em grid */}
            <div className="grid grid-cols-3 gap-4">
                {['age', 'strength', 'stealthiness', 'intelligence', 'moral', 'resilience'].map((name) => (
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
                            case 'stealthiness': return 'Furtividade';
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
                        <FormMessage />
                    </FormItem>
                    )}
                />
                ))}
            </div>

            {/* Botão */}
            <Button
                type="submit"
                className="cursor-pointer mt-4 bg-gray-300 text-black rounded-md border border-gray-400 hover:bg-gray-400 transition"
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