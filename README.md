# 🎲 RPG-Chitta

Um RPG de mesa digital e personalizado, criado especialmente para um amigo (*Chitta*), onde é possível criar e gerenciar fichas de personagens, evoluir habilidades, adicionar itens e registrar o progresso da aventura.  
Desenvolvido com **React**, **TypeScript**, **Vite**, **Tailwind CSS** e **Appwrite**.

## ✨ Funcionalidades

- 📜 **Criação de ficha**: defina atributos, características e foto do personagem.
- ⚔️ **Evolução**: aumente habilidades conforme a campanha avança.
- 🎒 **Inventário**: adicione ou remova itens.
- 📝 **Anotações**: registre acontecimentos importantes e progresso da história.
- ☁️ **Sincronização**: dados salvos e carregados através do Appwrite.

## 🛠️ Tecnologias

- [React](https://react.dev/) — Biblioteca para interfaces.
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática.
- [Vite](https://vitejs.dev/) — Bundler rápido e moderno.
- [Tailwind CSS](https://tailwindcss.com/) — Estilização utilitária.
- [Appwrite](https://appwrite.io/) — Backend-as-a-Service para autenticação e banco de dados.

## 📂 Estrutura do projeto

```plaintext
src/
 ├── _auth/           # Páginas e componentes de autenticação
 ├── _root/           # Layouts e páginas principais
 ├── assets/          # Imagens, ícones e outros recursos estáticos
 ├── components/      # Componentes reutilizáveis da interface
 ├── context/         # Contextos globais do React (estado compartilhado)
 ├── lib/
 │   ├── appwrite/    # Configuração e serviços do Appwrite
 │   ├── react-query/ # Configuração e hooks do React Query
 │   ├── validation/  # Schemas e validações de dados
 │   └── utils.ts     # Funções utilitárias
 └── types/           # Tipos TypeScript globais
```

## 🌐 Deploy
O projeto está hospedado na [Vercel](https://rpg-chitta.vercel.app/login).
