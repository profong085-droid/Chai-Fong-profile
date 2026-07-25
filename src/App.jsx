import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Globe, 
  Mail, 
  Compass, 
  GraduationCap, 
  Palette, 
  Heart, 
  Share2, 
  CheckCircle2, 
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Info,
  X,
  Send,
  Eye,
  Star,
  MessageSquare,
  Briefcase,
  Zap,
  Check,
  Image as ImageIcon
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('km'); // 'km' or 'en'
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(248);
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);
  const [activeSoftware, setActiveSoftware] = useState(null);
  const [showHearts, setShowHearts] = useState([]);
  
  // Modal states
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: 'children_book', message: '' });

  // Dictionary for Khmer vs English
  const t = {
    km: {
      author: "ឆៃហ្វុង",
      portfolio: "ស្នាដៃគំនូរ",
      year: "២០២៥",
      aboutTitle: "អំពីខ្ញុំ!",
      aka: "ហៅក្រៅ៖ ហ្វុង (Fong)",
      greeting: "ជម្រាបសួរ!",
      bio: "ខ្ញុំគឺជាអ្នកគូររូបបកស្រាយ (Illustrator) ដែលមានបេះដូងស្រឡាញ់ការបង្កើតសាច់រឿង និងគំនិតច្នៃប្រឌិតប្លែកៗ។ ស្នាដៃរបស់ខ្ញុំផ្តោតលើការគូររូបឌីជីថល (Digital Drawing), គំនូរសៀវភៅកុមារ, ការឌីហ្សាញតួអង្គ, រឿងគំនូរជីវចល (Comics) និងការរៀបចំទំព័រទស្សនាវដ្តី។ ខ្ញុំតែងតែខិតខំរៀនសូត្រ និងអភិវឌ្ឍសមត្ថភាពជានិច្ច ដើម្បីបង្កើតស្នាដៃថ្មីៗដែលមានជីវិត។",
      openForWork: "ទទួលការងារសេរី / Commission Open",
      hireMe: "ជួលគូររូប / ផ្ញើសារ",
      eduTitle: "ការអប់រំ",
      eduDesc: "បច្ចុប្បន្នកំពុងសិក្សានៅវិទ្យាស្ថានបច្ចេកវិទ្យាអាមេរិក (ITLA)។",
      skillsTitle: "ជំនាញស្ទាត់ជំនាញ",
      skills: [
        "គំនូរឌីជីថល (Digital Illustration)",
        "គំនូរសៀវភៅកុមារ (Children's Books)",
        "ការឌីហ្សាញតួអង្គ (Character Design)",
        "រឿងគំនូរជីវចល (Comics)",
        "រៀបចំប្លង់ទស្សនាវដ្តី (Magazine Layout)"
      ],
      softwaresTitle: "កម្មវិធីប្រើប្រាស់ស្ទាត់ជំនាញ",
      galleryTitle: "ស្នាដៃ",
      gallerySubtitle: "ចុចលើរូបដើម្បីមើលលម្អិត & ព័ត៌មានគម្រោង",
      categories: {
        all: "ទាំងអស់",
        digital: "គំនូរឌីជីថល",
        character: "តួអង្គ",
        books: "សៀវភៅកុមារ",
        comics: "គំនូរជីវចល"
      },
      stats: {
        projects: "គម្រោងបញ្ចប់",
        books: "សៀវភៅកុមារ",
        satisfaction: "ការពេញចិត្ត",
        experience: "ឆ្នាំបទពិសោធន៍"
      },
      reviewsTitle: "មតិសរសើរពីអតិថិជន",
      contactModalTitle: "ផ្ញើសារ ឬ ជួលគូររូប",
      formName: "ឈ្មោះរបស់អ្នក",
      formEmail: "អាសយដ្ឋានអ៉ីមែល",
      formService: "ប្រភេទសេវាកម្ម",
      formMessage: "សារលម្អិតពីគម្រោង",
      sendBtn: "ផ្ញើសារឥឡូវនេះ",
      successMsg: "សាររបស់អ្នកត្រូវបានផ្ញើរួចរាល់! ហ្វុង នឹងឆ្លើយតបឆាប់ៗនេះ។",
      closeBtn: "បិទ",
      copyEmail: "ចម្លងអ៉ីមែល",
      copiedEmail: "បានចម្លងអ៉ីមែល!",
      toggleLang: "English",
      interactiveHint: "ចុចលើរូបដើម្បីមើលសមត្ថភាព!"
    },
    en: {
      author: "Chai Fong",
      portfolio: "PORTFOLIO",
      year: "2025",
      aboutTitle: "About Me!",
      aka: "A.K.A Fong",
      greeting: "Hi!",
      bio: "I'm an illustrator with a love for storytelling and playful ideas. My work moves between digital drawing, children's illustration, character design, comics, and magazine layout. I'm always eager to learn, grow, and push my creativity further—because every project is a new chance to bring ideas to life.",
      openForWork: "Open for Commissions",
      hireMe: "Hire Me / Message",
      eduTitle: "Education",
      eduDesc: "Currently studying at the Technological Institute of the Americas (ITLA).",
      skillsTitle: "Skills",
      skills: [
        "Digital Illustration",
        "Children's Illustration",
        "Character Design",
        "Comics",
        "Magazine Layout"
      ],
      softwaresTitle: "Softwares",
      galleryTitle: "Featured Artworks",
      gallerySubtitle: "Click on any artwork to view details & project story",
      categories: {
        all: "All Works",
        digital: "Digital Art",
        character: "Character",
        books: "Children's Book",
        comics: "Comics"
      },
      stats: {
        projects: "Projects Done",
        books: "Books Published",
        satisfaction: "Client Rating",
        experience: "Years Exp"
      },
      reviewsTitle: "Client Reviews",
      contactModalTitle: "Get in Touch / Request Commission",
      formName: "Your Name",
      formEmail: "Email Address",
      formService: "Project Category",
      formMessage: "Project Details / Inquiry",
      sendBtn: "Send Inquiry",
      successMsg: "Your message has been sent successfully! Fong will reply shortly.",
      closeBtn: "Close",
      copyEmail: "Copy Email",
      copiedEmail: "Email Copied!",
      toggleLang: "ភាសាខ្មែរ",
      interactiveHint: "Click profile for magic!"
    }
  }[lang];

  // Portfolio items data
  const artworks = [
    {
      id: 1,
      title: lang === 'km' ? 'អាណាព្យាបាលព្រៃវេទមន្ត' : 'The Mystic Forest Guardian',
      category: 'character',
      categoryLabel: lang === 'km' ? 'តួអង្គ' : 'Character',
      img: '/images/IMG_8039.JPG',
      gradient: 'from-amber-400 via-rose-400 to-indigo-500',
      description: lang === 'km' 
        ? 'ការឌីហ្សាញតួអង្គទេពអប្សរាព្រៃឈើ បង្កើតឡើងដោយការប្រើប្រាស់ Procreate សម្រាប់ការគូរលម្អិតពណ៌ និងបន្លឺពន្លឺព្រះអាទិត្យ។' 
        : 'Digital character concept art created for a fantasy storybook using Procreate with vivid light effects.',
      client: 'StoryMagic Publishing',
      year: '2024',
      tools: ['Procreate', 'Photoshop'],
      likes: 142
    },
    {
      id: 2,
      title: lang === 'km' ? 'អ្នកក្លាហានតូច & នាគហោះ' : 'Little Adventurer & Flying Dragon',
      category: 'books',
      categoryLabel: lang === 'km' ? 'សៀវភៅកុមារ' : "Children's Book",
      img: '/images/IMG_8039.JPG',
      gradient: 'from-sky-400 via-teal-300 to-emerald-500',
      description: lang === 'km' 
        ? 'ស្នាដៃគំនូរសៀវភៅកុមារបែបក្តីស្រមៃ ដែលរំលេចនូវមិត្តភាព និងការផ្សងព្រេងក្នុងពិភពអាកាស។' 
        : 'Whimsical children’s book illustration showcasing friendship and adventure in the clouds.',
      client: 'DreamKids Press',
      year: '2025',
      tools: ['Procreate', 'InDesign'],
      likes: 98
    },
    {
      id: 3,
      title: lang === 'km' ? 'រឿងរ៉ាវទីក្រុងស៊ីប័រ Cyberpunk' : 'Neon Cyberpunk Chronicles',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'គំនូរជីវចល' : 'Comics',
      img: '/images/IMG_8039.JPG',
      gradient: 'from-fuchsia-500 via-purple-600 to-cyan-500',
      description: lang === 'km' 
        ? 'ការគូររឿងគំនូរជីវចលបែប Futurism រៀបចំប្លង់ទំព័រ និងការប្រើប្រាស់ពណ៌ Neon ភ្លឺផ្លេក។' 
        : 'Futuristic comic book panel layout with neon palette and expressive dynamic characters.',
      client: 'Indie Comic Studio',
      year: '2024',
      tools: ['Photoshop', 'Illustrator'],
      likes: 185
    },
    {
      id: 4,
      title: lang === 'km' ? 'ទស្សនាវដ្តីរុក្ខជាតិមន្តអាគម' : 'Botanical Wonder Journal',
      category: 'digital',
      categoryLabel: lang === 'km' ? 'គំនូរឌីជីថល' : 'Digital Art',
      img: '/images/IMG_8039.JPG',
      gradient: 'from-emerald-400 via-emerald-600 to-indigo-700',
      description: lang === 'km' 
        ? 'ស្នាដៃរៀបចំប្លង់ទស្សនាវដ្តី និងការលាយបញ្ចូលគ្នារវាងរូបគំនូរបែបធម្មជាតិ និងអក្សរផ្ចង់។' 
        : 'Editorial layout artwork combining intricate botanical illustrations and modern typography.',
      client: 'Flora Magazine',
      year: '2025',
      tools: ['InDesign', 'Procreate'],
      likes: 76
    },
    {
      id: 5,
      title: lang === 'km' ? 'អ្នកយល់សប្តិក្នុងសកលលោក' : 'Cosmic Dreamer',
      category: 'digital',
      categoryLabel: lang === 'km' ? 'គំនូរឌីជីថល' : 'Digital Art',
      img: '/images/IMG_8039.JPG',
      gradient: 'from-violet-600 via-purple-500 to-pink-500',
      description: lang === 'km' 
        ? 'ការគូររូបភាពស្រមើស្រមៃអាកាស ផ្កាយ និងពពកចម្រុះពណ៌បែបសុបិនដ៏ស្រស់ស្អាត។' 
        : 'Surreal space-themed artwork depicting dreams and celestial elements in warm pastels.',
      client: 'Personal Art Project',
      year: '2024',
      tools: ['Procreate'],
      likes: 210
    },
    {
      id: 6,
      title: lang === 'km' ? 'រឿងរ៉ាវប្រាសាទមាសបុរាណ' : 'Legend of Golden Temple',
      category: 'books',
      categoryLabel: lang === 'km' ? 'សៀវភៅកុមារ' : "Children's Book",
      img: '/images/IMG_8039.JPG',
      gradient: 'from-amber-300 via-orange-400 to-rose-500',
      description: lang === 'km' 
        ? 'គំនូរគម្របសៀវភៅកុមារបែបប្រវត្តិសាស្ត្រ និងវប្បធម៌ បង្ហាញពីប្រាសាទបុរាណដ៏អស្ចារ្យ។' 
        : 'Cultural storybook cover illustration rich in tradition, architectural details, and warmth.',
      client: 'Heritage Publications',
      year: '2025',
      tools: ['Procreate', 'Photoshop'],
      likes: 124
    }
  ];

  const filteredArtworks = activeTab === 'all' 
    ? artworks 
    : artworks.filter(a => a.category === activeTab);

  const softwareList = [
    { name: "CapCut", percent: 95, color: "bg-[#000000]", text: "text-white", icon: "Cc" },
    { name: "InDesign", percent: 84, color: "bg-[#4d001b]", text: "text-[#ff3366]", icon: "Id" },
    { name: "Photoshop", percent: 65, color: "bg-[#001d38]", text: "text-[#31a8ff]", icon: "Ps" },
    { name: "Premiere", percent: 48, color: "bg-[#000055]", text: "text-[#9999ff]", icon: "Pr" },
    { name: "Illustrator", percent: 38, color: "bg-[#331400]", text: "text-[#ff9900]", icon: "Ai" }
  ];

  const clientReviews = [
    {
      quote: lang === 'km' 
        ? '«ស្នាដៃរបស់ ហ្វុង មានភាពច្នៃប្រឌិតខ្ពស់ ពណ៌ស្រស់ឆើតឆាយ និងធ្វើឲ្យសៀវភៅកុមាររបស់យើងមានជីវិតប្លែក!»' 
        : '"Fong\'s artwork brings our children\'s stories to life with incredible warmth, color, and character charm."',
      author: 'Sophia Chen',
      role: lang === 'km' ? 'អ្នកដឹកនាំសិល្បៈ StoryMagic' : 'Art Director, StoryMagic'
    },
    {
      quote: lang === 'km' 
        ? '«ធ្វើការជាមួយ ហ្វុង រហ័សទាន់ចិត្ត និងទទួលបានលទ្ធផលលើសពីការរំពឹងទុក។ ជំនាញ Procreate & Layout ពិតជាស្ទាត់ជំនាញ!»' 
        : '"Working with Fong was effortless. Her mastery of Procreate and layout design exceeded our expectations!"',
      author: 'Marcus Vance',
      role: lang === 'km' ? 'ចៅក្រមបោះពុម្ភ Indie Press' : 'Publisher, Indie Press'
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("Fongartcontact@gmail.com");
    setCopied(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(prev => prev + 1);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } else {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    }
  };

  const triggerHearts = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setShowHearts(prev => [...prev, newHeart]);
    confetti({ particleCount: 20, spread: 40, origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight } });
    setTimeout(() => {
      setShowHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
    setTimeout(() => {
      setFormSent(false);
      setShowHireModal(false);
      setFormData({ name: '', email: '', service: 'children_book', message: '' });
    }, 3000);
  };

  return (
    <div className="w-full max-w-full sm:max-w-[440px] mx-auto flex justify-center pb-0 sm:pb-10 overflow-hidden">
      <div className="w-full max-w-full bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300 sm:border sm:border-gray-100">

        {/* FLOAT BAR: LANGUAGE TOGGLE & LIKES */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button 
            onClick={() => setLang(l => l === 'km' ? 'en' : 'km')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-xs font-bold text-brand-navy hover:scale-105 transition-all duration-200 border border-white/50"
          >
            <Globe className="w-3.5 h-3.5 text-brand-pink" />
            <span>{t.toggleLang}</span>
          </button>
        </div>

        {/* HERO SECTION WITH FULL UNCROPPED NATURAL DIMENSIONS */}
        <section className="relative w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[32px] bg-[#e2f0f9]">
          <img 
            src="/images/IMG_8039.JPG" 
            alt="Chai Fong Portfolio Hero"
            className="w-full h-auto block hover:scale-105 transition-transform duration-700"
          />
          
          {/* Subtle Floating Glow Effect Badge */}
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/70 shadow-lg text-[11px] font-bold text-brand-navy">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{lang === 'km' ? 'ស្នាដៃឌីជីថល ២០២៥' : 'Illustration Portfolio 2025'}</span>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="px-4 py-5 sm:p-7 sm:pb-5 bg-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="font-cursive text-xl sm:text-2xl font-bold text-gray-500 italic">
              {t.aboutTitle}
            </h2>
            
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                liked ? 'bg-rose-500 text-white scale-105 shadow-rose-200' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-white text-white' : 'fill-rose-500 text-rose-500'}`} />
              <span>{likesCount}</span>
            </button>
          </div>

          <div className="flex flex-row items-start justify-between gap-3">
            {/* Left Info */}
            <div className="flex-1 min-w-0">
              <div className="relative mb-2 sm:mb-3">
                <h1 className="font-display font-black text-[24px] sm:text-[30px] leading-tight text-brand-navy tracking-tight">
                  {lang === 'km' ? (
                    <>ឆៃហ្វុង</>
                  ) : (
                    <>CHAI FONG</>
                  )}
                </h1>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1 font-medium">
                  {t.aka}
                </p>

                {/* SVG Curved Arrow */}
                <svg className="absolute -top-1 -right-[35px] sm:-right-[52px] w-[45px] sm:w-[55px] h-[35px] sm:h-[40px] pointer-events-none hidden sm:block" viewBox="0 0 100 60" fill="none">
                  <path d="M10 45 Q 50 5 90 25" stroke="#1d1b4b" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M80 15 L 92 26 L 78 32" stroke="#1d1b4b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="mt-3 sm:mt-4 text-[11px] sm:text-[11.5px] leading-relaxed text-gray-700">
                <span className="font-bold text-sm sm:text-base mr-1 text-brand-navy">{t.greeting}</span>
                <span className="font-normal">{t.bio}</span>
              </div>
            </div>

            {/* Right Profile Avatar with Interactive Hearts */}
            <div className="flex flex-col items-center shrink-0 w-[110px] sm:w-[135px]">
              <div 
                onClick={triggerHearts}
                className="w-[105px] h-[105px] sm:w-[135px] sm:h-[135px] rounded-full overflow-hidden relative shadow-lg mb-3 cursor-pointer hover:scale-105 transition-all duration-300 group border-2 border-white ring-4 ring-rose-100/60 bg-white"
                title={t.interactiveHint}
              >
                <img 
                  src="/images/IMG_7733.JPG" 
                  alt="Chai Fong Profile" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                {showHearts.map(h => (
                  <span 
                    key={h.id} 
                    className="absolute text-lg animate-bounce pointer-events-none drop-shadow"
                    style={{ left: h.x, top: h.y }}
                  >
                    💖
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-1.5 w-full text-left">
                <a href="#" className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-brand-pink transition-colors">
                  <Compass className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                  <span className="truncate">Fong.art</span>
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-brand-pink transition-colors text-left group"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-navy shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{copied ? t.copiedEmail : 'Fongartcontact@...'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* QUICK STATS HIGHLIGHT ROW */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-5 pt-4 border-t border-gray-100 text-center">
            <div className="p-1.5 sm:p-2 rounded-xl bg-gray-50/80">
              <div className="text-sm sm:text-base font-black text-brand-navy">50+</div>
              <div className="text-[9px] sm:text-[9.5px] font-semibold text-gray-500 leading-tight mt-0.5">{t.stats.projects}</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-xl bg-rose-50/60">
              <div className="text-sm sm:text-base font-black text-brand-pink">15+</div>
              <div className="text-[9px] sm:text-[9.5px] font-semibold text-gray-500 leading-tight mt-0.5">{t.stats.books}</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-xl bg-sky-50/60">
              <div className="text-sm sm:text-base font-black text-brand-cyan">99%</div>
              <div className="text-[9px] sm:text-[9.5px] font-semibold text-gray-500 leading-tight mt-0.5">{t.stats.satisfaction}</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-50/60">
              <div className="text-sm sm:text-base font-black text-amber-600">5+</div>
              <div className="text-[9px] sm:text-[9.5px] font-semibold text-gray-500 leading-tight mt-0.5">{t.stats.experience}</div>
            </div>
          </div>
        </section>

        {/* EDUCATION & SKILLS SECTION */}
        <section className="px-7 py-5 bg-white">
          <div className="grid grid-cols-2 gap-5">
            
            {/* Education */}
            <div className="relative">
              <div className="relative flex items-center mb-2">
                <svg className="absolute -top-6 -left-3 w-8 h-8" viewBox="0 0 40 40" fill="none">
                  <path d="M5 25 C 10 5, 25 5, 20 20 C 15 35, 30 35, 35 20" stroke="#e85d75" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <h3 className="font-display text-xl font-extrabold text-brand-navy tracking-tight flex items-center gap-1.5">
                  <GraduationCap className="w-5 h-5 text-brand-pink" />
                  <span>{t.eduTitle}</span>
                </h3>
              </div>
              <p className="text-[11.5px] leading-relaxed text-gray-600 font-normal">
                {t.eduDesc}
              </p>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center mb-2">
                <h3 className="font-display text-xl font-extrabold text-brand-navy tracking-tight flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-brand-pink" />
                  <span>{t.skillsTitle}</span>
                </h3>
              </div>
              <ul className="list-disc pl-4 space-y-0.5">
                {t.skills.map((skill, i) => (
                  <li key={i} className="text-[11.5px] text-gray-700 font-medium leading-relaxed">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* SOFTWARES SECTION */}
        <section className="px-7 pb-6 bg-white border-b border-gray-100">
          <h3 className="font-display text-xl font-extrabold text-brand-navy tracking-tight mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-pink" />
            <span>{t.softwaresTitle}</span>
          </h3>

          <div className="flex gap-5 items-start">
            {/* Icons Grid */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div 
                  onMouseEnter={() => setActiveSoftware(0)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-xl bg-black border border-gray-800 p-2.5 flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  title="CapCut (95%)"
                >
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.5 13.5l-4.5-3.5 4.5-3.5v7zm6 0l-4.5-3.5 4.5-3.5v7z"/>
                  </svg>
                </div>
                
                <div 
                  onMouseEnter={() => setActiveSoftware(1)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-xl bg-[#4d001b] text-[#ff3366] font-display font-extrabold text-xl flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  title="InDesign (84%)"
                >
                  Id
                </div>
              </div>

              <div className="flex gap-2">
                <div 
                  onMouseEnter={() => setActiveSoftware(4)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-xl bg-[#331400] text-[#ff9900] font-display font-extrabold text-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  title="Illustrator (38%)"
                >
                  Ai
                </div>
                <div 
                  onMouseEnter={() => setActiveSoftware(3)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-xl bg-[#000055] text-[#9999ff] font-display font-extrabold text-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  title="Premiere (48%)"
                >
                  Pr
                </div>
                <div 
                  onMouseEnter={() => setActiveSoftware(2)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-xl bg-[#001d38] text-[#31a8ff] font-display font-extrabold text-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                  title="Photoshop (65%)"
                >
                  Ps
                </div>
              </div>
            </div>

            {/* Software Bars */}
            <div className="flex-1 flex flex-col gap-3 pt-0.5">
              {softwareList.map((sw, index) => {
                const isHovered = activeSoftware === index;
                return (
                  <div key={index} className="flex flex-col gap-1 group">
                    <div className="flex justify-between items-center text-[11px] font-bold text-brand-navy">
                      <span className={isHovered ? 'text-brand-pink transition-colors' : ''}>{sw.name}</span>
                      <span className="text-[10px] text-gray-500">{sw.percent}%</span>
                    </div>
                    <div className="w-full h-[7px] bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          index === 0 ? 'bg-[#222222]' :
                          index === 1 ? 'bg-[#f37b98]' :
                          index === 2 ? 'bg-[#38b6ff]' :
                          index === 3 ? 'bg-[#9c8dc7]' : 'bg-[#f7b731]'
                        } ${isHovered ? 'brightness-110 shadow-sm' : ''}`} 
                        style={{ width: `${sw.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PORTFOLIO SHOWCASE GALLERY (MOVED TO BOTTOM) */}
        <section className="px-7 py-6 bg-gradient-to-b from-gray-50 to-white border-t border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display text-xl font-extrabold text-brand-navy tracking-tight flex items-center gap-2">
                <Palette className="w-5 h-5 text-brand-pink" />
                <span>{t.galleryTitle}</span>
              </h3>
              <p className="text-[10.5px] text-gray-500 mt-0.5">{t.gallerySubtitle}</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 my-2 no-scrollbar">
            {Object.keys(t.categories).map((catKey) => {
              const isActive = activeTab === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveTab(catKey)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-brand-navy text-white shadow-sm scale-105' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {t.categories[catKey]}
                </button>
              );
            })}
          </div>

          {/* Artwork Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArtwork(art)}
                className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual Artwork Box */}
                <div className={`w-full h-[125px] relative overflow-hidden bg-gradient-to-br ${art.gradient}`}>
                  <img 
                    src={art.img} 
                    alt={art.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider">
                    {art.categoryLabel}
                  </span>

                  {/* Quick View Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-brand-navy text-xs font-bold shadow-lg flex items-center gap-1 scale-95 group-hover:scale-100 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'km' ? 'មើល' : 'View'}</span>
                    </span>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-2.5">
                  <h4 className="font-bold text-[12px] text-brand-navy truncate leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500">
                    <span>{art.year} • {art.client}</span>
                    <span className="flex items-center gap-0.5 text-rose-500 font-semibold">
                      <Heart className="w-3 h-3 fill-rose-500" />
                      {art.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMPACT SOCIAL CONTACT SECTION */}
        <section className="px-5 py-4 bg-slate-50 border-t border-gray-100 text-center">
          <h4 className="font-display font-bold text-xs text-gray-500 mb-2.5">
            {lang === 'km' ? 'ទំនាក់ទំនង (Contact)' : 'Contact'}
          </h4>

          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1877f2] text-white text-xs font-bold shadow-sm hover:-translate-y-0.5 transition-transform duration-200"
              title="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* TikTok */}
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black text-white border border-gray-800 text-xs font-bold shadow-sm hover:-translate-y-0.5 transition-transform duration-200"
              title="TikTok"
            >
              <svg className="w-4 h-4 fill-current text-teal-300" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.05.82.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 22a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.04z"/>
              </svg>
              <span>TikTok</span>
            </a>

            {/* Telegram */}
            <a 
              href="https://t.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#2AABEE] text-white text-xs font-bold shadow-sm hover:-translate-y-0.5 transition-transform duration-200"
              title="Telegram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>Telegram</span>
            </a>
          </div>
        </section>

        {/* FOOTER BAR */}
        <footer className="bg-[#12112e] py-4 px-4 text-center text-[10.5px] text-white/70 font-medium flex flex-col items-center gap-1">
          <div>© 2025 ឆៃហ្វុង • រក្សាសិទ្ធិគ្រប់យ៉ាង</div>
          <div className="flex items-center gap-3 text-white/50 text-[10px] mt-0.5">
            <span>Facebook</span>
            <span>•</span>
            <span>TikTok</span>
            <span>•</span>
            <span>Telegram</span>
          </div>
        </footer>

      </div>

      {/* ARTWORK LIGHTBOX MODAL */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-[420px] w-full overflow-hidden shadow-2xl relative border border-white/20 animate-scaleUp">
            
            {/* Modal Header Controls */}
            <button 
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Artwork Image Banner */}
            <div className={`w-full h-[220px] relative overflow-hidden bg-gradient-to-br ${selectedArtwork.gradient}`}>
              <img 
                src={selectedArtwork.img} 
                alt={selectedArtwork.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-md bg-brand-pink text-[10px] font-bold uppercase tracking-wider">
                  {selectedArtwork.categoryLabel}
                </span>
                <h3 className="font-display font-black text-xl mt-1 leading-tight text-white drop-shadow">
                  {selectedArtwork.title}
                </h3>
              </div>
            </div>

            {/* Artwork Details Body */}
            <div className="p-5 space-y-4">
              <p className="text-xs text-gray-700 leading-relaxed">
                {selectedArtwork.description}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl text-[11px]">
                <div>
                  <span className="text-gray-400 font-medium block text-[9.5px]">CLIENT / PROJECT</span>
                  <span className="font-bold text-brand-navy">{selectedArtwork.client}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block text-[9.5px]">YEAR</span>
                  <span className="font-bold text-brand-navy">{selectedArtwork.year}</span>
                </div>
              </div>

              {/* Tools tags */}
              <div>
                <span className="text-gray-400 font-medium block text-[9.5px] mb-1">TOOLS USED</span>
                <div className="flex gap-1.5">
                  {selectedArtwork.tools.map((tool, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[10.5px]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-gray-100">
                <a
                  href={selectedArtwork.demoUrl || "http://192.168.1.12:3000"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-brand-pink to-rose-600 hover:from-rose-600 hover:to-brand-pink text-white font-bold text-xs py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang === 'km' ? 'បើកមើលវេបសាយផ្ទាល់' : 'View Live Demo'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* HIRE ME / CONTACT FORM MODAL */}
      {showHireModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-[420px] w-full overflow-hidden shadow-2xl relative border border-white/20 animate-scaleUp">
            
            {/* Header */}
            <div className="bg-brand-navy text-white p-5 relative">
              <button 
                onClick={() => setShowHireModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="font-display font-extrabold text-xl flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{t.contactModalTitle}</span>
              </h3>
              <p className="text-[11px] text-white/70 mt-1">
                {lang === 'km' ? 'ផ្ញើសារសាកសួរ ឬ ប្រាប់ពីគម្រោងរបស់អ្នកមក ឡេទី' : 'Send a direct message or project commission details.'}
              </p>
            </div>

            {/* Body / Form */}
            <div className="p-5">
              {formSent ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-base text-brand-navy">
                    {lang === 'km' ? 'ផ្ញើសារបានជោគជ័យ!' : 'Message Sent!'}
                  </h4>
                  <p className="text-xs text-gray-600 max-w-[280px] mx-auto">
                    {t.successMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3 text-[11.5px]">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{t.formName}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'km' ? 'ឧទាហរណ៍៖ សុខា' : 'e.g. Sarah Connor'}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-brand-pink focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{t.formEmail}</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-brand-pink focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{t.formService}</label>
                    <select 
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-brand-pink focus:ring-2 focus:ring-rose-100 outline-none transition-all bg-white"
                    >
                      <option value="children_book">{lang === 'km' ? 'សៀវភៅកុមារ (Children’s Book)' : 'Children’s Book'}</option>
                      <option value="character">{lang === 'km' ? 'ឌីហ្សាញតួអង្គ (Character Design)' : 'Character Design'}</option>
                      <option value="digital_art">{lang === 'km' ? 'គំនូរឌីជីថល (Digital Illustration)' : 'Digital Illustration'}</option>
                      <option value="comics">{lang === 'km' ? 'រឿងគំនូរជីវចល (Comics & Layout)' : 'Comics & Layout'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{t.formMessage}</label>
                    <textarea 
                      rows="3"
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'km' ? 'រៀបរាប់ព័ត៌មានគម្រោង...' : 'Tell us about your project timeline & details...'}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:border-brand-pink focus:ring-2 focus:ring-rose-100 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-pink to-rose-600 hover:from-rose-600 hover:to-brand-pink text-white font-bold py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.sendBtn}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

