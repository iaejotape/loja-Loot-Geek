# Loot Geek - E-commerce

E-commerce completo desenvolvido com HTML, CSS (Bootstrap 5), e JavaScript puro.

## 📋 Estrutura do Projeto

```
loja-Loot-Geek/
├── index.html          # Página inicial / Catálogo de produtos
├── produto.html        # Página de detalhes do produto
├── login.html          # Página de login
├── registro.html       # Página de cadastro
├── carrinho.html       # Página do carrinho de compras
├── favoritos.html      # Página de produtos favoritos
├── perfil.html         # Página de perfil do usuário
├── notificacoes.html   # Página de notificações
├── script.js           # JavaScript principal
├── style.css           # Estilos personalizados
└── img/                # Imagens do projeto

    ├── banner-loja.svg
    └── product/        # Imagens dos produtos
```

## ✨ Funcionalidades

### 🏠 Home / Catálogo

- Exibição de produtos em grid responsivo
- Sistema de busca em tempo real
- Filtros por categoria (Consoles, Controles, Jogos, Contas digitais, Geek/Anime)
- Ordenação por: Top, Popular e Preço
- Sistema de favoritos integrado
- Badges informativos (Condição, Tipo de conta, Tags especiais)

### 🔐 Autenticação

- Sistema de login e registro
- Armazenamento no localStorage
- Validação de formulários
- Redirecionamento automático após login
- Proteção de rotas (páginas requerem login)

### 🛒 Carrinho de Compras

- Adicionar/remover produtos
- Controle de quantidade
- Cálculo automático de subtotal e total
- Suporte a variantes de produtos
- Persistência no localStorage
- Requer autenticação para acesso

### ❤️ Favoritos

- Adicionar/remover produtos dos favoritos
- Visualização de todos os produtos favoritados
- Sincronização com localStorage
- Indicador visual nos cards de produtos
- Requer autenticação para acesso

### 👤 Perfil

- Visualização de informações do usuário
- Edição de nome
- Estatísticas (compras, favoritos)
- Ações rápidas (Favoritos, Carrinho, Notificações)
- Opção de logout
- Requer autenticação para acesso

### 🔔 Notificações

- Sistema de notificações (pedidos, promoções, estoque, conta)
- Marcar como lida
- Marcar todas como lidas
- Indicador visual de notificações não lidas

### 📦 Página de Produto

- Imagem destacada do produto
- Informações detalhadas
- Seleção de variantes (tamanhos, versões)
- Atualização dinâmica de preço
- Adicionar ao carrinho
- Comprar agora (adiciona e redireciona)
- Badges informativos

## 🎨 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos personalizados
- **Bootstrap 5.3.8**: Framework CSS
- **Bootstrap Icons**: Ícones
- **JavaScript (ES6+)**: Lógica da aplicação

## 🚀 Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. Navegue pela loja e explore os produtos
3. Clique em "Ver detalhes" para acessar a página do produto
4. Para acessar Carrinho, Favoritos ou Perfil, faça login/cadastro
5. Teste as funcionalidades:
   - Adicione produtos ao carrinho
   - Favorite produtos
   - Finalize uma compra
   - Edite seu perfil

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a:

- Desktop (1440px+)
- Tablet (768px - 1439px)
- Mobile (< 768px)

## 💾 Armazenamento Local

Dados persistidos no localStorage:

- `lootGeekUsuario`: Usuário logado
- `lootGeekUsuarios`: Lista de usuários cadastrados
- `lootGeekCarrinho`: Itens no carrinho
- `lootGeekFavoritos`: Produtos favoritos

## 🔒 Fluxo de Autenticação

### Páginas Públicas

- `index.html` - Home/Catálogo
- `produto.html` - Detalhes do produto
- `login.html` - Login
- `registro.html` - Cadastro
- `notificacoes.html` - Notificações

### Páginas Protegidas (requerem login)

- `carrinho.html` - Carrinho
- `favoritos.html` - Favoritos
- `perfil.html` - Perfil

Ao tentar acessar uma página protegida sem estar logado, o usuário é redirecionado para a página de login com um parâmetro `redirect` que o leva de volta à página original após o login.

## 🎯 Funcionalidades JavaScript

### Funções de Autenticação

- `obterUsuarioLogado()`: Retorna o usuário logado
- `salvarUsuarioLogado(usuario)`: Salva o usuário logado
- `realizarLogin(email, senha)`: Efetua o login
- `realizarRegistro(nome, email, senha)`: Cadastra novo usuário
- `realizarLogout()`: Remove o usuário logado
- `verificarAutenticacao(redirect)`: Verifica se está logado

### Funções de Favoritos

- `obterFavoritos()`: Retorna lista de favoritos
- `salvarFavoritos(favoritos)`: Salva favoritos
- `adicionarAosFavoritos(produtoId)`: Adiciona aos favoritos
- `removerDosFavoritos(produtoId)`: Remove dos favoritos
- `estaNosForitos(produtoId)`: Verifica se está nos favoritos

### Funções de Carrinho

- `obterCarrinho()`: Retorna itens do carrinho
- `salvarCarrinho(carrinho)`: Salva carrinho
- `adicionarAoCarrinho(produtoId, quantidade, varianteId)`: Adiciona item
- `contarItensCarrinho(carrinho)`: Conta total de itens
- `atualizarContadorCarrinho(elemento)`: Atualiza badge visual

### Funções Auxiliares

- `formatarPrecoBRL(preco)`: Formata valor em R$
- `escapeHTML(valor)`: Escapa caracteres HTML
- `showToast(message)`: Exibe notificação toast

## 🎨 Padrão Visual

- **Tema**: Dark (Bootstrap data-bs-theme="dark")
- **Cor primária**: Roxo (#6d28d9)
- **Cards**: Bordas arredondadas (16px)
- **Botões**: Ícones do Bootstrap Icons
- **Tipografia**: Font-stack do Bootstrap
- **Animações**: Transições suaves (0.15s)

## 📝 Observações

- Botão "Filtrar" no header foi mantido conforme solicitado
- Não foi criada página de catálogo separada (home já funciona como catálogo)
- Bootstrap mantido em todas as páginas
- Código JavaScript organizado com funções nomeadas em português
- Sistema de toast para feedback visual
- Validação de formulários nativa do HTML5

## 🔄 Fluxo Completo

```
Home → Ver Detalhes → Produto → Adicionar ao Carrinho → Login/Registro → Carrinho → Finalizar Compra
                                     ↓
                              Adicionar Favoritos → Login/Registro → Favoritos
                                     ↓
                              Perfil → Editar Informações → Sair
```

## ⚡ Melhorias Futuras

- Implementar backend real
- Sistema de pagamento
- Histórico de pedidos
- Avaliações de produtos
- Sistema de busca avançada
- Filtros de preço
- Compartilhamento de produtos
- Lista de desejos pública

---

Desenvolvido com ❤️ para a Loot Geek
