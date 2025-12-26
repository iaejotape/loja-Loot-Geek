// ========================================
// LOOT GEEK - GAME STORE (Bootstrap Version)
// JavaScript Functionality
// ========================================

// ========================================
// AUTENTICAÇÃO (localStorage) - ESCOPO GLOBAL
// ========================================
function obterUsuarioLogado() {
  try {
    const raw = localStorage.getItem("lootGeekUsuario");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function salvarUsuarioLogado(usuario) {
  localStorage.setItem("lootGeekUsuario", JSON.stringify(usuario));
}

function realizarLogin(email, senha) {
  const usuarios = obterUsuariosCadastrados();
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
  if (usuario) {
    salvarUsuarioLogado({ email: usuario.email, nome: usuario.nome });
    return true;
  }
  return false;
}

function realizarRegistro(nome, email, senha) {
  const usuarios = obterUsuariosCadastrados();
  const jaExiste = usuarios.some((u) => u.email === email);
  if (jaExiste) return false;

  usuarios.push({ nome, email, senha });
  salvarUsuariosCadastrados(usuarios);
  salvarUsuarioLogado({ email, nome });
  return true;
}

function realizarLogout() {
  localStorage.removeItem("lootGeekUsuario");
}

function obterUsuariosCadastrados() {
  try {
    const raw = localStorage.getItem("lootGeekUsuarios");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function salvarUsuariosCadastrados(usuarios) {
  localStorage.setItem("lootGeekUsuarios", JSON.stringify(usuarios));
}

function verificarAutenticacao(redirecionarPara = "login.html") {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    window.location.href = redirecionarPara;
    return false;
  }
  return true;
}

// ========================================
// FAVORITOS (localStorage) - ESCOPO GLOBAL
// ========================================
function obterFavoritos() {
  try {
    const raw = localStorage.getItem("lootGeekFavoritos");
    const favoritos = raw ? JSON.parse(raw) : [];
    return Array.isArray(favoritos) ? favoritos : [];
  } catch {
    return [];
  }
}

function salvarFavoritos(favoritos) {
  localStorage.setItem("lootGeekFavoritos", JSON.stringify(favoritos));
}

function adicionarAosFavoritos(produtoId) {
  const favoritos = obterFavoritos();
  if (!favoritos.includes(produtoId)) {
    favoritos.push(produtoId);
    salvarFavoritos(favoritos);
    return true;
  }
  return false;
}

function removerDosFavoritos(produtoId) {
  const favoritos = obterFavoritos();
  const novos = favoritos.filter((id) => id !== produtoId);
  salvarFavoritos(novos);
  return favoritos.length !== novos.length;
}

function estaNosForitos(produtoId) {
  return obterFavoritos().includes(produtoId);
}

// ========================================
// CARRINHO (localStorage) - ESCOPO GLOBAL
// ========================================
function obterCarrinho() {
  try {
    const raw = localStorage.getItem("lootGeekCarrinho");
    const carrinho = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(carrinho)) return [];

    // Normaliza dados antigos (compatibilidade com versões anteriores)
    return carrinho
      .filter((item) => item && typeof item === "object")
      .map((item) => {
        const id = item.id || "";
        const varianteId = item.varianteId || "";
        const quantidade = Number.isFinite(item.quantidade)
          ? item.quantidade
          : 0;
        const chave = item.chave || criarChaveItemCarrinho(id, varianteId);
        return { chave, id, varianteId, quantidade };
      });
  } catch {
    return [];
  }
}

function salvarCarrinho(carrinho) {
  localStorage.setItem("lootGeekCarrinho", JSON.stringify(carrinho));
}

function contarItensCarrinho(carrinho) {
  return carrinho.reduce((total, item) => total + (item.quantidade || 0), 0);
}

function atualizarContadorCarrinho(elementoContador) {
  if (!elementoContador) return;
  const total = contarItensCarrinho(obterCarrinho());
  elementoContador.textContent = String(total);
}

function criarChaveItemCarrinho(produtoId, varianteId) {
  return varianteId ? `${produtoId}::${varianteId}` : produtoId;
}

function adicionarAoCarrinho(produtoId, quantidade, varianteId) {
  const qtd = Number.isFinite(quantidade) ? quantidade : 1;
  const carrinho = obterCarrinho();

  const chave = criarChaveItemCarrinho(produtoId, varianteId);

  const existente = carrinho.find((item) => item.chave === chave);
  if (existente) {
    existente.quantidade += qtd;
  } else {
    carrinho.push({
      chave,
      id: produtoId,
      varianteId: varianteId || "",
      quantidade: qtd,
    });
  }

  salvarCarrinho(carrinho);
}

// ========================================
// FUNÇÕES AUXILIARES - ESCOPO GLOBAL
// ========================================
function formatarPrecoBRL(preco) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function escapeHTML(valor) {
  return String(valor)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  // Remove existing toast
  const existingToast = document.querySelector(".toast-notification");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast-notification";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("is-hiding");
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

function obterProdutosDaLoja() {
  return [
    {
      id: "ps2",
      nome: "PS2 + HD + 1 controle original",
      categoria: "Consoles",
      categoriaRotulo: "Console",
      preco: 450.0,
      imagem: "./img/product/ps2.png",
      descricao:
        "PlayStation 2 com HD e 1 controle original. Ideal para curtir clássicos.",
      estoque: 3,
      entrega: "Retirada/Envio",
      garantiaDias: 30,
      versoes: [],
      detalhes: [
        "Produto revisado e testado",
        "Acompanha 1 controle original",
        "Pronto para jogar",
        "Garantia de 30 dias",
      ],
      condicao: "Usado",
      tipoConta: "",
      top: 9,
      popular: 7,
    },
    {
      id: "controle-ps4",
      nome: "Controle de PS4 original",
      categoria: "Controles",
      categoriaRotulo: "Controle",
      preco: 218.89,
      imagem: "./img/product/controleps4.png",
      descricao:
        "Controle original de PS4. Boa pegada e compatibilidade garantida.",
      estoque: 12,
      entrega: "Envio",
      garantiaDias: 30,
      versoes: [],
      detalhes: [
        "Produto original",
        "Compatível com PS4",
        "Garantia de 30 dias",
      ],
      condicao: "Novo",
      tipoConta: "",
      top: 8,
      popular: 9,
    },
    {
      id: "pendrive-opl",
      nome: "Pendrive com jogos OPL",
      categoria: "Jogos",
      categoriaRotulo: "Pendrive",
      preco: 89.9,
      imagem: "./img/product/pendrive.png",
      descricao:
        "Pendrive preparado com jogos para OPL. Prático para levar e usar.",
      estoque: 25,
      entrega: "Envio",
      garantiaDias: 7,
      versoes: [],
      detalhes: [
        "Pronto para usar",
        "Compatível com OPL",
        "Garantia de 7 dias",
      ],
      condicao: "Novo",
      tipoConta: "",
      top: 7,
      popular: 8,
    },
    {
      id: "conta-steam",
      nome: "Conta Steam com diversos jogos",
      categoria: "Contas digitais",
      categoriaRotulo: "Conta",
      preco: 199.9,
      imagem: "./img/product/steam.png",
      descricao:
        "Conta Steam com biblioteca variada. Ótima para quem quer começar já jogando.",
      estoque: 25,
      entrega: "Entrega imediata",
      garantiaDias: 30,
      tags: ["Entrega imediata"],
      versoes: [
        { id: "privada", nome: "Conta privada", preco: 199.9 },
        { id: "compartilhada", nome: "Conta compartilhada", preco: 149.9 },
      ],
      detalhes: [
        "Entrega automática",
        "Ativação via link",
        "Uso em conta pessoal",
        "Garantia de 30 dias",
      ],
      condicao: "",
      tipoConta: "Conta privada",
      top: 8,
      popular: 7,
    },
    {
      id: "canva-pro",
      nome: "Canva PRO",
      categoria: "Contas digitais",
      categoriaRotulo: "Conta",
      preco: 4.99,
      imagem: "./img/product/canva.png",
      descricao: "Acesso ao Canva PRO para criar designs com mais recursos.",
      estoque: 25,
      entrega: "Entrega imediata",
      garantiaDias: 30,
      tags: ["Convite Premium", "Entrega imediata"],
      versoes: [
        { id: "convite", nome: "Canva PRO Convite", preco: 4.99 },
        { id: "compartilhada", nome: "Canva PRO Compartilhada", preco: 3.0 },
      ],
      detalhes: [
        "Entrega automática",
        "Ativação via Link (convite)",
        "Uso em sua Conta Pessoal",
        "Acesso a recursos Premium",
        "Garantia de 30 dias",
      ],
      condicao: "",
      tipoConta: "",
      top: 6,
      popular: 9,
    },
    {
      id: "camisa-aot",
      nome: "Camisa Anime Attack on Titan",
      categoria: "Geek/Anime",
      categoriaRotulo: "Camisa",
      preco: 129.9,
      imagem: "./img/product/camisa.png",
      descricao:
        "Camisa temática de Attack on Titan. Presente perfeito para fãs.",
      estoque: 8,
      entrega: "Envio",
      garantiaDias: 7,
      versoes: [
        { id: "p", nome: "Tamanho P", preco: 129.9 },
        { id: "m", nome: "Tamanho M", preco: 129.9 },
        { id: "g", nome: "Tamanho G", preco: 129.9 },
      ],
      detalhes: [
        "Tecido confortável",
        "Estampa temática",
        "Garantia de 7 dias",
      ],
      condicao: "Novo",
      tipoConta: "",
      top: 7,
      popular: 6,
    },
    {
      id: "volante-gamer",
      nome: "Volante Gamer PC, PS, Xbox",
      categoria: "Controles",
      categoriaRotulo: "Controle",
      preco: 499.9,
      imagem: "./img/product/volante.png",
      descricao:
        "Volante gamer compatível com PC e consoles. Para jogos de corrida.",
      estoque: 4,
      entrega: "Envio",
      garantiaDias: 30,
      versoes: [],
      detalhes: [
        "Compatível PC/PS/Xbox",
        "Bom para simulação",
        "Garantia de 30 dias",
      ],
      condicao: "Usado",
      tipoConta: "",
      top: 9,
      popular: 8,
    },
    {
      id: "kit-gamer",
      nome: "Kit gamer completo",
      categoria: "Geek/Anime",
      categoriaRotulo: "Kit",
      preco: 119.9,
      imagem: "./img/product/kitgamer.png",
      descricao: "Kit gamer para completar o setup. Boa opção pra presente.",
      estoque: 10,
      entrega: "Envio",
      garantiaDias: 7,
      versoes: [],
      detalhes: [
        "Boa opção para presente",
        "Completa o setup",
        "Garantia de 7 dias",
      ],
      condicao: "Novo",
      tipoConta: "",
      top: 6,
      popular: 7,
    },
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cartCount = document.getElementById("cartCount");

  const productsGrid = document.getElementById("productsGrid");
  const productDetail = document.getElementById("productDetail");

  const headerFilterBtn = document.getElementById("headerFilterBtn");
  const toggleHomeFiltersBtn = document.getElementById("toggleHomeFiltersBtn");
  const homeFiltersPanel = document.getElementById("homeFiltersPanel");
  const homeCategoryFilters = document.getElementById("homeCategoryFilters");

  // ========================================
  // NAVEGAÇÃO GLOBAL
  // ========================================
  const favoritosBtn = document.getElementById("favoritosBtn");
  const perfilBtn = document.getElementById("perfilBtn");
  const notificacoesBtn = document.getElementById("notificacoesBtn");
  const cartBtn = document.getElementById("cartBtn");

  if (favoritosBtn) {
    favoritosBtn.addEventListener("click", () => {
      const usuario = obterUsuarioLogado();
      if (!usuario) {
        window.location.href = "login.html?redirect=favoritos.html";
      } else {
        window.location.href = "favoritos.html";
      }
    });
  }

  if (perfilBtn) {
    perfilBtn.addEventListener("click", () => {
      const usuario = obterUsuarioLogado();
      if (!usuario) {
        window.location.href = "login.html?redirect=perfil.html";
      } else {
        window.location.href = "perfil.html";
      }
    });
  }

  if (notificacoesBtn) {
    notificacoesBtn.addEventListener("click", () => {
      window.location.href = "notificacoes.html";
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      const usuario = obterUsuarioLogado();
      if (!usuario) {
        window.location.href = "login.html?redirect=carrinho.html";
      } else {
        window.location.href = "carrinho.html";
      }
    });
  }

  const produtos = obterProdutosDaLoja();

  atualizarContadorCarrinho(cartCount);

  // ========================================
  // WISHLIST TOGGLE
  // ========================================
  configurarWishlistPorDelegacao();

  // ========================================
  // NAVEGAÇÃO DO CARD (UX)
  // ========================================
  // Escolha do CTA: "Ver detalhes".
  // Motivo: em e-commerce, quando o clique no card leva à página do produto,
  // o texto mais claro é direcionar para detalhes. O "Adicionar ao carrinho"
  // fica como ação principal dentro da tela do produto.
  configurarCliqueCardParaDetalhes();

  // ========================================
  // HOME (produtos + filtros)
  // ========================================
  if (productsGrid) {
    inicializarHome({
      produtos,
      productsGrid,
      searchInput,
      headerFilterBtn,
      toggleHomeFiltersBtn,
      homeFiltersPanel,
      homeCategoryFilters,
    });
  }

  // ========================================
  // TELA DE PRODUTO
  // ========================================
  if (productDetail) {
    inicializarTelaDeProduto({ produtos, productDetail, cartCount });
  }

  // ========================================
  // HOME: busca simples (esconde cards)
  // ========================================
  function inicializarHome({
    produtos,
    productsGrid,
    searchInput,
    headerFilterBtn,
    toggleHomeFiltersBtn,
    homeFiltersPanel,
    homeCategoryFilters,
  }) {
    const estado = {
      termoBusca: "",
      categoria: "todas",
      ordenacao: "top",
    };

    function aplicarFiltrosEOrdenacao() {
      let lista = [...produtos];

      if (estado.categoria !== "todas") {
        lista = lista.filter(
          (p) => normalizarCategoria(p.categoria) === estado.categoria
        );
      }

      if (estado.termoBusca) {
        const termo = estado.termoBusca;
        lista = lista.filter((p) => {
          const nome = p.nome.toLowerCase();
          const categoria = p.categoria.toLowerCase();
          const rotulo = (p.categoriaRotulo || "").toLowerCase();
          return (
            nome.includes(termo) ||
            categoria.includes(termo) ||
            rotulo.includes(termo)
          );
        });
      }

      if (estado.ordenacao === "popular") {
        lista.sort((a, b) => (b.popular || 0) - (a.popular || 0));
      } else if (estado.ordenacao === "preco") {
        lista.sort((a, b) => (a.preco || 0) - (b.preco || 0));
      } else {
        lista.sort((a, b) => (b.top || 0) - (a.top || 0));
      }

      renderizarCatalogo(productsGrid, lista);
    }

    // Render inicial
    aplicarFiltrosEOrdenacao();

    // Busca
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        estado.termoBusca = e.target.value.toLowerCase().trim();
        aplicarFiltrosEOrdenacao();
      });
    }

    // Ordenação (botões Top/Popular/Preço)
    document.querySelectorAll(".btn-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".btn-filter")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        estado.ordenacao = btn.dataset.sort || "top";
        aplicarFiltrosEOrdenacao();
      });
    });

    // Toggle painel de categorias
    function alternarPainelFiltros() {
      if (!homeFiltersPanel) return;
      homeFiltersPanel.classList.toggle("d-none");
      document
        .getElementById("produtos")
        ?.scrollIntoView({ behavior: "smooth" });
    }

    headerFilterBtn?.addEventListener("click", alternarPainelFiltros);
    toggleHomeFiltersBtn?.addEventListener("click", alternarPainelFiltros);

    // Categorias
    homeCategoryFilters?.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-category");
      if (!btn) return;
      const novaCategoria = btn.dataset.categoria;
      if (!novaCategoria) return;

      estado.categoria = novaCategoria;
      homeCategoryFilters
        .querySelectorAll(".btn-category")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      aplicarFiltrosEOrdenacao();
    });
  }

  // ========================================
  // UI: wishlist (delegação)
  // ========================================
  function configurarWishlistPorDelegacao() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-wishlist");
      if (!btn) return;

      e.preventDefault();

      // Verificar se usuário está logado
      const usuario = obterUsuarioLogado();
      if (!usuario) {
        window.location.href =
          "login.html?redirect=" +
          encodeURIComponent(window.location.pathname + window.location.search);
        return;
      }

      const item = btn.closest(".product-item, .col-6, .col-md-4, .col-lg-3");
      const produtoId =
        item?.dataset?.produtoId || btn.dataset?.removerFavorito;
      if (!produtoId) return;

      const icon = btn.querySelector("i");
      if (!icon) return;

      if (icon.classList.contains("bi-heart")) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
        btn.classList.add("active");
        adicionarAosFavoritos(produtoId);
        showToast("Adicionado aos favoritos.");
        return;
      }

      icon.classList.remove("bi-heart-fill");
      icon.classList.add("bi-heart");
      btn.classList.remove("active");
      removerDosFavoritos(produtoId);
      showToast("Removido dos favoritos");
    });
  }

  // ========================================
  // UI: clique do card -> detalhes
  // ========================================
  function configurarCliqueCardParaDetalhes() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-add-cart");
      if (!btn) return;

      const item = btn.closest(".product-item");
      const produtoId = item?.dataset?.produtoId;
      if (!produtoId) return;

      e.preventDefault();
      window.location.href = `produto.html?id=${encodeURIComponent(produtoId)}`;
    });
  }

  function normalizarCategoria(categoria) {
    const c = (categoria || "").toLowerCase();
    if (c.includes("console")) return "consoles";
    if (c.includes("controle")) return "controles";
    if (c.includes("jogo")) return "jogos";
    if (c.includes("contas")) return "contas";
    if (c.includes("geek") || c.includes("anime")) return "geek";
    return "todas";
  }

  function formatarPrecoBRL(preco) {
    return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function renderizarCatalogo(container, lista) {
    container.innerHTML = lista.map(gerarCardProdutoHTML).join("");
  }

  function gerarCardProdutoHTML(produto) {
    const badges = [];
    if (produto.condicao) {
      badges.push(
        `<span class="badge product-badge product-condition">${escapeHTML(
          produto.condicao
        )}</span>`
      );
    }
    if (produto.tipoConta) {
      badges.push(
        `<span class="badge product-badge product-account">${escapeHTML(
          produto.tipoConta
        )}</span>`
      );
    }

    if (Array.isArray(produto.tags)) {
      produto.tags
        .filter((t) => typeof t === "string" && t.trim())
        .forEach((t) => {
          badges.push(
            `<span class="badge product-badge">${escapeHTML(t)}</span>`
          );
        });
    }

    const badgesHTML = badges.length
      ? `<div class="d-flex flex-wrap gap-1 mb-2 product-badges">${badges.join(
          ""
        )}</div>`
      : "";

    // Verificar se está nos favoritos
    const favoritos = obterFavoritos();
    const ehFavorito = favoritos.includes(produto.id);
    const classeAtiva = ehFavorito ? "active" : "";
    const icone = ehFavorito ? "bi-heart-fill" : "bi-heart";

    return `
      <div class="col-6 col-md-4 col-lg-3 product-item" data-produto-id="${escapeHTML(
        produto.id
      )}">
        <div class="card product-card h-100">
          <div class="card-img-wrapper position-relative">
            <img src="${escapeHTML(
              produto.imagem
            )}" class="card-img-top" alt="${escapeHTML(produto.nome)}" />
            <button class="btn btn-wishlist position-absolute ${classeAtiva}" type="button">
              <i class="bi ${icone}"></i>
            </button>
          </div>
          <div class="card-body">
            <h5 class="card-title product-name">${escapeHTML(produto.nome)}</h5>
            <p class="text-muted small mb-1 product-category">${escapeHTML(
              produto.categoriaRotulo || produto.categoria
            )}</p>
            ${badgesHTML}
            <p class="product-price fw-bold mb-3">${formatarPrecoBRL(
              produto.preco
            )}</p>
            <button class="btn btn-primary btn-add-cart w-100" type="button">
              <i class="bi bi-eye me-2"></i>
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
    `.trim();
  }

  function escapeHTML(valor) {
    return String(valor)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ========================================
  // PRODUTO: render + adicionar ao carrinho
  // ========================================
  function inicializarTelaDeProduto({ produtos, productDetail, cartCount }) {
    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get("id");

    const produto = produtos.find((p) => p.id === produtoId);
    if (!produto) {
      productDetail.innerHTML = `
        <div class="alert alert-secondary" role="alert">
          Produto não encontrado.
        </div>
      `;
      return;
    }

    const badges = [];
    if (produto.condicao) {
      badges.push(
        `<span class="badge product-badge product-condition">${escapeHTML(
          produto.condicao
        )}</span>`
      );
    }
    if (produto.tipoConta) {
      badges.push(
        `<span class="badge product-badge product-account">${escapeHTML(
          produto.tipoConta
        )}</span>`
      );
    }

    const badgesHTML = badges.length
      ? `<div class="d-flex flex-wrap gap-1 mb-3 product-badges">${badges.join(
          ""
        )}</div>`
      : "";

    const temVersoes =
      Array.isArray(produto.versoes) && produto.versoes.length > 0;
    const versaoPadrao = temVersoes ? produto.versoes[0] : null;
    const precoBase = versaoPadrao?.preco ?? produto.preco;

    const estoqueTexto = Number.isFinite(produto.estoque)
      ? `${produto.estoque} itens em estoque`
      : "Disponível";

    const entregaTexto = produto.entrega || "Entrega";
    const garantiaTexto = Number.isFinite(produto.garantiaDias)
      ? `Garantia: ${produto.garantiaDias} dias`
      : "Garantia";

    const versoesHTML = temVersoes
      ? `
        <div class="mt-3">
          <p class="text-muted small mb-2">Escolha uma versão:</p>
          <div class="d-grid gap-2" id="versionsGroup">
            ${produto.versoes
              .map((v, idx) => {
                const checked = idx === 0 ? "checked" : "";
                return `
                  <label class="d-flex align-items-center justify-content-between border rounded-3 p-2">
                    <span class="d-flex align-items-center gap-2">
                      <input class="form-check-input m-0" type="radio" name="versao" value="${escapeHTML(
                        v.id
                      )}" ${checked} />
                      <span class="small fw-semibold">${escapeHTML(
                        v.nome
                      )}</span>
                    </span>
                    <span class="small text-muted">${formatarPrecoBRL(
                      v.preco
                    )}</span>
                  </label>
                `.trim();
              })
              .join("")}
          </div>
        </div>
      `.trim()
      : "";

    const detalhes = Array.isArray(produto.detalhes) ? produto.detalhes : [];
    const detalhesHTML = detalhes.length
      ? `
        <ul class="list-unstyled mb-0">
          ${detalhes
            .map(
              (item) =>
                `<li class="d-flex gap-2 align-items-start mb-2"><i class="bi bi-check2 text-success"></i><span>${escapeHTML(
                  item
                )}</span></li>`
            )
            .join("")}
        </ul>
      `.trim()
      : `<p class="text-muted mb-0">${escapeHTML(produto.descricao)}</p>`;

    productDetail.innerHTML = `
      <div class="row g-4 align-items-start">
        <div class="col-12 col-lg-7">
          <img
            src="${escapeHTML(produto.imagem)}"
            alt="${escapeHTML(produto.nome)}"
            class="product-detail-img"
          />

          <div class="card product-card mt-4">
            <div class="card-body">
              <div class="d-flex align-items-center gap-2 mb-3">
                <i class="bi bi-card-text"></i>
                <span class="fw-semibold">Descrição</span>
              </div>
              <h2 class="h5 fw-semibold mb-3">${escapeHTML(produto.nome)}</h2>
              ${detalhesHTML}
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-5">
          <div class="card product-card">
            <div class="card-body">
              <h1 class="h4 fw-semibold mb-2 text-uppercase">${escapeHTML(
                produto.nome
              )}</h1>

              <p class="text-muted small mb-2">Categoria: ${escapeHTML(
                produto.categoria
              )}</p>

              ${badgesHTML}

              <p class="product-price fw-bold mb-2" id="productPrice">${formatarPrecoBRL(
                precoBase
              )} <span class="text-muted fw-normal small">unidade</span></p>

              <div class="d-grid gap-2 mb-3">
                <div class="d-flex align-items-center gap-2 text-muted small">
                  <i class="bi bi-box-seam"></i>
                  <span>${escapeHTML(estoqueTexto)}</span>
                </div>
                <div class="d-flex align-items-center gap-2 text-muted small">
                  <i class="bi bi-lightning-charge"></i>
                  <span>${escapeHTML(entregaTexto)}</span>
                </div>
                <div class="d-flex align-items-center gap-2 text-muted small">
                  <i class="bi bi-shield-check"></i>
                  <span>${escapeHTML(garantiaTexto)}</span>
                </div>
              </div>

              ${versoesHTML}

              <div class="d-grid gap-2 mt-4">
                <button class="btn btn-primary w-100" id="buyNowBtn" type="button">
                  <i class="bi bi-bag-check me-2"></i>
                  Comprar agora
                </button>
                <button
                  class="btn btn-outline-secondary w-100"
                  id="addToCartBtn"
                  type="button"
                >
                  <i class="bi bi-cart-plus me-2"></i>
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>

          <div class="row g-3 mt-1">
            <div class="col-12 col-md-6">
              <div class="card product-card h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-lightning-charge"></i>
                    <div>
                      <div class="small fw-semibold">Entrega</div>
                      <div class="text-muted small">${escapeHTML(
                        entregaTexto
                      )}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="card product-card h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-shield-check"></i>
                    <div>
                      <div class="small fw-semibold">Compra segura</div>
                      <div class="text-muted small">Proteção e suporte</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `.trim();

    const productPrice = document.getElementById("productPrice");

    function obterVarianteSelecionada() {
      if (!temVersoes) return { id: "", preco: produto.preco };

      const selecionado = document.querySelector(
        'input[name="versao"]:checked'
      );
      const varianteId = selecionado?.value || versaoPadrao?.id || "";
      const variante =
        produto.versoes.find((v) => v.id === varianteId) || versaoPadrao;
      return {
        id: variante?.id || "",
        preco: variante?.preco ?? produto.preco,
      };
    }

    if (temVersoes) {
      document
        .getElementById("versionsGroup")
        ?.addEventListener("change", () => {
          const variante = obterVarianteSelecionada();
          if (productPrice) {
            productPrice.innerHTML = `${formatarPrecoBRL(
              variante.preco
            )} <span class="text-muted fw-normal small">unidade</span>`;
          }
        });
    }

    const addToCartBtn = document.getElementById("addToCartBtn");
    const buyNowBtn = document.getElementById("buyNowBtn");

    function adicionarSelecionadoAoCarrinho() {
      const variante = obterVarianteSelecionada();
      adicionarAoCarrinho(produto.id, 1, variante.id);
      atualizarContadorCarrinho(cartCount);
    }

    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        adicionarSelecionadoAoCarrinho();
        showToast("Produto adicionado ao carrinho.");
      });
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        adicionarSelecionadoAoCarrinho();
        showToast("Compra simulada: item adicionado ao carrinho.");
        setTimeout(() => {
          window.location.href = "index.html#produtos";
        }, 600);
      });
    }
  }
});
