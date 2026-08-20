"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: "Masculino" | "Feminino" | "Acessórios";
  type: string;
  price: number;
  color: string;
  tag?: string;
  image: string;
  imageAlt: string;
  description: string;
};

type CartItem = Product & { quantity: number; size: string };
type View = "home" | "catalog" | "product" | "cart" | "checkout" | "success";

const products: Product[] = [
  {
    id: 1,
    name: "AeroShell Pro Jacket",
    category: "Masculino",
    type: "Jaquetas",
    price: 1299,
    color: "Preto",
    tag: "NOVO",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Jaqueta esportiva preta",
    description:
      "Proteção ultraleve para movimento sem limites. Construção respirável com acabamento repelente à água e recortes ergonômicos.",
  },
  {
    id: 2,
    name: "Motion Sculpt Legging",
    category: "Feminino",
    type: "Calças",
    price: 699,
    color: "Graphite",
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Mulher com legging esportiva",
    description:
      "Compressão precisa e toque de segunda pele. Desenvolvida para acompanhar treinos intensos e rotinas urbanas.",
  },
  {
    id: 3,
    name: "Vector Knit Runner",
    category: "Masculino",
    type: "Calçados",
    price: 1099,
    color: "Cinza",
    tag: "EXCLUSIVO",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Tênis esportivo premium",
    description:
      "Retorno de energia e leveza em cada passada. Cabedal knit adaptável e entressola responsiva de dupla densidade.",
  },
  {
    id: 4,
    name: "Core Form Bra",
    category: "Feminino",
    type: "Tops",
    price: 449,
    color: "Oliva",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Top esportivo feminino",
    description:
      "Suporte médio com construção minimalista. Tecido macio, respirável e alças que distribuem a pressão.",
  },
  {
    id: 5,
    name: "Altitude Puffer Vest",
    category: "Masculino",
    type: "Jaquetas",
    price: 899,
    color: "Areia",
    tag: "NOVO",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Colete esportivo",
    description:
      "Isolamento térmico sem volume excessivo. Uma camada versátil criada para mudanças rápidas de temperatura.",
  },
  {
    id: 6,
    name: "Studio Flow Set",
    category: "Feminino",
    type: "Conjuntos",
    price: 849,
    color: "Chocolate",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Conjunto esportivo feminino",
    description:
      "Equilíbrio entre fluidez e sustentação. Um conjunto essencial para yoga, pilates e momentos de pausa.",
  },
  {
    id: 7,
    name: "Orbit Training Duffel",
    category: "Acessórios",
    type: "Bolsas",
    price: 749,
    color: "Preto",
    tag: "EXCLUSIVO",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Bolsa de treino preta",
    description:
      "Organização inteligente em uma silhueta arquitetônica. Compartimento ventilado e acabamento resistente.",
  },
  {
    id: 8,
    name: "Thermo Steel Flask",
    category: "Acessórios",
    type: "Equipamentos",
    price: 289,
    color: "Prata",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=90",
    imageAlt: "Garrafa térmica metálica",
    description:
      "Aço inoxidável de parede dupla mantém a temperatura por até 24 horas. Design preciso, sem excessos.",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);

function Icon({
  name,
  size = 20,
}: {
  name: "bag" | "search" | "arrow" | "menu" | "close" | "minus" | "plus";
  size?: number;
}) {
  const paths = {
    bag: <><path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    menu: <><path d="M4 8h16M4 16h16" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    minus: <path d="M6 12h12" />,
    plus: <path d="M12 6v12M6 12h12" />,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export default function SigmaStore() {
  const [view, setView] = useState<View>("home");
  const [activeProduct, setActiveProduct] = useState<Product>(products[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("Destaques");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  const navigate = (next: View) => {
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (product) =>
        (category === "Todos" || product.category === category) &&
        product.name.toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "Menor preço") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "Maior preço") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [category, query, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const openProduct = (product: Product) => {
    setActiveProduct(product);
    setSelectedSize("M");
    navigate("product");
  };

  const addToCart = (product: Product, size = "M") => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id && item.size === size,
      );
      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { ...product, quantity: 1, size }];
    });
  };

  const updateQuantity = (id: number, size: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <main>
      <div className="announcement">
        FRETE GRÁTIS EM PEDIDOS ACIMA DE R$ 700
        <span>DEVOLUÇÕES GRATUITAS EM ATÉ 30 DIAS</span>
      </div>

      <header className="header">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <button className="logo" onClick={() => navigate("home")}>SIGMA<span>®</span></button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <button onClick={() => { setCategory("Masculino"); navigate("catalog"); }}>MASCULINO</button>
          <button onClick={() => { setCategory("Feminino"); navigate("catalog"); }}>FEMININO</button>
          <button onClick={() => { setCategory("Acessórios"); navigate("catalog"); }}>ACESSÓRIOS</button>
          <button onClick={() => { setCategory("Todos"); navigate("catalog"); }}>COLEÇÃO</button>
        </nav>
        <div className="header-actions">
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Buscar"><Icon name="search" /></button>
          <button className="bag-button" onClick={() => navigate("cart")} aria-label="Carrinho">
            <Icon name="bag" />
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>
        </div>
        {searchOpen && (
          <div className="search-panel">
            <Icon name="search" size={24} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && navigate("catalog")}
              placeholder="O que você procura?"
            />
            <button onClick={() => setSearchOpen(false)}><Icon name="close" /></button>
          </div>
        )}
      </header>

      {view === "home" && (
        <>
          <section className="hero">
            <div className="hero-photo" />
            <div className="hero-noise" />
            <div className="hero-content">
              <p className="eyebrow">COLEÇÃO 01 / 2026</p>
              <h1>FORMA.<br /><em>FORÇA.</em><br />FLUXO.</h1>
              <p className="hero-copy">
                Performance elevada ao essencial.<br />
                Criado para quem nunca para.
              </p>
              <button className="primary light" onClick={() => navigate("catalog")}>
                EXPLORAR COLEÇÃO <Icon name="arrow" />
              </button>
            </div>
            <div className="hero-index">01<span>/ 03</span></div>
            <div className="orb orb-one" />
            <div className="orb orb-two" />
          </section>

          <section className="statement">
            <p className="eyebrow">NOSSO PROPÓSITO</p>
            <h2>O CORPO EM MOVIMENTO<br />É UMA <i>OBRA DE ARTE.</i></h2>
            <div className="statement-copy">
              <p>
                Desenvolvemos peças de alta performance que eliminam distrações
                e amplificam o potencial humano.
              </p>
              <button className="text-link">CONHEÇA A SIGMA <Icon name="arrow" /></button>
            </div>
          </section>

          <section className="featured section-pad">
            <div className="section-heading">
              <div><p className="eyebrow">SELEÇÃO SIGMA</p><h2>DESTAQUES</h2></div>
              <button className="text-link" onClick={() => navigate("catalog")}>VER TODOS <Icon name="arrow" /></button>
            </div>
            <div className="product-grid home-grid">
              {products.slice(0, 4).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  featured={index === 0}
                  onOpen={openProduct}
                  onAdd={addToCart}
                />
              ))}
            </div>
          </section>

          <section className="technology">
            <div className="tech-visual">
              <div className="tech-ring ring-a" />
              <div className="tech-ring ring-b" />
              <div className="tech-sphere" />
              <span className="coordinate top">37.7749° N</span>
              <span className="coordinate bottom">122.4194° W</span>
            </div>
            <div className="tech-copy">
              <p className="eyebrow">SIGMA / LAB 01</p>
              <h2>ENGENHARIA<br />DO <i>MOVIMENTO.</i></h2>
              <p>
                Tecidos mapeados pelo corpo, construção de precisão e tecnologia
                que responde à intensidade. Cada detalhe existe por uma razão.
              </p>
              <div className="tech-stats">
                <div><strong>4-WAY</strong><span>ELASTICIDADE</span></div>
                <div><strong>0.4mm</strong><span>MICROFIBRA</span></div>
                <div><strong>24H</strong><span>CONTROLE TÉRMICO</span></div>
              </div>
            </div>
          </section>

          <section className="categories section-pad">
            <p className="eyebrow">EXPLORE POR UNIVERSO</p>
            <div className="category-grid">
              {[
                ["Masculino", "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=85"],
                ["Feminino", "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=85"],
                ["Acessórios", "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1000&q=85"],
              ].map(([name, image]) => (
                <button
                  key={name}
                  className="category-card"
                  style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.7), transparent 65%), url("${image}")` }}
                  onClick={() => { setCategory(name); navigate("catalog"); }}
                >
                  <span>{name.toUpperCase()}</span><Icon name="arrow" />
                </button>
              ))}
            </div>
          </section>

          <section className="newsletter">
            <p className="eyebrow">SIGMA / PRIVATE ACCESS</p>
            <h2>ENTRE NO <i>FLUXO.</i></h2>
            <p>Receba acesso antecipado a lançamentos, histórias e experiências SIGMA.</p>
            <form onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder="SEU MELHOR E-MAIL" aria-label="E-mail" />
              <button aria-label="Enviar"><Icon name="arrow" /></button>
            </form>
          </section>
        </>
      )}

      {view === "catalog" && (
        <section className="catalog section-pad">
          <div className="catalog-title">
            <p className="eyebrow">COLEÇÃO 01 / 2026</p>
            <h1>{category === "Todos" ? "TODOS OS PRODUTOS" : category.toUpperCase()}</h1>
            <p>{filteredProducts.length} PRODUTOS</p>
          </div>
          <div className="filters">
            <div className="filter-tabs">
              {["Todos", "Masculino", "Feminino", "Acessórios"].map((item) => (
                <button
                  className={category === item ? "active" : ""}
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <label>
              ORDENAR
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option>Destaques</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
              </select>
            </label>
          </div>
          <div className="product-grid catalog-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOpen={openProduct} onAdd={addToCart} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="empty-state">
              <h2>NENHUM RESULTADO.</h2>
              <button className="primary" onClick={() => setQuery("")}>LIMPAR BUSCA</button>
            </div>
          )}
        </section>
      )}

      {view === "product" && (
        <section className="product-page">
          <div className="product-gallery">
            <img src={activeProduct.image} alt={activeProduct.imageAlt} />
            <div className="gallery-mark">Σ</div>
          </div>
          <div className="product-info">
            <button className="back-link" onClick={() => navigate("catalog")}>← VOLTAR À COLEÇÃO</button>
            <p className="eyebrow">{activeProduct.category} / {activeProduct.type}</p>
            <h1>{activeProduct.name.toUpperCase()}</h1>
            <p className="product-price">{formatPrice(activeProduct.price)}</p>
            <p className="installments">OU 10X DE {formatPrice(activeProduct.price / 10)} SEM JUROS</p>
            <p className="product-description">{activeProduct.description}</p>
            <div className="size-label"><strong>TAMANHO</strong><button>GUIA DE MEDIDAS</button></div>
            <div className="sizes">
              {["PP", "P", "M", "G", "GG"].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              className="primary add-main"
              onClick={() => { addToCart(activeProduct, selectedSize); navigate("cart"); }}
            >
              ADICIONAR AO CARRINHO <span>{formatPrice(activeProduct.price)}</span>
            </button>
            <div className="benefits">
              <div><b>01</b><span>FRETE GRÁTIS<br /><small>ACIMA DE R$ 700</small></span></div>
              <div><b>02</b><span>TROCA FÁCIL<br /><small>ATÉ 30 DIAS</small></span></div>
              <div><b>03</b><span>COMPRA SEGURA<br /><small>CRIPTOGRAFIA SSL</small></span></div>
            </div>
            <details><summary>DETALHES & COMPOSIÇÃO</summary><p>Materiais técnicos de alto desempenho, acabamento premium e construção pensada para durar.</p></details>
            <details><summary>CUIDADOS</summary><p>Lavar em ciclo delicado e secar naturalmente. Não utilizar alvejante.</p></details>
          </div>
        </section>
      )}

      {view === "cart" && (
        <section className="cart-page section-pad">
          <div className="cart-heading"><p className="eyebrow">SUA SELEÇÃO</p><h1>CARRINHO <sup>{cartCount}</sup></h1></div>
          {cart.length === 0 ? (
            <div className="empty-state">
              <h2>SEU CARRINHO ESTÁ VAZIO.</h2>
              <p>Explore peças criadas para elevar cada movimento.</p>
              <button className="primary" onClick={() => navigate("catalog")}>EXPLORAR COLEÇÃO</button>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <article className="cart-item" key={`${item.id}-${item.size}`}>
                    <img src={item.image} alt={item.imageAlt} />
                    <div className="cart-item-info">
                      <div><p className="eyebrow">{item.category}</p><h2>{item.name}</h2></div>
                      <p>Cor: {item.color}<br />Tamanho: {item.size}</p>
                      <div className="quantity">
                        <button onClick={() => updateQuantity(item.id, item.size, -1)}><Icon name="minus" size={16} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, 1)}><Icon name="plus" size={16} /></button>
                      </div>
                    </div>
                    <strong>{formatPrice(item.price * item.quantity)}</strong>
                  </article>
                ))}
              </div>
              <aside className="cart-summary">
                <h2>RESUMO</h2>
                <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
                <div><span>Entrega</span><strong>{subtotal >= 700 ? "GRÁTIS" : formatPrice(39)}</strong></div>
                <div className="total"><span>TOTAL</span><strong>{formatPrice(subtotal + (subtotal >= 700 ? 0 : 39))}</strong></div>
                <p>EM ATÉ 10X SEM JUROS</p>
                <button className="primary" onClick={() => navigate("checkout")}>FINALIZAR COMPRA <Icon name="arrow" /></button>
                <small>COMPRA SEGURA E CRIPTOGRAFADA</small>
              </aside>
            </div>
          )}
        </section>
      )}

      {view === "checkout" && (
        <section className="checkout-page section-pad">
          <button className="back-link" onClick={() => navigate("cart")}>← VOLTAR AO CARRINHO</button>
          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setCart([]); navigate("success"); }}>
              <p className="eyebrow">CHECKOUT SEGURO</p>
              <h1>FINALIZE<br />SEU PEDIDO.</h1>
              <fieldset>
                <legend>01 — CONTATO</legend>
                <label>E-MAIL<input required type="email" placeholder="voce@email.com" /></label>
                <label>CPF<input required inputMode="numeric" placeholder="000.000.000-00" /></label>
              </fieldset>
              <fieldset>
                <legend>02 — ENTREGA</legend>
                <div className="input-row">
                  <label>NOME<input required placeholder="Seu nome" /></label>
                  <label>SOBRENOME<input required placeholder="Sobrenome" /></label>
                </div>
                <label>CEP<input required placeholder="00000-000" /></label>
                <label>ENDEREÇO<input required placeholder="Rua, avenida..." /></label>
                <div className="input-row small">
                  <label>NÚMERO<input required placeholder="123" /></label>
                  <label>COMPLEMENTO<input placeholder="Apto, bloco..." /></label>
                </div>
              </fieldset>
              <fieldset>
                <legend>03 — PAGAMENTO</legend>
                <div className="payment-tabs"><button type="button" className="active">CARTÃO</button><button type="button">PIX</button></div>
                <label>NÚMERO DO CARTÃO<input required placeholder="0000 0000 0000 0000" /></label>
                <label>NOME NO CARTÃO<input required placeholder="COMO IMPRESSO NO CARTÃO" /></label>
                <div className="input-row small">
                  <label>VALIDADE<input required placeholder="MM / AA" /></label>
                  <label>CVV<input required placeholder="000" /></label>
                </div>
              </fieldset>
              <button className="primary checkout-button" type="submit">CONFIRMAR PEDIDO <span>{formatPrice(subtotal + (subtotal >= 700 ? 0 : 39))}</span></button>
            </form>
            <aside className="order-review">
              <h2>SEU PEDIDO <span>{cartCount}</span></h2>
              {cart.map((item) => (
                <div className="review-item" key={`${item.id}-${item.size}`}>
                  <img src={item.image} alt="" />
                  <div><strong>{item.name}</strong><small>{item.color} / {item.size} / QTD. {item.quantity}</small></div>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="review-total"><span>TOTAL</span><strong>{formatPrice(subtotal + (subtotal >= 700 ? 0 : 39))}</strong></div>
            </aside>
          </div>
        </section>
      )}

      {view === "success" && (
        <section className="success-page">
          <div className="success-orbit"><span>✓</span></div>
          <p className="eyebrow">PEDIDO CONFIRMADO</p>
          <h1>VOCÊ ESTÁ<br />NO <i>FLUXO.</i></h1>
          <p>Obrigado por escolher SIGMA.<br />Enviamos os detalhes do seu pedido por e-mail.</p>
          <button className="primary" onClick={() => navigate("home")}>VOLTAR AO INÍCIO</button>
        </section>
      )}

      <Footer onNavigate={navigate} />
    </main>
  );
}

function ProductCard({
  product,
  featured,
  onOpen,
  onAdd,
}: {
  product: Product;
  featured?: boolean;
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className={`product-card ${featured ? "featured-card" : ""}`}>
      <button className="product-image" onClick={() => onOpen(product)}>
        {product.tag && <span className="tag">{product.tag}</span>}
        <img src={product.image} alt={product.imageAlt} />
        <span className="view-product">VER PRODUTO <Icon name="arrow" size={17} /></span>
      </button>
      <div className="product-meta">
        <button onClick={() => onOpen(product)}>
          <small>{product.type.toUpperCase()}</small>
          <h3>{product.name}</h3>
        </button>
        <div>
          <strong>{formatPrice(product.price)}</strong>
          <button className="quick-add" onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name}`}>
            <Icon name="plus" size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Footer({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand"><div className="logo">SIGMA<span>®</span></div><p>PERFORMANCE,<br />ELEVATED.</p></div>
        <div><strong>SHOP</strong><button onClick={() => onNavigate("catalog")}>Coleção</button><button>Masculino</button><button>Feminino</button><button>Acessórios</button></div>
        <div><strong>SUPORTE</strong><button>Central de ajuda</button><button>Trocas e devoluções</button><button>Entregas</button><button>Contato</button></div>
        <div><strong>SIGA</strong><button>Instagram ↗</button><button>TikTok ↗</button><button>Strava ↗</button></div>
      </div>
      <div className="footer-bottom"><span>© 2026 SIGMA PERFORMANCE CO.</span><span>PRIVACIDADE &nbsp; TERMOS</span><b>BR / PT</b></div>
    </footer>
  );
}
