# 📱 React Native Pokédex

Uma aplicação móvel robusta para consultar Pokémons, desenvolvida com **React Native** e **Expo**. Este projeto demonstra a aplicação de boas práticas de arquitetura, gestão de estado global e persistência de dados.

## ✨ Funcionalidades

- **Listagem Infinita (Infinite Scroll):** Carregamento paginado de Pokémons para performance otimizada (lotes de 20 itens).
- **Pesquisa Dinâmica:** Busca de Pokémons específicos diretamente na API através da barra de navegação.
- **Sistema de Favoritos:** Permite marcar Pokémons como favoritos. Os dados são persistidos no dispositivo usando `AsyncStorage`, mantendo-se salvos mesmo após fechar a app.
- **Temas (Dark/Light Mode):** Suporte completo a temas Claro, Escuro e Automático (baseado no sistema), gerido via Context API.
- **Detalhes Completos:** Visualização de estatísticas (HP, Attack, etc.) com barras de progresso, habilidades, peso e altura.
- **Zoom de Imagem:** Modal interativo para visualizar a imagem do Pokémon em ecrã inteiro.

## 🛠️ Tecnologias Utilizadas

- **Core:** React Native, TypeScript, Expo.
- **Navegação:** Expo Router (File-based routing).
- **UI/Design:** React Native Paper.
- **Arquitetura:** Padrão MVC (Model-View-Controller) com Custom Hooks.
- **Persistência:** AsyncStorage.
- **API:** [PokéAPI](https://pokeapi.co/).

## 🚀 Como executar

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/TEU-USUARIO/NOME-DO-REPO.git](https://github.com/TEU-USUARIO/NOME-DO-REPO.git)
    cd NOME-DO-REPO
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o projeto:**

    ```bash
    npx expo start
    ```

4.  Escaneie o QR Code com o seu telemóvel (usando a app Expo Go) ou execute num emulador Android/iOS.

## 🧠 O que aprendi com este projeto

O desenvolvimento desta aplicação focou-se em ir além do básico, implementando padrões de código escaláveis e profissionais:

### 1. Arquitetura e Organização

Aprendi a separar a lógica da interface. Em vez de ter toda a lógica dentro dos componentes visuais, criei **Controllers** (Custom Hooks) que gerem o estado e as regras de negócio:

- `usePokemonListController`: Gere a paginação, a pesquisa e a alternância entre lista normal/favoritos.
- `usePokemonProfileController`: Gere o carregamento de detalhes e a lógica de favoritar.

### 2. Otimização de Performance

Deparei-me com o desafio de renderizar listas longas e resolvi utilizando:

- **FlatList Otimizada:** Uso de `windowSize`, `initialNumToRender` e `maxToRenderPerBatch`.
- **Memoização:** Implementação de `React.memo` e `useCallback` nos cartões para evitar re-renderizações desnecessárias durante o scroll.

### 3. Gestão de Estado Global e Persistência

- Implementei um **Contexto (ThemeContext)** para gerir o tema da aplicação globalmente, permitindo que qualquer componente reaja à mudança de cor.
- Utilizei o **AsyncStorage** para persistir preferências do utilizador (Tema e Favoritos) no sistema de ficheiros do dispositivo.

### 4. Navegação Moderna

Utilizei o **Expo Router**, a nova forma de navegação baseada em ficheiros (semelhante ao Next.js), injetando componentes complexos (como a Barra de Pesquisa e Botões) diretamente no cabeçalho nativo usando `Stack.Screen`.

---

Desenvolvido por [Teu Nome].
