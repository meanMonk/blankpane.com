import type { ColorPageStrings } from "./types";

interface ColorPageText {
  title: (name: string) => string;
  h1: (name: string) => string;
  intro: (name: string, hex: string, intent: string) => string;
  whyTitle: string;
  uses: Array<{ title: (name: string) => string; body: (name: string, hex: string) => string }>;
  faqTitle: string;
  faqs: Array<{ q: (name: string) => string; a: (name: string, hex: string) => string }>;
  linksTitle: string;
}

const faqAnswers = {
  open: (name: string, hex: string) =>
    `Select the ${name.toLowerCase()} tile on this page, then press Go Full Screen. Your browser fills the entire screen edge-to-edge with ${hex}. Tap anywhere or press Escape to exit.`,
  zoom: (name: string) =>
    `Yes. Open the ${name.toLowerCase()} on a second device or window, position it behind you, or use it as a light source to evenly light your face on a call.`,
  download: (name: string) =>
    `Yes. Pick the ${name.toLowerCase()} color, choose a size preset or type a custom width and height, then press Download PNG. You'll get a lossless, high-quality image at exactly that size, rendered in your browser — nothing is uploaded.`,
  free: () => `Yes, this tool is 100% free and works entirely in your browser. No account, no sign-up, and no images are uploaded or stored.`,
};

const dict: Record<string, Partial<ColorPageText>> = {
  en: {
    title: (n) => (n === "White Screen"
      ? "White Screen — Free Fullscreen White Background Tool"
      : n === "Black Screen"
        ? "Black Screen — Free Fullscreen Black Background"
        : `${n} — BlankPane`),
    h1: (n) => n,
    intro: (n, hex, intent) => {
      if (n === "White Screen") {
        return `Open a full-screen white background instantly in your browser. This free white screen tool fills your entire display with pure #FFFFFF in one tap — perfect for lighting, plain white backgrounds, product photos, Zoom calls, and monitor testing. No download, no install, works on any device.`;
      }
      if (n === "Black Screen") {
        return `Open a full-screen black background instantly in your browser. This free black screen tool fills your entire display with pure #000000 in one tap — perfect for saving battery on OLED, dark plain backgrounds, focus, screensavers, and monitor testing. No download, no install, works on any device.`;
      }
      return `Open a full-page ${n.toLowerCase()} instantly in your browser. This free tool fills your entire screen with pure ${hex} in one tap — perfect for ${intent}. No download, no install, works on any device.`;
    },
    whyTitle: "Why people use this",
    uses: [
      { title: (n) => `Fill the screen with ${n.toLowerCase()}`, body: (n, hex) => `Display pure ${hex} edge-to-edge on any monitor, laptop, phone, or tablet. Tap any tile to preview, then go full screen with one click.` },
      { title: (n) => `Use it as a plain, distraction-free background`, body: (n, hex) => `A solid ${n.toLowerCase()} works as a clean backdrop for video calls, a calming light source, or a focus-friendly work screen.` },
      { title: (n) => `Download ${n.toLowerCase()} as a high-quality PNG`, body: (n, hex) => `Export the ${n.toLowerCase()} color as a lossless PNG in any resolution — HD, 4K, square, story, or a custom pixel size you choose.` },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      { q: (n) => `How do I open a full-screen ${n.toLowerCase()}?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Can I use the ${n.toLowerCase()} for a video call or Zoom background?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Can I download the ${n.toLowerCase()} as an image?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `Is the ${n.toLowerCase()} tool free to use?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Try another color",
  },
  de: {
    title: (n) => `${n} — Kostenloses Vollfarb-Tool`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Öffnen Sie in Ihrem Browser sofort einen vollflächigen ${n.toLowerCase()}. Dieses kostenlose Tool füllt Ihren gesamten Bildschirm mit einem Tipp mit reinem ${hex} — perfekt für ${intent}. Ohne Download, ohne Installation, auf jedem Gerät.`,
    whyTitle: "Wofür man das nutzt",
    uses: [
      { title: (n) => `Füllen Sie den Bildschirm mit ${n.toLowerCase()}`, body: (n, hex) => `Zeigen Sie reines ${hex} randlos auf jedem Monitor, Laptop, Handy oder Tablet. Tippen Sie auf eine Kachel zur Vorschau und öffnen Sie mit einem Klick das Vollbild.` },
      { title: (n) => `Als schlichten, ablenkungsfreien Hintergrund nutzen`, body: (n) => `Ein vollflächiges ${n.toLowerCase()} eignet sich als sauberer Hintergrund für Videoanrufe, als beruhigende Lichtquelle oder als konzentrationsfreundlicher Arbeitsbildschirm.` },
      { title: (n) => `${n} als hochwertiges PNG herunterladen`, body: (n, hex) => `Exportieren Sie ${n.toLowerCase()} als verlustfreies PNG in jeder Auflösung — HD, 4K, Quadrat, Story oder eine eigene Pixelgröße.` },
    ],
    faqTitle: "Häufig gestellte Fragen",
    faqs: [
      { q: (n) => `Wie öffne ich einen vollflächigen ${n.toLowerCase()}?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Kann ich ${n.toLowerCase()} als Videoanruf- oder Zoom-Hintergrund verwenden?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Kann ich ${n.toLowerCase()} als Bild herunterladen?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `Ist das ${n.toLowerCase()}-Tool kostenlos?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Andere Farbe ausprobieren",
  },
  fr: {
    title: (n) => `${n} — Outil couleur plein écran gratuit`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Ouvrez instantanément un ${n.toLowerCase()} pleine page dans votre navigateur. Cet outil gratuit remplit tout votre écran de ${hex} pur en un geste — parfait pour ${intent}. Sans téléchargement, sans installation, sur n'importe quel appareil.`,
    whyTitle: "À quoi ça sert",
    uses: [
      { title: (n) => `Remplir l'écran avec ${n.toLowerCase()}`, body: (n, hex) => `Affichez du ${hex} pur bord à bord sur tout moniteur, ordinateur portable, téléphone ou tablette. Touchez une pastille pour prévisualiser, puis passez en plein écran d'un clic.` },
      { title: (n) => `L'utiliser comme fond simple, sans distraction`, body: (n) => `Un ${n.toLowerCase()} uni sert de fond propre pour les appels vidéo, de source de lumière apaisante ou d'écran de travail sans distraction.` },
      { title: (n) => `Télécharger ${n.toLowerCase()} en PNG haute qualité`, body: (n, hex) => `Exportez ${n.toLowerCase()} en PNG sans perte dans n'importe quelle résolution — HD, 4K, carré, story ou une taille personnalisée.` },
    ],
    faqTitle: "Questions fréquentes",
    faqs: [
      { q: (n) => `Comment ouvrir un ${n.toLowerCase()} en plein écran ?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Puis-je utiliser ${n.toLowerCase()} comme fond d'appel vidéo ou Zoom ?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Puis-je télécharger ${n.toLowerCase()} en image ?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `L'outil ${n.toLowerCase()} est-il gratuit ?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Essayez une autre couleur",
  },
  es: {
    title: (n) => `${n} — Herramienta de color a pantalla completa gratuita`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Abre al instante un ${n.toLowerCase()} a página completa en tu navegador. Esta herramienta gratuita llena toda tu pantalla de ${hex} puro con un toque, perfecta para ${intent}. Sin descargas, sin instalación, en cualquier dispositivo.`,
    whyTitle: "Para qué se usa",
    uses: [
      { title: (n) => `Llenar la pantalla con ${n.toLowerCase()}`, body: (n, hex) => `Muestra ${hex} puro de borde a borde en cualquier monitor, portátil, teléfono o tableta. Toca una muestra para previsualizar y luego pasa a pantalla completa con un clic.` },
      { title: (n) => `Usarlo como fondo liso, sin distracciones`, body: (n) => `Un ${n.toLowerCase()} sólido sirve como fondo limpio para videollamadas, fuente de luz relajante o pantalla de trabajo sin distracciones.` },
      { title: (n) => `Descargar ${n.toLowerCase()} como PNG de alta calidad`, body: (n, hex) => `Exporta ${n.toLowerCase()} como PNG sin pérdida en cualquier resolución — HD, 4K, cuadrado, historia o un tamaño personalizado.` },
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: (n) => `¿Cómo abro un ${n.toLowerCase()} a pantalla completa?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `¿Puedo usar ${n.toLowerCase()} como fondo de videollamada o Zoom?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `¿Puedo descargar ${n.toLowerCase()} como imagen?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `¿Es gratuita la herramienta de ${n.toLowerCase()}?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Prueba otro color",
  },
  uk: {
    title: (n) => `${n} — Безкоштовний інструмент повноекранного кольору`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Миттєво відкрийте ${n.toLowerCase()} на весь екран у вашому браузері. Цей безкоштовний інструмент заповнює весь екран чистим ${hex} одним дотиком — ідеально для ${intent}. Без завантажень, без встановлення, на будь-якому пристрої.`,
    whyTitle: "Для чого це використовують",
    uses: [
      { title: (n) => `Заповнити екран кольором ${n.toLowerCase()}`, body: (n, hex) => `Покажіть чистий ${hex} від краю до краю на будь-якому моніторі, ноутбуці, телефоні чи планшеті. Торкніться плитки для попереднього перегляду та відкрийте повний екран одним кліком.` },
      { title: (n) => `Використати як чистий фон без відволікань`, body: (n) => `Суцільний ${n.toLowerCase()} — це чистий фон для відеодзвінків, заспокійливе джерело світла або робочий екран без відволікань.` },
      { title: (n) => `Завантажити ${n.toLowerCase()} як PNG високої якості`, body: (n, hex) => `Експортуйте ${n.toLowerCase()} як стиснений PNG без втрат у будь-якій роздільній здатності — HD, 4K, квадрат, сторіз або власний розмір.` },
    ],
    faqTitle: "Поширені запитання",
    faqs: [
      { q: (n) => `Як відкрити ${n.toLowerCase()} на весь екран?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Чи можна використати ${n.toLowerCase()} як фон для відеодзвінка чи Zoom?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Чи можна завантажити ${n.toLowerCase()} як зображення?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `Чи безкоштовний інструмент ${n.toLowerCase()}?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Спробуйте інший колір",
  },
  pl: {
    title: (n) => `${n} — Darmowe narzędzie do pełnoekranowego koloru`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Natychmiast otwórz pełnoekranowy ${n.toLowerCase()} w swojej przeglądarce. To darmowe narzędzie wypełnia cały ekran czystym kolorem ${hex} jednym dotknięciem — idealne do ${intent}. Bez pobierania, bez instalacji, na każdym urządzeniu.`,
    whyTitle: "Do czego to służy",
    uses: [
      { title: (n) => `Wypełnij ekran kolorem ${n.toLowerCase()}`, body: (n, hex) => `Wyświetl czysty kolor ${hex} od krawędzi do krawędzi na dowolnym monitorze, laptopie, telefonie lub tablecie. Dotknij kafelka, aby zobaczyć podgląd, a następnie przejdź do pełnego ekranu jednym kliknięciem.` },
      { title: (n) => `Użyj go jako czystego, bez rozpraszaczy tła`, body: (n) => `Jednolity ${n.toLowerCase()} to czyste tło do rozmów wideo, uspokajające źródło światła lub ekran pracy bez rozpraszaczy.` },
      { title: (n) => `Pobierz ${n.toLowerCase()} jako wysokiej jakości PNG`, body: (n, hex) => `Eksportuj ${n.toLowerCase()} jako skompresowane PNG bez strat w dowolnej rozdzielczości — HD, 4K, kwadrat, story lub własny rozmiar.` },
    ],
    faqTitle: "Często zadawane pytania",
    faqs: [
      { q: (n) => `Jak otworzyć pełnoekranowy ${n.toLowerCase()}?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Czy mogę użyć ${n.toLowerCase()} jako tła rozmowy wideo lub Zoom?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Czy mogę pobrać ${n.toLowerCase()} jako obraz?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `Czy narzędzie ${n.toLowerCase()} jest darmowe?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Wypróbuj inny kolor",
  },
  it: {
    title: (n) => `${n} — Strumento gratuito a tutto colore`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Apri all'istante un ${n.toLowerCase()} a tutto schermo nel tuo browser. Questo strumento gratuito riempie l'intero schermo con ${hex} puro in un tocco — perfetto per ${intent}. Nessun download, nessuna installazione, su qualsiasi dispositivo.`,
    whyTitle: "A cosa serve",
    uses: [
      { title: (n) => `Riempi lo schermo con ${n.toLowerCase()}`, body: (n, hex) => `Mostra ${hex} puro da bordo a bordo su qualsiasi monitor, laptop, telefono o tablet. Tocca una piastrella per l'anteprima, poi vai a tutto schermo con un clic.` },
      { title: (n) => `Usalo come sfondo semplice, senza distrazioni`, body: (n) => `Un ${n.toLowerCase()} pieno è uno sfondo pulito per le videochiamate, una fonte di luce rilassante o una schermata di lavoro senza distrazioni.` },
      { title: (n) => `Scarica ${n.toLowerCase()} come PNG di alta qualità`, body: (n, hex) => `Esporta ${n.toLowerCase()} come PNG compresso senza perdite in qualsiasi risoluzione — HD, 4K, quadrato, story o una dimensione personalizzata.` },
    ],
    faqTitle: "Domande frequenti",
    faqs: [
      { q: (n) => `Come apro un ${n.toLowerCase()} a tutto schermo?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Posso usare ${n.toLowerCase()} come sfondo per videochiamate o Zoom?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Posso scaricare ${n.toLowerCase()} come immagine?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `Lo strumento ${n.toLowerCase()} è gratuito?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Prova un altro colore",
  },
  tr: {
    title: (n) => `${n} — Ücretsiz Tam Ekran Renk Aracı`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Tarayıcınızda anında tam ekran ${n.toLowerCase()} açın. Bu ücretsiz araç, tek dokunuşla tüm ekranınızı saf ${hex} rengiyle doldurur — ${intent} için mükemmel. İndirme yok, kurulum yok, her cihazda çalışır.`,
    whyTitle: "Ne için kullanılır",
    uses: [
      { title: (n) => `Ekranı ${n.toLowerCase()} ile doldurun`, body: (n, hex) => `Herhangi bir monitör, dizüstü bilgisayar, telefon veya tablette kenardan kenara saf ${hex} gösterin. Önizlemek için bir karoya dokunun, ardından tek tıkla tam ekrana geçin.` },
      { title: (n) => `Sade, dikkat dağıtmayan bir arka plan olarak kullanın`, body: (n) => `Düz ${n.toLowerCase()}, video görüşmeleri için temiz bir arka plan, sakinleştirici bir ışık kaynağı veya dikkat dağıtmayan bir çalışma ekranıdır.` },
      { title: (n) => `${n} görselini yüksek kaliteli PNG olarak indirin`, body: (n, hex) => `${n.toLowerCase()} rengini herhangi bir çözünürlükte — HD, 4K, kare, story veya özel boyutta — kayıpsız PNG olarak dışa aktarın.` },
    ],
    faqTitle: "Sık sorulan sorular",
    faqs: [
      { q: (n) => `Tam ekran ${n.toLowerCase()} nasıl açarım?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `${n} görselini video araması veya Zoom arka planı olarak kullanabilir miyim?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `${n} görselini görüntü olarak indirebilir miyim?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `${n} aracı ücretsiz mi?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Başka bir renk deneyin",
  },
  pt: {
    title: (n) => `${n} — Ferramenta gratuita de tela cheia`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Abra instantaneamente um ${n.toLowerCase()} em tela cheia no seu navegador. Esta ferramenta gratuita preenche toda a sua tela com ${hex} puro em um toque — perfeita para ${intent}. Sem download, sem instalação, em qualquer dispositivo.`,
    whyTitle: "Para que serve",
    uses: [
      { title: (n) => `Preencher a tela com ${n.toLowerCase()}`, body: (n, hex) => `Mostre ${hex} puro de ponta a ponta em qualquer monitor, notebook, celular ou tablet. Toque em um bloco para pré-visualizar e depois vá para tela cheia com um clique.` },
      { title: (n) => `Usar como fundo simples, sem distrações`, body: (n) => `Um ${n.toLowerCase()} sólido é um fundo limpo para videochamadas, uma fonte de luz relaxante ou uma tela de trabalho sem distrações.` },
      { title: (n) => `Baixar ${n.toLowerCase()} como PNG de alta qualidade`, body: (n, hex) => `Exporte ${n.toLowerCase()} como PNG comprimido sem perdas em qualquer resolução — HD, 4K, quadrado, story ou um tamanho personalizado.` },
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      { q: (n) => `Como abrir um ${n.toLowerCase()} em tela cheia?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Posso usar ${n.toLowerCase()} como fundo de videochamada ou Zoom?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Posso baixar ${n.toLowerCase()} como imagem?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `A ferramenta de ${n.toLowerCase()} é gratuita?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Experimente outra cor",
  },
  se: {
    title: (n) => `${n} — Gratis helskärmsfärgverktyg`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Öppna omedelbart en helsides ${n.toLowerCase()} i din webbläsare. Detta gratis verktyg fyller hela skärmen med rent ${hex} i ett tryck — perfekt för ${intent}. Utan nedladdning, utan installation, på alla enheter.`,
    whyTitle: "Vad det används till",
    uses: [
      { title: (n) => `Fyll skärmen med ${n.toLowerCase()}`, body: (n, hex) => `Visa rent ${hex} från kant till kant på alla monitorer, laptops, telefoner eller surfplattor. Tryck på en ruta för förhandsvisning och gå sedan till helskärm med ett klick.` },
      { title: (n) => `Använd den som en enkel, distraktionsfri bakgrund`, body: (n) => `En solid ${n.toLowerCase()} är en ren bakgrund för videosamtal, en lugnande ljuskälla eller en distraktionsfri arbetsyta.` },
      { title: (n) => `Ladda ner ${n.toLowerCase()} som högkvalitativ PNG`, body: (n, hex) => `Exportera ${n.toLowerCase()} som komprimerad PNG utan förlust i valfri upplösning — HD, 4K, kvadrat, story eller egen storlek.` },
    ],
    faqTitle: "Vanliga frågor",
    faqs: [
      { q: (n) => `Hur öppnar jag en helskärms ${n.toLowerCase()}?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Kan jag använda ${n.toLowerCase()} som bakgrund för videosamtal eller Zoom?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Kan jag ladda ner ${n.toLowerCase()} som bild?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `Är ${n.toLowerCase()}-verktyget gratis?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Prova en annan färg",
  },
  ja: {
    title: (n) => `${n} — 無料の全画面カラーツール`,
    h1: (n) => n,
    intro: (n, hex, intent) => `ブラウザで全画面の${n}をすぐに開けます。この無料ツールはワンタップで画面全体を純粋な${hex}で満たします — ${intent}に最適。ダウンロード不要、インストール不要、どんな端末でも動作します。`,
    whyTitle: "どんなときに使う？",
    uses: [
      { title: (n) => `画面を${n}で埋める`, body: (n, hex) => `あらゆるモニター、ノートPC、スマホ、タブレットで純粋な${hex}を端まで表示。タイルをタップしてプレビューし、ワンクリックで全画面に。` },
      { title: (n) => `シンプルで邪魔のない背景として使う`, body: (n) => `無地の${n}は、ビデオ通話の背景、落ち着くライト、集中できる作業画面として活躍します。` },
      { title: (n) => `${n}を高画質PNGとしてダウンロード`, body: (n, hex) => `${n}をHD、4K、正方形、ストーリー、または任意のサイズでロスレスの圧縮PNGとして書き出せます。` },
    ],
    faqTitle: "よくある質問",
    faqs: [
      { q: (n) => `全画面の${n}を開くには？`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `${n}をビデオ通話やZoomの背景に使えますか？`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `${n}を画像としてダウンロードできますか？`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `${n}ツールは無料ですか？`, a: () => faqAnswers.free() },
    ],
    linksTitle: "他の色を試す",
  },
  ms: {
    title: (n) => `${n} — Alat Warna Skrin Penuh Percuma`,
    h1: (n) => n,
    intro: (n, hex, intent) => `Buka ${n.toLowerCase()} sepenuh halaman serta-merta dalam penyemak imbas anda. Alat percuma ini mengisi seluruh skrin anda dengan ${hex} tulen dalam satu sentuhan — sesuai untuk ${intent}. Tanpa muat turun, tanpa pemasangan, berfungsi pada mana-mana peranti.`,
    whyTitle: "Untuk apa ia digunakan",
    uses: [
      { title: (n) => `Penuhkan skrin dengan ${n.toLowerCase()}`, body: (n, hex) => `Paparkan ${hex} tulen dari hujung ke hujung pada mana-mana monitor, komputer riba, telefon atau tablet. Sentuh petak untuk pratonton, kemudian buka skrin penuh dengan satu klik.` },
      { title: (n) => `Gunakannya sebagai latar belakang polos tanpa gangguan`, body: (n) => `${n} pekat ialah latar belakang bersih untuk panggilan video, sumber cahaya menenangkan atau skrin kerja tanpa gangguan.` },
      { title: (n) => `Muat turun ${n.toLowerCase()} sebagai PNG berkualiti tinggi`, body: (n, hex) => `Eksport ${n.toLowerCase()} sebagai PNG mampat tanpa kehilangan dalam sebarang resolusi — HD, 4K, segi empat, story atau saiz tersuai.` },
    ],
    faqTitle: "Soalan lazim",
    faqs: [
      { q: (n) => `Bagaimana saya membuka ${n.toLowerCase()} sepenuh skrin?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `Bolehkah saya menggunakan ${n.toLowerCase()} sebagai latar panggilan video atau Zoom?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `Bolehkah saya memuat turun ${n.toLowerCase()} sebagai imej?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `Adakah alat ${n.toLowerCase()} percuma?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "Cuba warna lain",
  },
  ko: {
    title: (n) => `${n} — 무료 전체 화면 색상 도구`,
    h1: (n) => n,
    intro: (n, hex, intent) => `브라우저에서 전체 화면 ${n}을(를) 즉시 여세요. 이 무료 도구는 한 번의 탭으로 화면 전체를 순수한 ${hex}로 채웁니다 — ${intent}에 딱 맞습니다. 다운로드 없음, 설치 없음, 어떤 기기에서도 작동합니다.`,
    whyTitle: "언제 사용하나요",
    uses: [
      { title: (n) => `화면을 ${n}(으)로 채우기`, body: (n, hex) => `모든 모니터, 노트북, 휴대폰, 태블릿에서 순수한 ${hex}를 가장자리까지 표시하세요. 타일을 탭해 미리 보고 한 번의 클릭으로 전체 화면에 들어갑니다.` },
      { title: (n) => `깔끔하고 방해 없는 배경으로 사용`, body: (n) => `단색 ${n}은(는) 영상 통화의 깨끗한 배경, 편안한 조명, 집중하기 좋은 작업 화면으로 좋습니다.` },
      { title: (n) => `${n}을(를) 고품질 PNG로 다운로드`, body: (n, hex) => `${n}을(를) HD, 4K, 정사각형, 스토리 또는 원하는 크기로 무손실 압축 PNG로 내보내세요.` },
    ],
    faqTitle: "자주 묻는 질문",
    faqs: [
      { q: (n) => `전체 화면 ${n}을(를) 어떻게 열죠?`, a: (n, hex) => faqAnswers.open(n, hex) },
      { q: (n) => `${n}을(를) 영상 통화나 Zoom 배경으로 사용할 수 있나요?`, a: (n) => faqAnswers.zoom(n) },
      { q: (n) => `${n}을(를) 이미지로 다운로드할 수 있나요?`, a: (n) => faqAnswers.download(n) },
      { q: (n) => `${n} 도구는 무료인가요?`, a: () => faqAnswers.free() },
    ],
    linksTitle: "다른 색상 시도하기",
  },
};

const defaults: ColorPageText = {
  title: (name) => `${name} — BlankPane`,
  h1: (name) => name,
  intro: (name, hex, intent) => `Open a full-page ${name.toLowerCase()} instantly in your browser. This free tool fills your entire screen with pure ${hex} in one tap — perfect for ${intent}. No download, no install, works on any device.`,
  whyTitle: "Why people use this",
  uses: [
    { title: (name) => `Fill the screen with ${name.toLowerCase()}`, body: (name, hex) => `Display pure ${hex} edge-to-edge on any monitor, laptop, phone, or tablet.` },
    { title: (name) => `Use it as a plain, distraction-free background`, body: (name) => `A solid ${name.toLowerCase()} works as a clean backdrop for video calls and focus-friendly work.` },
    { title: (name) => `Download ${name.toLowerCase()} as a high-quality PNG`, body: (name) => `Export ${name.toLowerCase()} as a lossless PNG in any resolution you choose.` },
  ],
  faqTitle: "Frequently asked questions",
  faqs: [
    { q: (name) => `How do I open a full-screen ${name.toLowerCase()}?`, a: (name, hex) => faqAnswers.open(name, hex) },
    { q: (name) => `Can I use the ${name.toLowerCase()} for a video call or Zoom background?`, a: (name) => faqAnswers.zoom(name) },
    { q: (name) => `Can I download the ${name.toLowerCase()} as an image?`, a: (name) => faqAnswers.download(name) },
    { q: (name) => `Is the ${name.toLowerCase()} tool free to use?`, a: () => faqAnswers.free() },
  ],
  linksTitle: "Try another color",
};

export function buildColorPage(lang: string): (c: { name: string; hex: string; intent: string }) => ColorPageStrings {
  const text: ColorPageText = { ...defaults, ...(dict[lang] ?? {}) };
  return (c) => ({
    metaTitle: text.title(c.name),
    h1: text.h1(c.name),
    intro: text.intro(c.name, c.hex, c.intent),
    whyTitle: text.whyTitle,
    uses: text.uses.map((u) => ({ title: u.title(c.name), body: u.body(c.name, c.hex) })),
    faqTitle: text.faqTitle,
    faqs: text.faqs.map((f) => ({ q: f.q(c.name), a: f.a(c.name, c.hex) })),
    linksTitle: text.linksTitle,
  });
}
