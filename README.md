# Riordanverso - Base de Conhecimento

Uma interface web interativa e responsiva para explorar os livros do universo literário de Rick Riordan. Este projeto foi desenvolvido como parte da **Imersão Dev com Google Gemini (10ª Edição)**, promovida pela Alura.

![Prévia do Projeto](/assets/Base%20Percy.png) 

## 📖 Sobre o Projeto

A "Base de Conhecimento do Riordanverso" é uma página web que cataloga as diversas séries de livros escritas por Rick Riordan. A aplicação carrega os dados dos livros a partir de um arquivo JSON local e os exibe de forma organizada, agrupados por série. O usuário pode navegar pelas coleções, buscar por títulos ou termos específicos e visualizar detalhes de cada livro em uma janela modal.

## ✨ Funcionalidades

- **Visualização Dinâmica:** Os livros e séries são carregados e renderizados dinamicamente a partir de um arquivo `data.json`.
- **Busca Inteligente:** Campo de busca que filtra os livros em tempo real por título, descrição ou sinopse.
- **Navegação Rápida:** Menu lateral com links (âncora) para cada série de livros na página.
- **Scroll Spy:** O item de menu correspondente à série visível na tela é destacado automaticamente durante a rolagem.
- **Modal de Detalhes:** Ao clicar em "Saiba mais", uma janela modal exibe a capa, o título e a sinopse completa do livro.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis, com um menu hambúrguer para navegação em telas menores.
- **Botão "Voltar ao Topo":** Facilita a navegação em páginas longas.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias web fundamentais:

- **HTML5:** Para a estrutura semântica do conteúdo.
- **CSS3:** Para estilização, layout (Flexbox e Grid) e design responsivo.
- **JavaScript (ES6+):** Para a interatividade, manipulação do DOM, lógica de busca e consumo de dados.

## 📂 Estrutura de Arquivos

O projeto está organizado da seguinte forma:

```
imersao-alura/
├── 📄 index.html        # Estrutura principal da página
├── 🎨 style.css         # Folha de estilos
├── ⚙️ script.js         # Lógica principal da aplicação
├── 📚 data.json         # Banco de dados com as informações dos livros
└── 📜 README.md         # Este arquivo
```

## 🛠️ Como Executar

Como este é um projeto puramente front-end (HTML, CSS, JS), não há necessidade de um processo de build ou instalação de dependências complexas.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/imersao-alura.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd imersao-alura
    ```

3.  **Abra o arquivo `index.html`:**
    Você pode simplesmente abrir o arquivo `index.html` diretamente no seu navegador de preferência.

    Para uma melhor experiência, especialmente para evitar problemas com a política de mesma origem (CORS) ao usar `fetch()` em alguns navegadores, é recomendado usar um servidor local. Se você tem o VS Code, pode usar a extensão **Live Server**:
    - Instale a extensão "Live Server".
    - Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

---

Feito durante a Imersão Alura por Luma Minikel de Oliveira.
