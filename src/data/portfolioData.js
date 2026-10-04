export const PERSONAL_INFO = {
  name: "Vũ Xuân Kiên",
  handle: "Xuankiendev",
  brand: "Xuankiendev — Creative Tech & Bot Architect",
  title: "Zalo Bot Architect • Automation Wizard • Creative Coder",
  bio: "Tôi xây dựng bot Zalo thực chiến, hệ thống tự động hóa và các ứng dụng web giàu tương tác. Thích build in public, thích biến ý tưởng thành sản phẩm sống và để commit tự lên tiếng thay cho những lời sáo rỗng.",
  location: "Việt Nam",
  status: "Available for interesting projects",
  avatarUrl: "./avatar.jpg",
  legacyQrUrl: "https://f64-zpg-r.zdn.vn/jpg/622453088088088992/c1ec726002ef83b1dafe.jpg",
  quote: "Bug xuất hiện không phải lỗi của bạn, đó là vũ trụ đang thử thách lòng kiên nhẫn trước khi tạo ra kiệt tác.",
  punchlines: [
    "Biến ý tưởng thành bot Zalo thực chiến 24/7.",
    "Nói chuyện bằng commit, chứng minh bằng sản phẩm.",
    "Tối ưu microsecond, nâng niu từng dòng code.",
    "Không phải bản beta của một CV nhàm chán."
  ]
};

export const SOCIAL_LINKS = {
  zalo: {
    label: "Zalo",
    value: "0913288691",
    url: "https://zalo.me/0913288691",
    action: "Nhắn tin Zalo"
  },
  github: {
    label: "GitHub",
    value: "@Xuankiendev",
    url: "https://github.com/Xuankiendev",
    action: "Xem GitHub"
  },
  tiktok: {
    label: "TikTok",
    value: "@vxkitvn",
    url: "https://www.tiktok.com/@vxkitvn",
    action: "Ghé thăm TikTok"
  },
  email: {
    label: "Email",
    value: "Vxkiue@gmail.com",
    url: "mailto:Vxkiue@gmail.com",
    action: "Gửi Email"
  }
};

export const BANK_INFO = {
  accountNumber: "0345864723",
  accountName: "VŨ XUÂN KIÊN",
  bankName: "Ngân Hàng",
  zaloPayNumber: "0345864723",
  zaloPayName: "VŨ XUÂN KIÊN",
  defaultNote: 'Đô nét cho dự án "Nuôi Kiên"',
  caffeineOptions: [
    { label: "1 Ly Cafe Đen", amount: "25.000đ", value: 25000, desc: "Tăng 2 tiếng tập trung fix bug" },
    { label: "1 Bát Phở Bò", amount: "50.000đ", value: 50000, desc: "Bổ sung năng lượng refactor code" },
    { label: "1 Thùng RedBull", amount: "100.000đ", value: 100000, desc: "Cày đêm release tính năng mới" },
    { label: "Thẻ VIP Nhà Tài Trợ", amount: "200.000đ", value: 200000, desc: "Vinh danh nhà hảo tâm số 1" }
  ]
};

export const TECH_STACK = [
  { name: "Node.js", category: "Backend", level: "Expert", color: "#68a063" },
  { name: "JavaScript (ESM)", category: "Core", level: "Advanced", color: "#f7df1e" },
  { name: "React 19", category: "Frontend", level: "Advanced", color: "#61dafb" },
  { name: "Three.js", category: "3D Graphics", level: "Intermediate", color: "#ffffff" },
  { name: "Zalo Bot Protocol", category: "Automation", level: "Master", color: "#0068ff" },
  { name: "SQLite & Knex", category: "Database", level: "Advanced", color: "#003b57" },
  { name: "Vite", category: "Build Tool", level: "Advanced", color: "#bd34fe" },
  { name: "PM2 Multi-process", category: "DevOps", level: "Expert", color: "#2b037a" },
  { name: "Web Scraping & APIs", category: "Tooling", level: "Advanced", color: "#fa5d19" },
  { name: "Skia Canvas 2D", category: "Graphics", level: "Advanced", color: "#ff2a85" }
];

export const PHILOSOPHY_PILLARS = [
  {
    index: "01",
    title: "Sản phẩm thực tế",
    desc: "Xây dựng bot và công cụ phục vụ nhu cầu thật của cộng đồng — không chỉ để code cho vui, dù vui vẫn là cốt lõi."
  },
  {
    index: "02",
    title: "Show your work",
    desc: "Biến GitHub thành nhật ký sản phẩm sống, chứ không chỉ là chỗ cất code rồi quên mật khẩu."
  },
  {
    index: "03",
    title: "Chất riêng không pha tạp",
    desc: "Duy trì phong cách cyberpunk, năng lượng cao và đủ mặn mòi để người xem ấn tượng từ giây đầu tiên."
  }
];

export const PROJECTS = [
  {
    id: "botjs-vxk",
    title: "botjs-vxk (Bot Zalo Unofficial)",
    badge: "Featured Masterpiece",
    category: "bot",
    categoryLabel: "Bot & Automation",
    stars: 12,
    language: "JavaScript / Node.js",
    desc: "Hệ thống Zalo Bot unofficial thế hệ mới tối ưu hoá message event, command router phân tầng, game giải trí, kinh tế ảo và quản lý nhóm tự động đa tiến trình với PM2.",
    highlights: ["Xử lý sự kiện tin nhắn thời gian thực", "Kiến trúc command phân luồng", "Chống TOCTOU số dư atomic", "Canvas render đồ họa sắc nét"],
    githubUrl: "https://github.com/Xuankiendev/botjs-vxk",
    demoUrl: "https://zalo.me/0913288691",
    gradient: "from-orange-500/20 via-pink-500/10 to-transparent",
    accentColor: "#fa5d19"
  },
  {
    id: "duoi-hinh-bat-chu",
    title: "duoi-hinh-bat-chu",
    badge: "Public Experiment",
    category: "game",
    categoryLabel: "Mini Games & Tools",
    stars: 8,
    language: "JavaScript",
    desc: "Trò chơi giải đố đuổi hình bắt chữ với ngân hàng câu hỏi dí dỏm, nhận diện hình ảnh và tương tác người dùng theo phong cách vừa học vừa đoán vừa cay cú.",
    highlights: ["Ngân hàng dữ liệu phong phú", "Tính điểm và streak liên hoàn", "UX tương tác giải đố realtime", "Gợi ý thông minh"],
    githubUrl: "https://github.com/Xuankiendev/duoi-hinh-bat-chu",
    demoUrl: "https://github.com/Xuankiendev/duoi-hinh-bat-chu",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "#00f2fe"
  },
  {
    id: "portfolio-3d",
    title: "Xuankiendev Portfolio 3D",
    badge: "Core Brand Hub",
    category: "web",
    categoryLabel: "Web & UI/UX",
    stars: 15,
    language: "React 19 + Three.js",
    desc: "Portfolio thế hệ mới kết hợp 3D Scene tương tác chuột, Bento Grid lấy cảm hứng từ evondev, Cyberpunk HUD và Terminal điều khiển ảo 60fps siêu mượt.",
    highlights: ["Không gian 3D Three.js thời gian thực", "Bento Grid cards 3D tilt", "Interactive Terminal Simulator", "Dark theme neon phát sáng"],
    githubUrl: "https://github.com/Xuankiendev/xuankiendev.github.io",
    demoUrl: "https://xuankiendev.github.io",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    accentColor: "#bd34fe"
  },
  {
    id: "api-vxk1997",
    title: "api-vxk1997",
    badge: "Microservices",
    category: "api",
    categoryLabel: "API & Utilities",
    stars: 6,
    language: "Node.js / Vercel Serverless",
    desc: "Bộ API tiện ích và microservices cá nhân phục vụ media crawling, xử lý video, trích xuất dữ liệu và cấp dữ liệu cho hệ sinh thái bot cá nhân.",
    highlights: ["Crawl & stream media tốc độ cao", "Triển khai serverless tự scale", "Token guard an toàn", "Endpoints đa dụng cho bot"],
    githubUrl: "https://github.com/Xuankiendev/api-vxk1997",
    demoUrl: "https://github.com/Xuankiendev/api-vxk1997",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#10b981"
  }
];

export const TERMINAL_COMMANDS = {
  help: "Danh sách lệnh có thể dùng:\n- whoami: Xem thông tin tác giả Vũ Xuân Kiên\n- skills: Danh sách tech stack chính\n- projects: Các dự án tiêu biểu\n- stats: Thống kê hiệu suất bot & repo\n- donate: Thông tin ủng hộ quỹ Nuôi Kiên\n- contact: Kênh liên hệ Zalo & GitHub\n- clear: Xóa màn hình terminal",
  whoami: "Vũ Xuân Kiên (Xuankiendev)\nNghề nghiệp: Zalo Bot Architect & Automation Wizard\nVị trí: Việt Nam\nTriết lý: 'Nói chuyện bằng commit, chứng minh bằng sản phẩm.'",
  skills: "Kỹ năng chuyên sâu:\n• Backend: Node.js, Express, PM2 cluster, SQLite, Knex\n• Automation: Zalo Protocol, Web scraping, Puppeteer, Task runner\n• Graphics: Three.js, React 19, Skia Canvas, Cyberpunk UI\n• Tooling: Git, Linux VPS, Vite, Tailwind CSS",
  projects: "Dự án chính:\n1. botjs-vxk: Bot Zalo unofficial đa năng (Featured)\n2. duoi-hinh-bat-chu: Game giải đố JavaScript siêu cuốn\n3. xuankiendev.github.io: Không gian 3D web cá nhân thế hệ mới\n4. api-vxk1997: Bộ microservices tiện ích cho bot",
  stats: "Hệ thống số liệu:\n• Uptime bot cluster: 99.9%\n• Sự kiện tin nhắn xử lý/ngày: 100,000+\n• Public repos: 40+\n• Số cốc cafe tiêu thụ/tuần: Không đếm xuể",
  donate: "Ủng hộ dự án 'Nuôi Kiên':\n• Ngân hàng / ZaloPay: 0345864723\n• Chủ tài khoản: VŨ XUÂN KIÊN\n• Nội dung: Đô nét cho dự án Nuôi Kiên\nCảm ơn bạn đã tiếp thêm caffeine cho Kiên!",
  contact: "Kết nối với Kiên:\n• Zalo: 0913288691 (https://zalo.me/0913288691)\n• GitHub: https://github.com/Xuankiendev\n• TikTok: @vxkitvn (https://www.tiktok.com/@vxkitvn)\n• Email: Vxkiue@gmail.com"
};
