/* ========== DOM references ========== */
const categoryFilter = document.getElementById("categoryFilter");
const productSearch = document.getElementById("productSearch");
const directionToggle = document.getElementById("directionToggle");
const productsContainer = document.getElementById("productsContainer");
const selectedProductsList = document.getElementById("selectedProductsList");
const clearSelectionsBtn = document.getElementById("clearSelections");
const generateRoutineBtn = document.getElementById("generateRoutine");
const chatForm = document.getElementById("chatForm");
const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

/* ========== Configuration ========== */
const WORKER_ENDPOINT = "https://your-worker-subdomain.workers.dev";
const STORAGE_KEY = "loreal-selected-product-ids";
const DIRECTION_STORAGE_KEY = "loreal-layout-direction";

const SUPPORTED_LANGUAGES = ["en", "es", "fr", "ar"];
const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

const I18N = {
  en: {
    page_title: "L'Oréal | Smart Routine & Product Advisor",
    site_title: "Smart Routine & Product Advisor",
    filter_by_category: "Filter by category",
    all_categories: "All Categories",
    category_cleanser: "Cleansers",
    category_moisturizer: "Moisturizers & Treatments",
    category_skincare: "Skincare Serums & Treatments",
    category_haircare: "Haircare",
    category_makeup: "Makeup",
    category_hair_color: "Hair Color",
    category_hair_styling: "Hair Styling",
    category_mens_grooming: "Men's Grooming",
    category_suncare: "Suncare",
    category_fragrance: "Fragrance",
    search_products: "Search products",
    search_placeholder: "Search by name or keyword",
    direction_label: "Direction",
    direction_ltr: "LTR",
    direction_rtl: "RTL",
    selected_products_title: "Selected Products",
    clear_all_selections: "Clear All Selections",
    generate_routine: "Generate Routine",
    chat_title: "Let's Build Your Routine",
    message_label: "Message",
    chat_placeholder: "Ask me about products or routines...",
    send_label: "Send",
    footer_copyright: "\u00A9 2025 L'Or\u00E9al. All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    footer_contact: "Contact",
    loading_products: "Loading products...",
    no_products_match: "No products match your current filters.",
    show_description: "Show Description",
    hide_description: "Hide Description",
    no_products_selected: "No products selected yet.",
    remove_item: "Remove",
    remove_item_aria: "Remove",
    welcome_message:
      "Select products, click Generate Routine, then ask follow-up questions about your routine, skincare, haircare, makeup, or fragrance.",
    products_load_error:
      "I couldn't load products right now. Please refresh and try again.",
    routine_needs_product:
      "Select at least one product before generating a routine.",
    generating_routine: "Generating your personalized routine...",
    routine_error:
      "I couldn't generate a routine right now. Check your Worker URL and try again.",
    followup_requires_routine:
      "Generate a routine first, then ask follow-up questions in this chatbox.",
    followup_error:
      "I couldn't answer that right now. Please try again in a moment.",
  },
  es: {
    page_title: "L'Or\u00E9al | Asesor Inteligente de Rutina y Productos",
    site_title: "Asesor Inteligente de Rutina y Productos",
    filter_by_category: "Filtrar por categor\u00EDa",
    all_categories: "Todas las categor\u00EDas",
    category_cleanser: "Limpiadores",
    category_moisturizer: "Hidratantes y Tratamientos",
    category_skincare: "Sueros y Tratamientos de Skincare",
    category_haircare: "Cuidado del Cabello",
    category_makeup: "Maquillaje",
    category_hair_color: "Coloraci\u00F3n de Cabello",
    category_hair_styling: "Peinado",
    category_mens_grooming: "Cuidado Masculino",
    category_suncare: "Protecci\u00F3n Solar",
    category_fragrance: "Fragancia",
    search_products: "Buscar productos",
    search_placeholder: "Buscar por nombre o palabra clave",
    direction_label: "Direcci\u00F3n",
    direction_ltr: "LTR",
    direction_rtl: "RTL",
    selected_products_title: "Productos Seleccionados",
    clear_all_selections: "Borrar Todas las Selecciones",
    generate_routine: "Generar Rutina",
    chat_title: "Construyamos Tu Rutina",
    message_label: "Mensaje",
    chat_placeholder: "Preg\u00FAntame sobre productos o rutinas...",
    send_label: "Enviar",
    footer_copyright:
      "\u00A9 2025 L'Or\u00E9al. Todos los derechos reservados.",
    footer_privacy: "Pol\u00EDtica de Privacidad",
    footer_terms: "T\u00E9rminos de Uso",
    footer_contact: "Contacto",
    loading_products: "Cargando productos...",
    no_products_match:
      "Ning\u00FAn producto coincide con tus filtros actuales.",
    show_description: "Mostrar descripci\u00F3n",
    hide_description: "Ocultar descripci\u00F3n",
    no_products_selected: "Todav\u00EDa no hay productos seleccionados.",
    remove_item: "Quitar",
    remove_item_aria: "Quitar",
    welcome_message:
      "Selecciona productos, haz clic en Generar Rutina y luego haz preguntas de seguimiento sobre tu rutina, skincare, cuidado del cabello, maquillaje o fragancia.",
    products_load_error:
      "No pude cargar los productos en este momento. Actualiza la p\u00E1gina e int\u00E9ntalo de nuevo.",
    routine_needs_product:
      "Selecciona al menos un producto antes de generar una rutina.",
    generating_routine: "Generando tu rutina personalizada...",
    routine_error:
      "No pude generar una rutina en este momento. Revisa la URL de tu Worker e int\u00E9ntalo de nuevo.",
    followup_requires_routine:
      "Primero genera una rutina y luego haz preguntas de seguimiento en este chat.",
    followup_error:
      "No pude responder eso en este momento. Int\u00E9ntalo de nuevo en un momento.",
  },
  fr: {
    page_title: "L'Or\u00E9al | Conseiller Intelligent Routine & Produits",
    site_title: "Conseiller Intelligent Routine & Produits",
    filter_by_category: "Filtrer par cat\u00E9gorie",
    all_categories: "Toutes les cat\u00E9gories",
    category_cleanser: "Nettoyants",
    category_moisturizer: "Hydratants & Soins",
    category_skincare: "S\u00E9rums et Soins de la Peau",
    category_haircare: "Soin des Cheveux",
    category_makeup: "Maquillage",
    category_hair_color: "Coloration Capillaire",
    category_hair_styling: "Coiffage",
    category_mens_grooming: "Soins Homme",
    category_suncare: "Protection Solaire",
    category_fragrance: "Parfum",
    search_products: "Rechercher des produits",
    search_placeholder: "Rechercher par nom ou mot-cl\u00E9",
    direction_label: "Direction",
    direction_ltr: "LTR",
    direction_rtl: "RTL",
    selected_products_title: "Produits S\u00E9lectionn\u00E9s",
    clear_all_selections: "Effacer Toutes les S\u00E9lections",
    generate_routine: "G\u00E9n\u00E9rer la Routine",
    chat_title: "Construisons Votre Routine",
    message_label: "Message",
    chat_placeholder: "Posez une question sur les produits ou les routines...",
    send_label: "Envoyer",
    footer_copyright:
      "\u00A9 2025 L'Or\u00E9al. Tous droits r\u00E9serv\u00E9s.",
    footer_privacy: "Politique de Confidentialit\u00E9",
    footer_terms: "Conditions d'Utilisation",
    footer_contact: "Contact",
    loading_products: "Chargement des produits...",
    no_products_match:
      "Aucun produit ne correspond \u00E0 vos filtres actuels.",
    show_description: "Afficher la description",
    hide_description: "Masquer la description",
    no_products_selected: "Aucun produit s\u00E9lectionn\u00E9 pour le moment.",
    remove_item: "Retirer",
    remove_item_aria: "Retirer",
    welcome_message:
      "S\u00E9lectionnez des produits, cliquez sur G\u00E9n\u00E9rer la Routine, puis posez des questions de suivi sur votre routine, le skincare, les cheveux, le maquillage ou le parfum.",
    products_load_error:
      "Impossible de charger les produits pour le moment. Actualisez puis r\u00E9essayez.",
    routine_needs_product:
      "S\u00E9lectionnez au moins un produit avant de g\u00E9n\u00E9rer une routine.",
    generating_routine:
      "G\u00E9n\u00E9ration de votre routine personnalis\u00E9e...",
    routine_error:
      "Impossible de g\u00E9n\u00E9rer une routine pour le moment. V\u00E9rifiez l'URL du Worker puis r\u00E9essayez.",
    followup_requires_routine:
      "G\u00E9n\u00E9rez d'abord une routine, puis posez vos questions de suivi dans ce chat.",
    followup_error:
      "Je n'ai pas pu r\u00E9pondre pour le moment. Veuillez r\u00E9essayer dans un instant.",
  },
  ar: {
    page_title: "L'Or\u00E9al | مستشار الروتين والمنتجات الذكي",
    site_title: "مستشار الروتين والمنتجات الذكي",
    filter_by_category: "التصفية حسب الفئة",
    all_categories: "كل الفئات",
    category_cleanser: "منظفات",
    category_moisturizer: "مرطبات وعلاجات",
    category_skincare: "سيروم وعلاجات العناية بالبشرة",
    category_haircare: "العناية بالشعر",
    category_makeup: "المكياج",
    category_hair_color: "صبغة الشعر",
    category_hair_styling: "تصفيف الشعر",
    category_mens_grooming: "العناية الرجالية",
    category_suncare: "العناية من الشمس",
    category_fragrance: "العطور",
    search_products: "ابحث عن المنتجات",
    search_placeholder: "ابحث بالاسم أو كلمة مفتاحية",
    direction_label: "الاتجاه",
    direction_ltr: "من اليسار إلى اليمين",
    direction_rtl: "من اليمين إلى اليسار",
    selected_products_title: "المنتجات المختارة",
    clear_all_selections: "مسح كل الاختيارات",
    generate_routine: "إنشاء الروتين",
    chat_title: "لننشئ روتينك",
    message_label: "الرسالة",
    chat_placeholder: "اسألني عن المنتجات أو الروتين...",
    send_label: "إرسال",
    footer_copyright: "\u00A9 2025 لوريال. جميع الحقوق محفوظة.",
    footer_privacy: "سياسة الخصوصية",
    footer_terms: "شروط الاستخدام",
    footer_contact: "تواصل معنا",
    loading_products: "جاري تحميل المنتجات...",
    no_products_match: "لا توجد منتجات تطابق عوامل التصفية الحالية.",
    show_description: "إظهار الوصف",
    hide_description: "إخفاء الوصف",
    no_products_selected: "لا توجد منتجات مختارة بعد.",
    remove_item: "إزالة",
    remove_item_aria: "إزالة",
    welcome_message:
      "اختر المنتجات ثم اضغط على إنشاء الروتين، وبعدها يمكنك طرح أسئلة متابعة عن روتينك أو العناية بالبشرة أو الشعر أو المكياج أو العطور.",
    products_load_error:
      "تعذر تحميل المنتجات الآن. حدّث الصفحة ثم حاول مرة أخرى.",
    routine_needs_product: "اختر منتجًا واحدًا على الأقل قبل إنشاء الروتين.",
    generating_routine: "جاري إنشاء روتينك المخصص...",
    routine_error:
      "تعذر إنشاء الروتين الآن. تحقق من رابط الـ Worker ثم حاول مرة أخرى.",
    followup_requires_routine:
      "أنشئ الروتين أولًا ثم اطرح أسئلة المتابعة في صندوق الدردشة.",
    followup_error: "تعذر الرد الآن. الرجاء المحاولة مرة أخرى بعد لحظة.",
  },
};

/* ========== App state ========== */
let allProducts = [];
let selectedProductIds = loadSavedSelections();
let chatMessages = [];
let routineGenerated = false;
let activeLanguage = "en";

/* Show initial placeholder while products are loading */
productsContainer.innerHTML = `
  <div class="placeholder-message">
    ${translate("loading_products")}
  </div>
`;

/* ========== Startup ========== */
initializeApp();

async function initializeApp() {
  try {
    activeLanguage = detectLanguage();
    applyLanguage(activeLanguage);
    initializeDirection();
    allProducts = await loadProducts();
    renderProductsByFilters();
    renderSelectedProducts();
    updateActionButtons();
    renderWelcomeMessage();
  } catch (error) {
    showMessage("assistant", translate("products_load_error"));
    console.error(error);
  }
}

/* Load product data from JSON file */
async function loadProducts() {
  const response = await fetch("products.json");
  if (!response.ok) {
    throw new Error("Failed to load products.json");
  }

  const data = await response.json();
  return data.products;
}

/* ========== Product grid rendering ========== */
function displayProducts(products) {
  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div class="placeholder-message">${translate("no_products_match")}</div>
    `;
    return;
  }

  productsContainer.innerHTML = products
    .map((product) => {
      const isSelected = selectedProductIds.includes(product.id);

      return `
        <article class="product-card ${isSelected ? "selected" : ""}" data-product-id="${product.id}" role="button" tabindex="0" aria-pressed="${isSelected}">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <button class="description-toggle" type="button" data-description-toggle="${product.id}" aria-expanded="false" aria-controls="description-${product.id}">
              ${translate("show_description")}
            </button>
            <p class="product-description" id="description-${product.id}" hidden>
              ${product.description}
            </p>
          </div>
        </article>
      `;
    })
    .join("");
}

function getFilteredProducts() {
  const selectedCategory = categoryFilter.value;
  const searchTerm = productSearch.value.trim().toLowerCase();

  return allProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const searchText =
      `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase();
    const matchesSearch = !searchTerm || searchText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });
}

function renderProductsByFilters() {
  const filteredProducts = getFilteredProducts();
  displayProducts(filteredProducts);
}

function initializeDirection() {
  const savedDirection = localStorage.getItem(DIRECTION_STORAGE_KEY);
  const defaultDirection = RTL_LANGUAGES.includes(activeLanguage)
    ? "rtl"
    : "ltr";
  const directionToUse = savedDirection || defaultDirection;
  applyDirection(directionToUse);
  directionToggle.value = directionToUse;
}

function applyDirection(direction) {
  const nextDirection = direction === "rtl" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", nextDirection);
  localStorage.setItem(DIRECTION_STORAGE_KEY, nextDirection);
}

/* ========== Selection and persistence helpers ========== */
function loadSavedSelections() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (_error) {
    return [];
  }
}

function saveSelections() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedProductIds));
}

function getSelectedProducts() {
  return allProducts.filter((product) =>
    selectedProductIds.includes(product.id),
  );
}

function toggleProductSelection(productId) {
  const isSelected = selectedProductIds.includes(productId);

  if (isSelected) {
    selectedProductIds = selectedProductIds.filter((id) => id !== productId);
  } else {
    selectedProductIds = [...selectedProductIds, productId];
  }

  saveSelections();
  renderSelectedProducts();
  renderProductsByFilters();
  updateActionButtons();
}

function removeSelectedProduct(productId) {
  selectedProductIds = selectedProductIds.filter((id) => id !== productId);
  saveSelections();
  renderSelectedProducts();
  renderProductsByFilters();
  updateActionButtons();
}

function clearAllSelections() {
  selectedProductIds = [];
  saveSelections();
  renderSelectedProducts();
  renderProductsByFilters();
  updateActionButtons();
}

/* ========== Selected products panel ========== */
function renderSelectedProducts() {
  const selectedProducts = getSelectedProducts();

  if (selectedProducts.length === 0) {
    selectedProductsList.innerHTML = `
      <p class="selected-empty">${translate("no_products_selected")}</p>
    `;
    return;
  }

  selectedProductsList.innerHTML = selectedProducts
    .map(
      (product) => `
        <div class="selected-item">
          <span>${product.name}</span>
          <button type="button" class="remove-selected" data-remove-id="${product.id}" aria-label="${translate("remove_item_aria")} ${product.name}">
            ${translate("remove_item")}
          </button>
        </div>
      `,
    )
    .join("");
}

function updateActionButtons() {
  const hasSelections = selectedProductIds.length > 0;

  generateRoutineBtn.disabled = !hasSelections;
  clearSelectionsBtn.disabled = !hasSelections;
  sendBtn.disabled = !routineGenerated;
}

/* ========== Chat helpers ========== */
function renderWelcomeMessage() {
  chatWindow.innerHTML = "";
  showMessage("assistant", translate("welcome_message"));
}

function detectLanguage() {
  const browserLanguage = (navigator.language || "en").toLowerCase();
  const shortCode = browserLanguage.split("-")[0];

  if (SUPPORTED_LANGUAGES.includes(shortCode)) {
    return shortCode;
  }

  return "en";
}

function translate(key) {
  const languagePack = I18N[activeLanguage] || I18N.en;
  return languagePack[key] || I18N.en[key] || key;
}

function applyLanguage(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translate(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.setAttribute("placeholder", translate(key));
  });
}

function showMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `chat-message ${role === "user" ? "user" : "assistant"}`;
  wrapper.textContent = text;
  chatWindow.appendChild(wrapper);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* ========== API calls (through Worker) ========== */
async function requestRoutineFromWorker(selectedProducts) {
  const payload = {
    task: "generate-routine",
    selectedProducts: selectedProducts.map((product) => ({
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
    })),
    messages: [
      {
        role: "system",
        content:
          "You are a beauty advisor. Build a simple, safe, personalized routine using only the selected products.",
      },
    ],
  };

  const response = await fetch(WORKER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Routine request failed");
  }

  const data = await response.json();
  return data.reply;
}

async function requestFollowUpFromWorker(userQuestion) {
  const selectedProducts = getSelectedProducts();

  const payload = {
    task: "follow-up",
    selectedProducts: selectedProducts.map((product) => ({
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
    })),
    messages: chatMessages,
    userQuestion,
  };

  const response = await fetch(WORKER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Follow-up request failed");
  }

  const data = await response.json();
  return data.reply;
}

/* ========== Event listeners ========== */
categoryFilter.addEventListener("change", (e) => {
  e.preventDefault();
  renderProductsByFilters();
});

productSearch.addEventListener("input", () => {
  renderProductsByFilters();
});

directionToggle.addEventListener("change", (event) => {
  applyDirection(event.target.value);
});

productsContainer.addEventListener("click", (event) => {
  const descriptionToggle = event.target.closest("[data-description-toggle]");
  if (descriptionToggle) {
    event.stopPropagation();

    const productId = Number(descriptionToggle.dataset.descriptionToggle);
    const descriptionElement = document.getElementById(
      `description-${productId}`,
    );
    const isExpanded =
      descriptionToggle.getAttribute("aria-expanded") === "true";

    descriptionToggle.setAttribute("aria-expanded", String(!isExpanded));
    descriptionToggle.textContent = isExpanded
      ? translate("show_description")
      : translate("hide_description");
    descriptionElement.hidden = isExpanded;
    return;
  }

  const card = event.target.closest(".product-card");
  if (!card) {
    return;
  }

  const productId = Number(card.dataset.productId);
  toggleProductSelection(productId);
});

productsContainer.addEventListener("keydown", (event) => {
  const card = event.target.closest(".product-card");
  if (!card) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    const productId = Number(card.dataset.productId);
    toggleProductSelection(productId);
  }
});

selectedProductsList.addEventListener("click", (event) => {
  const removeBtn = event.target.closest("[data-remove-id]");
  if (!removeBtn) {
    return;
  }

  const productId = Number(removeBtn.dataset.removeId);
  removeSelectedProduct(productId);
});

clearSelectionsBtn.addEventListener("click", () => {
  clearAllSelections();
});

generateRoutineBtn.addEventListener("click", async () => {
  const selectedProducts = getSelectedProducts();

  if (selectedProducts.length === 0) {
    showMessage("assistant", translate("routine_needs_product"));
    return;
  }

  generateRoutineBtn.disabled = true;
  showMessage("assistant", translate("generating_routine"));

  try {
    const routineText = await requestRoutineFromWorker(selectedProducts);

    chatMessages = [
      {
        role: "system",
        content:
          "You are a beauty advisor. Answer only about the generated routine, skincare, haircare, makeup, fragrance, and related beauty topics.",
      },
      {
        role: "assistant",
        content: `Generated routine:\n${routineText}`,
      },
    ];

    routineGenerated = true;
    updateActionButtons();
    showMessage("assistant", routineText);
  } catch (error) {
    showMessage("assistant", translate("routine_error"));
    console.error(error);
  } finally {
    generateRoutineBtn.disabled = false;
  }
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!routineGenerated) {
    showMessage("assistant", translate("followup_requires_routine"));
    return;
  }

  const question = userInput.value.trim();
  if (!question) {
    return;
  }

  showMessage("user", question);
  userInput.value = "";

  chatMessages.push({ role: "user", content: question });

  try {
    const reply = await requestFollowUpFromWorker(question);
    chatMessages.push({ role: "assistant", content: reply });
    showMessage("assistant", reply);
  } catch (error) {
    showMessage("assistant", translate("followup_error"));
    console.error(error);
  }
});
