// --- 初期化処理 ---
document.addEventListener('DOMContentLoaded', () => {
    // 年号の自動更新
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // データのレンダリング
    renderShowcase();
    renderVideos();
    
    // Lucideアイコンの初期化（HTML注入後に実行）
    lucide.createIcons();
    
    // 各種イベントリスナーの設定
    initScrollObserver();
    initFadeInObserver();
    initMobileMenu();
    initModal();
});

// --- データ定義 ---

// 実績画像データ (20枚)
// ※ご自身の画像を使用する場合は src のURLを書き換えてください
const showcaseImages = [
    { id: 1, category: "Residential", title: "Modern Villa", src: "images/A01.jpg" },
    { id: 2, category: "Residential", title: "Luxury Home", src: "images/A02.jpg" },
    { id: 3, category: "Residential", title: "Minimalist House", src: "images/A03.jpg" },
    { id: 4, category: "Residential", title: "Wooden Cottage", src: "images/A04.jpg" },
    { id: 5, category: "Residential", title: "Urban Apartment", src: "images/A05.jpg" },
    { id: 6, category: "Residential", title: "Sea Side View", src: "images/A06.jpg" },
    { id: 7, category: "Interior", title: "Living Room", src: "images/A07.jpg" },
    { id: 8, category: "Interior", title: "Kitchen Design", src: "images/A08.jpg" },
    { id: 9, category: "Interior", title: "Master Bedroom", src: "images/A09.jpg" },
    { id: 10, category: "Interior", title: "Dining Area", src: "images/A10.jpg" },
    { id: 11, category: "Interior", title: "Home Office", src: "images/A11.jpg" },
    { id: 12, category: "Interior", title: "Bathroom", src: "images/A12.jpg" },
    { id: 13, category: "Interior", title: "Kids Room", src: "images/A13.jpg" },
    { id: 14, category: "Commercial", title: "Office Building", src: "images/A14.jpg" },
    { id: 15, category: "Commercial", title: "Hotel Lobby", src: "images/A15.jpg" },
    { id: 16, category: "Commercial", title: "Cafe Interior", src: "images/A16.jpg" },
    { id: 17, category: "Commercial", title: "Shopping Mall", src: "images/A17.jpg" },
    { id: 18, category: "Commercial", title: "Museum", src: "images/A18.jpg" },
    { id: 19, category: "Landscape", title: "Public Park", src: "images/A19.jpg" },
    { id: 20, category: "Landscape", title: "Garden Design", src: "images/A20.jpg" },
];

// 動画データ (2つ)
const showcaseVideos = [
    { 
        id: 1, 
        title: "Residential Walkthrough", 
        desc: "戸建住宅 内観・外観アニメーション",
        thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop", 
        videoUrl: "https://www.youtube.com/" 
    },
    { 
        id: 2, 
        title: "Commercial Concept", 
        desc: "商業施設 コンセプトムービー",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", 
        videoUrl: "https://www.youtube.com/" 
    },
];

// --- 画面描画ロジック ---

// 実績画像のHTML生成
function renderShowcase() {
    const grid = document.getElementById('showcase-grid');
    if(!grid) return;

    grid.innerHTML = showcaseImages.map((img, index) => {
        const isLarge = index % 5 === 0 ? 'col-span-2 row-span-2' : '';
        // 遅延表示のためのスタイル（インラインで設定）
        const delayStyle = `transition-delay: ${index * 50}ms`;
        
        // onclickイベントで画像のURLなどを渡す
        // 文字列のエスケープ処理に注意（簡易的にシングルクォートで囲む）
        return `
            <div 
                class="fade-section showcase-item group relative h-full overflow-hidden rounded-xl cursor-pointer ${isLarge}"
                style="${delayStyle}"
                onclick="openModal('${img.src}', '${img.title}', '${img.category}')"
            >
                <img src="${img.src}" alt="${img.title}" loading="lazy" class="w-full h-full object-cover">
                <div class="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <i data-lucide="maximize-2" class="w-4 h-4"></i>
                </div>
                <div class="overlay absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                    <div>
                        <p class="text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-1">${img.category}</p>
                        <h4 class="text-white font-bold text-sm md:text-base">${img.title}</h4>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 動画セクションのHTML生成
function renderVideos() {
    const grid = document.getElementById('video-grid');
    if(!grid) return;

    grid.innerHTML = showcaseVideos.map((video, index) => {
        const delayStyle = `transition-delay: ${index * 200}ms`;
        return `
            <div class="fade-section video-card bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-orange-500/50 transition-all group" style="${delayStyle}">
                <div class="relative aspect-video cursor-pointer" onclick="window.open('${video.videoUrl}', '_blank')">
                    <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="play-button w-16 h-16 bg-orange-600/90 rounded-full flex items-center justify-center text-white shadow-lg">
                            <i data-lucide="play-circle" class="w-8 h-8 fill-white text-orange-600"></i>
                        </div>
                    </div>
                    <div class="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded text-xs text-white flex items-center gap-1">
                        YouTube <i data-lucide="external-link" class="w-3 h-3"></i>
                    </div>
                </div>
                <div class="p-6">
                    <h4 class="text-xl font-bold mb-2 text-white group-hover:text-orange-500 transition-colors">${video.title}</h4>
                    <p class="text-stone-400 text-sm">${video.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

// --- ユーティリティ機能 ---

// スムーススクロール機能
window.scrollToSection = function(id) {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        
        // モバイルメニューが開いていれば閉じる
        const menu = document.getElementById('mobile-menu');
        const menuButton = document.getElementById('menu-toggle');
        if (menu.classList.contains('translate-x-0')) {
            menu.classList.remove('translate-x-0');
            menu.classList.add('translate-x-full');
            // アイコンを三本線に戻す
            menuButton.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
            lucide.createIcons();
        }
    }
};

// ヘッダーの背景色切り替え（スクロール時）
function initScrollObserver() {
    const header = document.getElementById('main-header');
    if(!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-stone-950/90', 'backdrop-blur-md', 'py-4', 'shadow-lg');
            header.classList.remove('py-6', 'bg-transparent');
        } else {
            header.classList.remove('bg-stone-950/90', 'backdrop-blur-md', 'py-4', 'shadow-lg');
            header.classList.add('py-6', 'bg-transparent');
        }
    });
}

// フェードインアニメーション監視
function initFadeInObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));
}

// モバイルメニューの制御
function initMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    
    if(!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = menu.classList.contains('translate-x-0');
        if (isOpen) {
            // 閉じる
            menu.classList.remove('translate-x-0');
            menu.classList.add('translate-x-full');
            toggleBtn.innerHTML = '<i data-lucide="menu" class="w-7 h-7"></i>';
        } else {
            // 開く
            menu.classList.add('translate-x-0');
            menu.classList.remove('translate-x-full');
            toggleBtn.innerHTML = '<i data-lucide="x" class="w-7 h-7"></i>';
        }
        lucide.createIcons();
    });
}

// モーダル（画像拡大）の制御
function initModal() {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.getElementById('modal-close');
    
    if(!modal) return;

    // 開く関数（グローバルスコープに登録してHTMLから呼べるようにする）
    window.openModal = function(src, title, category) {
        const modalImg = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalCat = document.getElementById('modal-category');

        modalImg.src = src;
        modalTitle.textContent = title;
        modalCat.textContent = category;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // アニメーション用（少し遅らせてopacityを1にする）
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalImg.classList.add('scale-100');
        }, 10);
    };

    // 閉じる関数
    const closeModal = () => {
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    };

    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // 背景クリックでも閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}
