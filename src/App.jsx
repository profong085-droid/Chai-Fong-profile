import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Raw source imports for full live code viewer
import appCode from './App.jsx?raw';
import cssCode from './index.css?raw';
import portfolioHtmlCode from '../portfolio.html?raw';
import khmerPortfolioCode from '../khmer_portfolio.html?raw';
import htmlCode from '../index.html?raw';
import pkgCode from '../package.json?raw';
import sitemapCode from './sitemap.xml?raw';
import robotsCode from './robots.txt?raw';
import tailwindConfigCode from '../tailwind.config.js?raw';
import { 
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
  ChevronLeft,
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
  Image as ImageIcon,
  Download,
  FileText,
  Phone,
  Sparkles,
  Code,
  Copy,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('km'); // 'km' or 'en'
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(248);
  const [activeTab, setActiveTab] = useState('all');
  const [copied, setCopied] = useState(false);
  const [activeSoftware, setActiveSoftware] = useState(null);
  const [showHearts, setShowHearts] = useState([]);
  
  // Slideshow states for 3s auto-play
  const [slideshowIndices, setSlideshowIndices] = useState({});
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

  // Modal states
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: 'children_book', message: '' });

  // Code Viewer Modal State
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [activeCodeFile, setActiveCodeFile] = useState('App.jsx');
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeFontSize, setCodeFontSize] = useState(10); // Ultra-small 10px default for mobile viewing
  const [wrapLines, setWrapLines] = useState(true); // Auto line wrap ON by default for mobile screens

  const codeFiles = {
    'App.jsx': appCode,
    'index.css': cssCode,
    'portfolio.html': portfolioHtmlCode,
    'khmer_portfolio.html': khmerPortfolioCode,
    'sitemap.xml': sitemapCode,
    'index.html': htmlCode,
    'package.json': pkgCode,
    'tailwind.config.js': tailwindConfigCode,
    'robots.txt': robotsCode
  };

  const zoomInCode = () => setCodeFontSize(prev => Math.min(prev + 1, 24));
  const zoomOutCode = () => setCodeFontSize(prev => Math.max(prev - 1, 7));

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeFiles[activeCodeFile]);
    setCopiedCode(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.5 } });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Initial loading screen state (1% - 100%)
  const [loadingProgress, setLoadingProgress] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);

  useEffect(() => {
    let progress = 1;
    const interval = setInterval(() => {
      progress += 1;
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeOutLoader(true);
          setTimeout(() => {
            setIsLoaded(true);
          }, 500);
        }, 400);
      }
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // Dictionary for Khmer vs English
  const t = {
    km: {
      author: "ឆៃហ្វុង",
      portfolio: "ស្នាដៃគំនូរ",
      year: "២០២៥",
      aboutTitle: "អំពីខ្ញុំ!",
      aka: "ហៅក្រៅ៖ ហ្វុង (Fong)",
      greeting: "ជម្រាបសួរ!",
      bio: `ខ្ញុំគឺជា Graphic Designer និងជា Video Editor ដែលមានបេះដូងស្រឡាញ់ការបង្កើតសាច់រឿង និងគំនិតច្នៃប្រឌិតប្លែកៗ។ ជំនាញចម្បងរបស់ខ្ញុំគឺការឌីហ្សាញ Poster និងរូបភាពផ្សេងៗដោយប្រើប្រាស់ Adobe Photoshop ព្រមទាំងការកាត់តវីដេអូយ៉ាងស្ទាត់ជំនាញជាមួយ CapCut និង DaVinci Resolve។

ក្រៅពីនេះ ខ្ញុំក៏មានមូលដ្ឋានគ្រឹះក្នុងការធ្វើ Motion Graphics ដោយប្រើ Adobe After Effects និងការសរសេរកូដបង្កើតវេបសាយ (Web Development) នៅក្នុង VS Code ផងដែរ។ ខ្ញុំតែងតែខិតខំរៀនសូត្រ និងអភិវឌ្ឍសមត្ថភាពជានិច្ច ដើម្បីបង្កើតស្នាដៃថ្មីៗដែលមានទាក់ទាញ និងមានគុណភាព។`,
      openForWork: "ទទួលការងារសេរី / Commission Open",
      hireMe: "ជួលឌីហ្សាញ / ផ្ញើសារ",
      eduTitle: "ការអប់រំ & បទពិសោធន៍ការងារ",
      eduDesc: `🎓 ការសិក្សា៖
• បច្ចុប្បន្នកំពុងសិក្សានៅសាកលវិទ្យាល័យភូមិន្ទកសិកម្ម (RUA)

💼 បទពិសោធន៍នៅ Loctroi Cambodia (ក្រុមហ៊ុនថ្នាំកសិកម្ម)៖
• ធ្វើការជា Graphic Designer & Video Editor ទទួលបន្ទុកឌីហ្សាញ Poster, Banner ផ្សព្វផ្សាយផលិតផលថ្នាំកសិកម្ម និងក្រាហ្វិកលើ Social Media ដោយប្រើ Adobe Photoshop។
• កាត់ត និងផលិតវីដេអូផ្សព្វផ្សាយផលិតផលកសិកម្មយ៉ាងស្ទាត់ជំនាញជាមួយ CapCut & DaVinci Resolve ព្រមទាំងបង្កើត Motion Graphics ជាមួយ After Effects ដើម្បីឱ្យវីដេអូមានភាពរស់រវើក ទាក់ទាញ និងមានគុណភាពខ្ពស់។`,
      skillsTitle: "ជំនាញស្ទាត់ជំនាញ",
      skills: [
        "ការឌីហ្សាញ Poster & Graphics (Adobe Photoshop)",
        "ការកាត់តវីដេអូស្ទាត់ជំនាញ (CapCut & DaVinci Resolve)",
        "Motion Graphics (Adobe After Effects)",
        "ការសរសេរកូដបង្កើតវេបសាយ (Web Development - VS Code)"
      ],
      softwaresTitle: "កម្មវិធីប្រើប្រាស់ស្ទាត់ជំនាញ",
      galleryTitle: "ស្នាដៃ",
      gallerySubtitle: "ចុចលើរូបដើម្បីមើលលម្អិត & ព័ត៌មានគម្រោង",
      categories: {
        all: "ទាំងអស់",
        digital: "Graphic Design",
        character: "Video Edit",
        books: "Motion Graphics",
        comics: "Web Dev"
      },
      stats: {
        projects: "គម្រោងបញ្ចប់",
        books: "វីដេអូកាត់ត",
        satisfaction: "ការពេញចិត្ត",
        experience: "ឆ្នាំបទពិសោធន៍"
      },
      reviewsTitle: "មតិសរសើរពីអតិថិជន",
      contactModalTitle: "ផ្ញើសារ ឬ ជួលធ្វើគម្រោង",
      formName: "ឈ្មោះរបស់អ្នក",
      formEmail: "អាសយដ្ឋានអ៉ីមែល",
      formService: "ប្រភេទសេវាកម្ម",
      formMessage: "សារលម្អិតពីគម្រោង",
      sendBtn: "ផ្ញើសារឥឡូវនេះ",
      successMsg: "សាររបស់អ្នកត្រូវបានផ្ញើរួចរាល់! ហ្វុង នឹងឆ្លើយតបឆាប់ៗនេះ។",
      closeBtn: "បិទ",
      copyEmail: "ចម្លងអ៉ីមែល",
      copiedEmail: "បានចម្លងអ៉ីមែល!",
      viewCode: "មើលកូដវេបសាយ",
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
      bio: `I'm a Graphic Designer and Video Editor with a passion for storytelling and creative concepts. My primary skills focus on designing posters and promotional graphics using Adobe Photoshop, as well as professional video editing with CapCut and DaVinci Resolve.

Additionally, I have a solid foundation in Motion Graphics using Adobe After Effects and Web Development in VS Code. I am constantly learning and sharpening my skills to deliver engaging, high-quality visual work.`,
      openForWork: "Open for Freelance Work",
      hireMe: "Hire Me / Message",
      eduTitle: "Education & Work Experience",
      eduDesc: `🎓 Education:
• Currently studying at Royal University of Agriculture (RUA)

💼 Work Experience at Loctroi Cambodia (Agricultural Chemicals Company):
• Graphic Designer & Video Editor responsible for designing promotional posters, banners, and social media content for agricultural chemical products using Adobe Photoshop.
• Editing and producing engaging agricultural product videos using CapCut & DaVinci Resolve, plus creating Motion Graphics in After Effects for lively, high-quality visual content.`,
      skillsTitle: "Skills",
      skills: [
        "Graphic & Poster Design (Adobe Photoshop)",
        "Video Editing (CapCut & DaVinci Resolve)",
        "Motion Graphics (Adobe After Effects)",
        "Web Development (VS Code)"
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
      viewCode: "Source Code",
      toggleLang: "ភាសាខ្មែរ",
      interactiveHint: "Click profile for magic!"
    }
  }[lang];

  // Portfolio items data
  const artworks = [
    {
      id: 1,
      title: lang === 'km' ? 'បង្កើតវេបសាយ Loctroi Cambodia' : 'Loctroi Cambodia Website',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'បង្កើតវេបសាយ' : 'Web Dev',
      img: '/images/screenshot_271.webp',
      images: [
        '/images/screenshot_271.webp',
        '/images/screenshot_272.webp',
        '/images/screenshot_273.webp',
        '/images/screenshot_274.webp',
        '/images/screenshot_275.webp',
        '/images/screenshot_276.webp',
        '/images/screenshot_277.webp',
        '/images/screenshot_278.webp',
        '/images/screenshot_279.webp'
      ],
      gradient: 'from-emerald-500 via-teal-600 to-indigo-700',
      description: lang === 'km' 
        ? 'គម្រោងឌីហ្សាញ និងអភិវឌ្ឍន៍វេបសាយផ្លូវការរបស់ក្រុមហ៊ុនថ្នាំកសិកម្ម Loctroi Cambodia សម្រាប់ផ្សព្វផ្សាយផលិតផល និងព័ត៌មានក្រុមហ៊ុន (ផ្លាស់ប្តូររូបភាព ៣វិនាទីម្តងអូតូ)។' 
        : 'Official website design and development project for Loctroi Cambodia agricultural chemical company (Auto 3s image slideshow).',
      client: 'Loctroi Cambodia',
      year: '2025',
      tools: ['VS Code', 'Photoshop', 'CapCut'],
      demoUrl: 'https://loctroi.online/kh',
      likes: 320
    },
    {
      id: 2,
      title: lang === 'km' ? 'វេបសាយមើលរឿង SabayFlix' : 'SabayFlix Movie Website',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'បង្កើតវេបសាយ' : 'Web Dev',
      img: '/images/screenshot_281.webp',
      images: [
        '/images/screenshot_281.webp',
        '/images/screenshot_282.webp',
        '/images/screenshot_283.webp',
        '/images/screenshot_284.webp',
        '/images/screenshot_285.webp',
        '/images/screenshot_286.webp'
      ],
      gradient: 'from-red-600 via-rose-600 to-amber-600',
      description: lang === 'km' 
        ? 'គម្រោងអភិវឌ្ឍន៍វេបសាយកម្សាន្តមើលរឿង SabayFlix ដែលមាន UI/UX ទំនើប ស្រស់ស្អាត អាចទស្សនារឿងភាគ និងភាពយន្តចម្រុះបានយ៉ាងលឿន (ផ្លាស់ប្តូររូបភាព ៣វិនាទីម្តងអូតូ)។' 
        : 'SabayFlix movie streaming platform web application with modern responsive UI/UX and seamless video playback (Auto 3s image slideshow).',
      client: 'SabayFlix',
      year: '2025',
      tools: ['VS Code', 'React', 'Tailwind'],
      demoUrl: 'https://sabayflix-4.vercel.app/',
      likes: 412
    },
    {
      id: 3,
      title: lang === 'km' ? 'វេបសាយផ្ទាល់ខ្លួន Fong KH' : 'Fong KH Portfolio Website',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'បង្កើតវេបសាយ' : 'Web Dev',
      img: '/images/screenshot_287.webp',
      gradient: 'from-purple-600 via-indigo-600 to-pink-500',
      description: lang === 'km' 
        ? 'គម្រោងឌីហ្សាញ និងអភិវឌ្ឍន៍វេបសាយផ្ទាល់ខ្លួន Fong KH សម្រាប់បង្ហាញស្នាដៃកាត់តវីដេអូផ្សព្វផ្សាយថ្នាំកសិកម្ម ឌីហ្សាញ Poster និងព័ត៌មានទំនាក់ទំនង។' 
        : 'Personal portfolio web application showcasing agricultural promo video editing, graphic designs, and developer contact details.',
      client: 'Fong KH',
      year: '2025',
      tools: ['VS Code', 'React', 'Tailwind'],
      demoUrl: 'https://fongkh.vercel.app/',
      likes: 368
    },
    {
      id: 4,
      title: lang === 'km' ? 'វេបសាយកាត 3D MeCom' : '3D MeCom Digital Card Website',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'បង្កើតវេបសាយ' : 'Web Dev',
      img: '/images/screenshot_288.webp',
      gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
      description: lang === 'km' 
        ? 'គម្រោងឌីហ្សាញ និងអភិវឌ្ឍន៍វេបសាយកាត 3D MeCom សម្រាប់ផ្សព្វផ្សាយលើ Facebook & TikTok ដែលមាន Interaction បង្វិលកាត 3D យ៉ាងស្អាតទាក់ទាញ។' 
        : 'Interactive 3D MeCom Digital Card web application with full 3D card tilt and social media marketing integration.',
      client: 'MeCom Card',
      year: '2025',
      tools: ['VS Code', 'Three.js', 'Tailwind'],
      demoUrl: 'https://card-mecom.vercel.app/',
      likes: 295
    },
    {
      id: 5,
      title: lang === 'km' ? 'វេបសាយហាងលក់អាវ Kimchi Shop' : 'Kimchi Shop E-Commerce Website',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'បង្កើតវេបសាយ' : 'Web Dev',
      img: '/images/screenshot_289.webp',
      images: [
        '/images/screenshot_289.webp',
        '/images/screenshot_290.webp'
      ],
      gradient: 'from-pink-500 via-rose-500 to-amber-500',
      description: lang === 'km' 
        ? 'គម្រោងឌីហ្សាញ និងអភិវឌ្ឍន៍វេបសាយហាងលក់អាវសម្លៀកបំពាក់ Kimchi Shop សម្រាប់កម៉្មង់ទិញទំនិញ និងមើលម៉ូដសម្លៀកបំពាក់ទាន់សម័យ (ផ្លាស់ប្តូររូបភាព ៣វិនាទីម្តងអូតូ)។' 
        : 'Kimchi Shop fashion e-commerce web application designed for browsing stylish apparel and online ordering (Auto 3s image slideshow).',
      client: 'Kimchi Shop',
      year: '2025',
      tools: ['VS Code', 'React', 'Tailwind'],
      demoUrl: 'https://kimchi-shop-new.vercel.app/',
      likes: 380
    },
    {
      id: 6,
      title: lang === 'km' ? 'វេបសាយលក់អាវ Kimchi Com' : 'Kimchi Com Store Website',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'បង្កើតវេបសាយ' : 'Web Dev',
      img: '/images/screenshot_291.webp',
      images: [
        '/images/screenshot_291.webp',
        '/images/screenshot_292.webp',
        '/images/screenshot_293.webp'
      ],
      gradient: 'from-amber-400 via-orange-500 to-rose-600',
      description: lang === 'km' 
        ? 'គម្រោងឌីហ្សាញ និងអភិវឌ្ឍន៍វេបសាយហាងលក់អាវសម្លៀកបំពាក់ Kimchi Com សម្រាប់បង្ហាញផលិតផល និងព័ត៌មានលម្អិតពីសម្លៀកបំពាក់ (ផ្លាស់ប្តូររូបភាព ៣វិនាទីម្តងអូតូ)។' 
        : 'Kimchi Com apparel store web application showcasing fashion collections and detailed clothing specifications (Auto 3s image slideshow).',
      client: 'Kimchi Com',
      year: '2025',
      tools: ['VS Code', 'React', 'Tailwind'],
      demoUrl: 'https://kimchicom.vercel.app/',
      likes: 315
    },
    {
      id: 7,
      title: lang === 'km' ? 'វេបសាយកាត់តវីដេអូ iFong KH' : 'iFong KH Video Portfolio Website',
      category: 'comics',
      categoryLabel: lang === 'km' ? 'បង្កើតវេបសាយ' : 'Web Dev',
      img: '/images/screenshot_294.webp',
      images: [
        '/images/screenshot_294.webp',
        '/images/screenshot_295.webp',
        '/images/screenshot_296.webp'
      ],
      gradient: 'from-sky-500 via-indigo-600 to-purple-700',
      description: lang === 'km' 
        ? 'គម្រោងអភិវឌ្ឍន៍វេបសាយសម្រាប់ដាក់ និងចាក់ផ្សាយវីដេអូកាត់ត iFong KH ដែលមាន UI/UX ទំនើប និងអាចទស្សនាវីដេអូបានយ៉ាងលឿនរលូន (ផ្លាស់ប្តូររូបភាព ៣វិនាទីម្តងអូតូ)។' 
        : 'iFong KH Video Showcase web application with responsive media player layout and video stream portfolio (Auto 3s image slideshow).',
      client: 'iFong KH',
      year: '2025',
      tools: ['VS Code', 'CapCut', 'React'],
      demoUrl: 'https://ifongkhcom.vercel.app/',
      likes: 425
    }
  ];

  const filteredArtworks = activeTab === 'all' 
    ? artworks 
    : artworks.filter(a => a.category === activeTab);

  // 3-second auto-play slideshow for artwork grid cards
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideshowIndices(prev => {
        const next = { ...prev };
        artworks.forEach(art => {
          if (art.images && art.images.length > 1) {
            const current = prev[art.id] || 0;
            next[art.id] = (current + 1) % art.images.length;
          }
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 3-second auto-play slideshow for Lightbox Modal
  useEffect(() => {
    if (!selectedArtwork) return;
    setModalSlideIndex(0);
    if (selectedArtwork.images && selectedArtwork.images.length > 1) {
      const timer = setInterval(() => {
        setModalSlideIndex(prev => (prev + 1) % selectedArtwork.images.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [selectedArtwork]);

  const softwareList = [
    { name: "CapCut", percent: 91, color: "bg-[#000000]", text: "text-white", icon: "Cc" },
    { name: "Photoshop", percent: 84, color: "bg-[#001d38]", text: "text-[#31a8ff]", icon: "Ps" },
    { name: "DaVinci", percent: 50, color: "bg-[#1e1b4b]", text: "text-[#f43f5e]", icon: "Dv" },
    { name: "After Effects", percent: 48, color: "bg-[#000055]", text: "text-[#9999ff]", icon: "Ae" },
    { name: "VS Code", percent: 45, color: "bg-[#002244]", text: "text-[#007acc]", icon: "Vs" },
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
    navigator.clipboard.writeText("Profong085@gmail.com");
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

  const handleDownloadCV = () => {
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.3 } });
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert(lang === 'km' ? 'សូមអនុញ្ញាត Popup ក្នុង Browser ដើម្បីទាញយក CV ជា PDF' : 'Please allow popups to download CV PDF');
      return;
    }
    
    const cvHTML = `
      <!DOCTYPE html>
      <html lang="km">
      <head>
        <meta charset="UTF-8">
        <title>Chai_Fong_Official_Resume.pdf</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
          
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Kantumruy Pro', 'Plus Jakarta Sans', sans-serif;
            color: #1e293b;
            background: #ffffff;
            line-height: 1.6;
            padding: 24px;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          .cv-wrapper {
            max-width: 800px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            overflow: hidden;
          }

          /* MINIMAL HEADER */
          .cv-header {
            background: #0f172a;
            color: #ffffff;
            padding: 30px 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .header-left {
            flex: 1;
          }
          .name-main {
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 0.5px;
            line-height: 1.2;
          }
          .role-title {
            font-size: 12px;
            font-weight: 700;
            color: #94a3b8;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-top: 6px;
          }
          .contact-row {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 16px;
            font-size: 11px;
            color: #cbd5e1;
            font-weight: 500;
          }
          .contact-item {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .contact-item svg {
            width: 13px;
            height: 13px;
            stroke: #94a3b8;
          }

          .avatar-container {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #334155;
            flex-shrink: 0;
          }
          .avatar-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* STATS ROW */
          .stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            padding: 12px 20px;
            text-align: center;
          }
          .stat-box {
            border-right: 1px solid #e2e8f0;
          }
          .stat-box:last-child { border-right: none; }
          .stat-number {
            font-size: 16px;
            font-weight: 800;
            color: #0f172a;
          }
          .stat-text {
            font-size: 10px;
            font-weight: 600;
            color: #64748b;
          }

          /* MAIN BODY GRID */
          .cv-body {
            padding: 30px 36px;
            display: grid;
            grid-template-columns: 1fr 240px;
            gap: 28px;
          }

          .section-title {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 1.5px solid #0f172a;
            padding-bottom: 5px;
            margin-bottom: 12px;
          }
          .section-title svg {
            width: 15px;
            height: 15px;
            stroke: #0f172a;
          }

          .content-block {
            margin-bottom: 22px;
          }
          .content-block:last-child { margin-bottom: 0; }

          .body-text {
            font-size: 11.5px;
            color: #334155;
            line-height: 1.7;
            font-weight: 500;
          }

          .job-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 16px;
          }
          .job-title {
            font-size: 12.5px;
            font-weight: 800;
            color: #0f172a;
          }
          .job-company {
            font-size: 11px;
            font-weight: 700;
            color: #475569;
            margin-bottom: 8px;
          }
          .job-bullets {
            padding-left: 16px;
            font-size: 11px;
            color: #334155;
          }
          .job-bullets li {
            margin-bottom: 5px;
            line-height: 1.65;
          }

          /* SOFTWARE SKILLS BARS */
          .skill-row {
            margin-bottom: 11px;
          }
          .skill-row:last-child { margin-bottom: 0; }
          .skill-meta {
            display: flex;
            justify-content: space-between;
            font-size: 10.5px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 3px;
          }
          .skill-track {
            height: 6px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
          }
          .skill-fill {
            height: 100%;
            background: #0f172a;
            border-radius: 4px;
          }

          /* TAG CHIPS */
          .tags-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .tag-item {
            background: #f1f5f9;
            color: #0f172a;
            font-size: 10.5px;
            font-weight: 700;
            padding: 6px 12px;
            border-radius: 6px;
            border: 1px solid #cbd5e1;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .tag-item svg {
            width: 12px;
            height: 12px;
            stroke: #0f172a;
          }

          .footer-note {
            text-align: center;
            padding: 14px;
            font-size: 10px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
            font-weight: 600;
            background: #f8fafc;
          }
        </style>
      </head>
      <body>
        <div class="cv-wrapper">
          
          <!-- MINIMAL HEADER -->
          <div class="cv-header">
            <div class="header-left">
              <div class="name-main">ផូ ឆៃហ្វុង (PHO CHAIFONG)</div>
              <div class="role-title">Graphic Designer & Video Editor</div>
              
              <div class="contact-row">
                <div class="contact-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span>071 777 3554</span>
                </div>
                <div class="contact-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>Profong085@gmail.com</span>
                </div>
                <div class="contact-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                  <span>Telegram: @Phochaifong007</span>
                </div>
                <div class="contact-item">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                  <span>chaifong.website</span>
                </div>
              </div>
            </div>

            <div class="avatar-container">
              <img src="${window.location.origin}/images/Close-up_portrait_left_side_profile_202607300917.webp" alt="Chai Fong" />
            </div>
          </div>

          <!-- STATS ROW -->
          <div class="stats-row">
            <div class="stat-box">
              <div class="stat-number">50+</div>
              <div class="stat-text">គម្រោងបញ្ចប់</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">15+</div>
              <div class="stat-text">វីដេអូកាត់ត</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">99%</div>
              <div class="stat-text">ការពេញចិត្ត</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">5+ ឆ្នាំ</div>
              <div class="stat-text">បទពិសោធន៍</div>
            </div>
          </div>

          <!-- MAIN BODY GRID -->
          <div class="cv-body">
            
            <!-- LEFT COLUMN -->
            <div>
              <!-- ABOUT ME -->
              <div class="content-block">
                <div class="section-title">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <span>អំពីខ្ញុំ (About Me)</span>
                </div>
                <div class="body-text">
                  ខ្ញុំគឺជា Graphic Designer និងជា Video Editor ដែលមានបេះដូងស្រឡាញ់ការបង្កើតសាច់រឿង និងគំនិតច្នៃប្រឌិតប្លែកៗ។ ជំនាញចម្បងរបស់ខ្ញុំគឺការឌីហ្សាញ Poster និងរូបភាពផ្សេងៗដោយប្រើប្រាស់ Adobe Photoshop ព្រមទាំងការកាត់តវីដេអូយ៉ាងស្ទាត់ជំនាញជាមួយ CapCut និង DaVinci Resolve។ ក្រៅពីនេះ ខ្ញុំក៏មានមូលដ្ឋានគ្រឹះក្នុងការធ្វើ Motion Graphics (After Effects) និង Web Development (VS Code) ផងដែរ។
                </div>
              </div>

              <!-- WORK EXPERIENCE -->
              <div class="content-block">
                <div class="section-title">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>បទពិសោធន៍ការងារ (Work Experience)</span>
                </div>
                
                <div class="job-card">
                  <div class="job-title">Graphic Designer & Video Editor</div>
                  <div class="job-company">Loctroi Cambodia (ក្រុមហ៊ុនថ្នាំកសិកម្ម)</div>
                  <ul class="job-bullets">
                    <li>ទទួលបន្ទុកឌីហ្សាញ Poster, Banner ផ្សព្វផ្សាយផលិតផលថ្នាំកសិកម្ម និងក្រាហ្វិកលើ Social Media ដោយប្រើ Adobe Photoshop។</li>
                    <li>កាត់ត និងផលិតវីដេអូផ្សព្វផ្សាយផលិតផលកសិកម្មយ៉ាងស្ទាត់ជំនាញជាមួយ CapCut & DaVinci Resolve ព្រមទាំងបង្កើត Motion Graphics ជាមួយ After Effects ដើម្បីឱ្យវីដេអូមានភាពរស់រវើក ទាក់ទាញ និងមានគុណភាពខ្ពស់។</li>
                  </ul>
                </div>
              </div>

              <!-- EDUCATION -->
              <div class="content-block">
                <div class="section-title">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                  <span>ការសិក្សា (Education)</span>
                </div>
                
                <div class="job-card">
                  <div class="job-title">សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម (RUA)</div>
                  <div class="job-company">Royal University of Agriculture — Bachelor Degree</div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN -->
            <div>
              <!-- SOFTWARE SKILLS -->
              <div class="content-block">
                <div class="section-title">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>កម្មវិធីស្ទាត់ជំនាញ</span>
                </div>

                <div class="skill-row">
                  <div class="skill-meta"><span>CapCut</span><span>91%</span></div>
                  <div class="skill-track"><div class="skill-fill" style="width: 91%;"></div></div>
                </div>
                <div class="skill-row">
                  <div class="skill-meta"><span>Adobe Photoshop</span><span>88%</span></div>
                  <div class="skill-track"><div class="skill-fill" style="width: 88%;"></div></div>
                </div>
                <div class="skill-row">
                  <div class="skill-meta"><span>DaVinci Resolve</span><span>75%</span></div>
                  <div class="skill-track"><div class="skill-fill" style="width: 75%;"></div></div>
                </div>
                <div class="skill-row">
                  <div class="skill-meta"><span>After Effects</span><span>48%</span></div>
                  <div class="skill-track"><div class="skill-fill" style="width: 48%;"></div></div>
                </div>
                <div class="skill-row">
                  <div class="skill-meta"><span>VS Code (Web Dev)</span><span>45%</span></div>
                  <div class="skill-track"><div class="skill-fill" style="width: 45%;"></div></div>
                </div>
                <div class="skill-row">
                  <div class="skill-meta"><span>Adobe Illustrator</span><span>38%</span></div>
                  <div class="skill-track"><div class="skill-fill" style="width: 38%;"></div></div>
                </div>
              </div>

              <!-- CORE COMPETENCIES -->
              <div class="content-block">
                <div class="section-title">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                  <span>ជំនាញស្ទាត់ជំនាញ</span>
                </div>

                <div class="tags-container">
                  <div class="tag-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span>Poster & Graphics (Photoshop)</span>
                  </div>
                  <div class="tag-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span>Video Editing (CapCut & DaVinci)</span>
                  </div>
                  <div class="tag-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span>Motion Graphics (After Effects)</span>
                  </div>
                  <div class="tag-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span>Web Development (VS Code)</span>
                  </div>
                </div>

                <!-- 6 SOFTWARE LOGOS GRID UNDER CORE COMPETENCIES (NO CUTOFF / CLEAN 2-COLUMN LAYOUT) -->
                <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed #cbd5e1;">
                  <div style="font-size: 10.5px; font-weight: 700; color: #475569; margin-bottom: 8px;">LOGOS កម្មវិធីប្រើប្រាស់៖</div>
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 7px;">
                    <!-- CapCut -->
                    <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 10.5px; font-weight: 700; color: #0f172a;">
                      <div style="width: 24px; height: 24px; min-width: 24px; border-radius: 5px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #000000; flex-shrink: 0;">
                        <img src="${window.location.origin}/images/image.png" style="width: 100%; height: 100%; object-fit: contain; padding: 1px;" alt="CapCut" />
                      </div>
                      <span style="white-space: nowrap;">CapCut</span>
                    </div>

                    <!-- Photoshop -->
                    <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 10.5px; font-weight: 700; color: #0f172a;">
                      <div style="width: 24px; height: 24px; min-width: 24px; border-radius: 5px; overflow: hidden; flex-shrink: 0;">
                        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;"><rect width="100" height="100" rx="18" fill="#001E36"/><text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="54" fill="#31A8FF">Ps</text></svg>
                      </div>
                      <span style="white-space: nowrap;">Photoshop</span>
                    </div>

                    <!-- DaVinci Resolve -->
                    <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 10.5px; font-weight: 700; color: #0f172a;">
                      <div style="width: 24px; height: 24px; min-width: 24px; border-radius: 5px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #12131A; flex-shrink: 0;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png" style="width: 100%; height: 100%; object-fit: contain; padding: 1px;" alt="DaVinci" />
                      </div>
                      <span style="white-space: nowrap;">DaVinci</span>
                    </div>

                    <!-- After Effects -->
                    <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 10.5px; font-weight: 700; color: #0f172a;">
                      <div style="width: 24px; height: 24px; min-width: 24px; border-radius: 5px; overflow: hidden; flex-shrink: 0;">
                        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;"><rect width="100" height="100" rx="18" fill="#1A0033"/><text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="54" fill="#CF9BFF">Ae</text></svg>
                      </div>
                      <span style="white-space: nowrap;">After Effects</span>
                    </div>

                    <!-- VS Code -->
                    <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 10.5px; font-weight: 700; color: #0f172a;">
                      <div style="width: 24px; height: 24px; min-width: 24px; border-radius: 5px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #001c38; flex-shrink: 0;">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" style="width: 100%; height: 100%; object-fit: contain; padding: 2px;" alt="VS Code" />
                      </div>
                      <span style="white-space: nowrap;">VS Code</span>
                    </div>

                    <!-- Illustrator -->
                    <div style="display: flex; align-items: center; gap: 8px; background: #f8fafc; padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 10.5px; font-weight: 700; color: #0f172a;">
                      <div style="width: 24px; height: 24px; min-width: 24px; border-radius: 5px; overflow: hidden; flex-shrink: 0;">
                        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;"><rect width="100" height="100" rx="18" fill="#261300"/><text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="54" fill="#FF9A00">Ai</text></svg>
                      </div>
                      <span style="white-space: nowrap;">Illustrator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- FOOTER -->
          <div class="footer-note">
            © 2025 Chai Fong Studio | Official Resume generated from https://chaifong.website
          </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    // 1. Direct auto-download HTML/PDF file to user's downloads folder
    const blob = new Blob([cvHTML], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'Chai_Fong_CV_Official.html';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

    // 2. Write to print window to automatically popup "Save as PDF" dialog
    printWindow.document.write(cvHTML);
    printWindow.document.close();
  };

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {/* INITIAL LOADING SPLASH SCREEN (1% - 100%) - CLEAN MINIMALIST MONOCHROME STYLE */}
      {!isLoaded && (
        <div 
          className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col justify-center items-center p-4 select-none overflow-hidden transition-all duration-700 ease-out ${
            fadeOutLoader ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Subtle Dim Ambient Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80 pointer-events-none" />

          {/* Clean Minimalist Glass Card Container */}
          <div className="w-full max-w-[350px] sm:max-w-[380px] bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-8 flex flex-col items-center text-center relative z-10">
            
            {/* Circular SVG Progress Ring around Avatar */}
            <div className="relative mb-5 flex items-center justify-center">
              <svg className="w-36 h-36 sm:w-38 sm:h-38 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Ring Track */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r="52" 
                  stroke="#1e293b" 
                  strokeWidth="5" 
                  fill="transparent" 
                />
                {/* Glowing Crisp Active Progress Ring */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r="52" 
                  stroke="#ffffff" 
                  strokeWidth="5.5" 
                  strokeLinecap="round" 
                  fill="transparent" 
                  strokeDasharray="326.7" 
                  strokeDashoffset={326.7 - (326.7 * loadingProgress) / 100}
                  className="transition-all duration-100 ease-out"
                />
              </svg>

              {/* Profile Avatar Centered in Ring */}
              <div className="absolute w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden border-2 border-slate-700 shadow-xl p-0.5 bg-slate-900">
                <img 
                  src="/images/Close-up_portrait_left_side_profile_202607300917.webp" 
                  alt="Chai Fong Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Floating Percentage Badge on Ring */}
              <div className="absolute -bottom-2 px-3.5 py-0.5 rounded-full bg-white text-slate-950 text-xs font-black font-display shadow-lg border border-white tracking-wider">
                {loadingProgress}%
              </div>
            </div>

            {/* Author Title & Subtitle */}
            <div className="flex flex-col items-center">
              <h1 className="font-koulen text-3xl sm:text-4xl tracking-wider text-white font-extrabold leading-snug py-1">
                {lang === 'km' ? 'ផូ ឆៃហ្វុង' : 'PHO CHAIFONG'}
              </h1>
              <div className="mt-1 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80">
                <span className="text-[10px] sm:text-[10.5px] font-outfit font-extrabold tracking-[0.2em] text-slate-300 uppercase">
                  GRAPHIC DESIGNER & VIDEO EDITOR
                </span>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full mt-6">
              <div className="w-full h-2.5 bg-slate-800 rounded-full p-0.5 border border-slate-700/60 shadow-inner overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="mt-3 text-[11.5px] font-medium text-slate-400 tracking-wide">
                {loadingProgress < 40 
                  ? (lang === 'km' ? 'កំពុងរៀបចំទិន្នន័យ...' : 'Loading assets...') 
                  : loadingProgress < 85 
                  ? (lang === 'km' ? 'កំពុងផ្ទុករូបភាព...' : 'Preparing graphics...') 
                  : (lang === 'km' ? 'រួចរាល់ហើយ!' : 'Welcome!')}
              </p>
            </div>

          </div>
        </div>
      )}

      <div className="w-full max-w-full sm:max-w-[440px] mx-auto flex justify-center pb-0 sm:pb-10 overflow-hidden relative">
        <div className="w-full max-w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sm:rounded-[36px] sm:shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300 sm:border sm:border-white/80 dark:sm:border-slate-800/80 z-10 text-slate-900 dark:text-slate-100">

        {/* FLOAT BAR: THEME TOGGLE, LANGUAGE TOGGLE & CV DOWNLOAD */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass-pill text-[10px] sm:text-xs font-bold text-brand-navy dark:text-slate-200 hover:text-brand-pink shadow-lg transition-all duration-200 border border-white/90 dark:border-slate-700/80 cursor-pointer active:scale-95 glass-shine"
            title={darkMode ? (lang === 'km' ? 'ប្តូរទៅ Light Mode' : 'Switch to Light Mode') : (lang === 'km' ? 'ប្តូរទៅ Dark Mode' : 'Switch to Dark Mode')}
          >
            {darkMode ? (
              <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600 shrink-0" />
            )}
            <span>{darkMode ? (lang === 'km' ? 'ភ្លឺ' : 'Light') : (lang === 'km' ? 'ងងឹត' : 'Dark')}</span>
          </button>
          <button 
            onClick={handleDownloadCV}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full glass-pill text-[10px] sm:text-xs font-bold text-brand-navy dark:text-slate-200 hover:text-brand-pink shadow-lg transition-all duration-200 border border-white/90 dark:border-slate-700/80 cursor-pointer active:scale-95 glass-shine"
            title="Download CV PDF"
          >
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink shrink-0" />
            <span>CV PDF</span>
          </button>
          <button 
            onClick={() => setLang(l => l === 'km' ? 'en' : 'km')}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full glass-pill text-[10px] sm:text-xs font-bold text-brand-navy dark:text-slate-200 hover:text-brand-pink shadow-lg transition-all duration-200 border border-white/90 dark:border-slate-700/80 cursor-pointer active:scale-95 glass-shine"
          >
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink shrink-0" />
            <span>{t.toggleLang}</span>
          </button>
        </div>

        {/* HERO SECTION WITH FULL UNCROPPED NATURAL DIMENSIONS */}
        <section className="relative w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[32px] bg-[#e2f0f9]">
          <img 
            src="/images/Liquid-mercury_skin_finish_radiates_hyper-tactile_202607301018.webp" 
            alt="Chai Fong Portfolio Hero"
            loading="eager"
            fetchPriority="high"
            className="w-full h-auto block hover:scale-105 transition-transform duration-700"
          />
          
          {/* Ultra-Small Black & White Glass Badge (No Icon) */}
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-4 z-20 bg-slate-950/90 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-800 shadow-md text-[8px] sm:text-[9.5px] font-semibold text-white tracking-tight">
            <span>{lang === 'km' ? 'ស្នាដៃ Graphic Design & Video Edit ២០២៦' : 'Design & Video Portfolio 2026'}</span>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="px-4 py-5 sm:p-7 sm:pb-5 bg-gradient-to-b from-white/95 to-slate-50/50 dark:from-slate-900/95 dark:to-slate-950/80 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="font-cursive text-xl sm:text-2xl font-bold text-gray-500 dark:text-slate-400 italic">
              {t.aboutTitle}
            </h2>
            
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 glass-shine ${
                liked ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white scale-105 shadow-rose-200' : 'glass-pill text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-white text-white animate-pulse' : 'fill-rose-500 text-rose-500'}`} />
              <span>{likesCount}</span>
            </button>
          </div>

          <div className="flex flex-row items-start justify-between gap-3">
            {/* Left Info */}
            <div className="flex-1 min-w-0">
              <div className="relative mb-2 sm:mb-3">
                <h1 className="font-koulen text-[28px] sm:text-[36px] leading-snug text-brand-navy dark:text-sky-400 tracking-wider py-1 animate-shimmer-text">
                  {lang === 'km' ? (
                    <>ផូ ឆៃហ្វុង</>
                  ) : (
                    <>PHO CHAIFONG</>
                  )}
                </h1>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-slate-400 mt-1 font-medium">
                  {t.aka}
                </p>

                {/* SVG Curved Arrow */}
                <svg className="absolute -top-1 -right-[35px] sm:-right-[52px] w-[45px] sm:w-[55px] h-[35px] sm:h-[40px] pointer-events-none hidden sm:block" viewBox="0 0 100 60" fill="none">
                  <path d="M10 45 Q 50 5 90 25" stroke="currentColor" className="text-brand-navy dark:text-sky-400" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M80 15 L 92 26 L 78 32" stroke="currentColor" className="text-brand-navy dark:text-sky-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="mt-3 sm:mt-4 text-[11px] sm:text-[11.5px] leading-relaxed text-gray-700 dark:text-slate-300 glass-card p-3 sm:p-4 rounded-2xl">
                <span className="font-bold text-sm sm:text-base mr-1 text-brand-navy dark:text-sky-300">{t.greeting}</span>
                <span className="font-normal whitespace-pre-line">{t.bio}</span>
              </div>
            </div>

            {/* Right Profile Avatar with Interactive Hearts */}
            <div className="flex flex-col items-center shrink-0 w-[110px] sm:w-[135px]">
              <div 
                onClick={triggerHearts}
                className="w-[105px] h-[105px] sm:w-[135px] sm:h-[135px] rounded-full overflow-hidden relative shadow-xl mb-3 cursor-pointer hover:scale-105 transition-all duration-300 group border-4 border-white ring-4 ring-rose-200/80 bg-white glass-shine animate-float-slow"
                title={t.interactiveHint}
              >
                <img 
                  src="/images/Close-up_portrait_left_side_profile_202607300917.webp" 
                  alt="Chai Fong Profile" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
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
                <a href="tel:0717773554" className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-slate-200 hover:text-brand-pink transition-colors glass-pill px-2.5 py-1 rounded-xl">
                  <Phone className="w-3.5 h-3.5 text-brand-navy dark:text-sky-400 shrink-0" />
                  <span className="truncate">071 777 3554</span>
                </a>
                <a href="https://web.facebook.com/Phochaifong007/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-slate-200 hover:text-brand-pink transition-colors glass-pill px-2.5 py-1 rounded-xl">
                  <Compass className="w-3.5 h-3.5 text-brand-navy dark:text-sky-400 shrink-0" />
                  <span className="truncate">Phochaifong007</span>
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-slate-200 hover:text-brand-pink transition-colors text-left group glass-pill px-2.5 py-1 rounded-xl cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-navy dark:text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{copied ? t.copiedEmail : 'Profong085@...'}</span>
                </button>
                <button 
                  onClick={() => setShowCodeModal(true)}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-slate-200 hover:text-brand-pink transition-colors text-left group glass-pill px-2.5 py-1 rounded-xl cursor-pointer"
                  title={t.viewCode}
                >
                  <Code className="w-3.5 h-3.5 text-brand-navy dark:text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{t.viewCode}</span>
                </button>
              </div>
            </div>
          </div>

          {/* QUICK STATS HIGHLIGHT ROW WITH GLASS CARDS */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 mt-5 pt-4 border-t border-gray-100 dark:border-slate-800 text-center">
            <div className="p-2 rounded-2xl glass-card hover:scale-105 transition-transform duration-300">
              <div className="text-sm sm:text-base font-black text-brand-navy dark:text-sky-400">50+</div>
              <div className="text-[9px] sm:text-[9.5px] font-bold text-gray-500 dark:text-slate-400 leading-tight mt-0.5">{t.stats.projects}</div>
            </div>
            <div className="p-2 rounded-2xl glass-card hover:scale-105 transition-transform duration-300">
              <div className="text-sm sm:text-base font-black text-brand-pink">15+</div>
              <div className="text-[9px] sm:text-[9.5px] font-bold text-gray-500 dark:text-slate-400 leading-tight mt-0.5">{t.stats.books}</div>
            </div>
            <div className="p-2 rounded-2xl glass-card hover:scale-105 transition-transform duration-300">
              <div className="text-sm sm:text-base font-black text-brand-cyan">99%</div>
              <div className="text-[9px] sm:text-[9.5px] font-bold text-gray-500 dark:text-slate-400 leading-tight mt-0.5">{t.stats.satisfaction}</div>
            </div>
            <div className="p-2 rounded-2xl glass-card hover:scale-105 transition-transform duration-300">
              <div className="text-sm sm:text-base font-black text-amber-500">5+</div>
              <div className="text-[9px] sm:text-[9.5px] font-bold text-gray-500 dark:text-slate-400 leading-tight mt-0.5">{t.stats.experience}</div>
            </div>
          </div>
        </section>

        {/* EDUCATION & SKILLS SECTION WITH GLASS CARDS (ALWAYS 2 COLUMNS ON MOBILE & DESKTOP) */}
        <section className="px-3 sm:px-7 py-4 sm:py-5 bg-slate-50/40 dark:bg-slate-950/60">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            
            {/* Education */}
            <div className="relative glass-card p-3 sm:p-4 rounded-2xl">
              <div className="relative flex items-center mb-1.5 sm:mb-2">
                <h3 className="font-display text-base sm:text-xl font-extrabold text-brand-navy dark:text-sky-300 tracking-tight flex items-center gap-1 sm:gap-1.5">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink shrink-0" />
                  <span>{t.eduTitle}</span>
                </h3>
              </div>
              <p className="text-[10.5px] sm:text-[11.5px] leading-relaxed text-gray-600 dark:text-slate-300 font-normal whitespace-pre-line">
                {t.eduDesc}
              </p>
            </div>

            {/* Skills */}
            <div className="glass-card p-3 sm:p-4 rounded-2xl">
              <div className="flex items-center mb-1.5 sm:mb-2">
                <h3 className="font-display text-base sm:text-xl font-extrabold text-brand-navy dark:text-sky-300 tracking-tight flex items-center gap-1 sm:gap-1.5">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink shrink-0" />
                  <span>{t.skillsTitle}</span>
                </h3>
              </div>
              <ul className="list-disc pl-3.5 sm:pl-4 space-y-1">
                {t.skills.map((skill, i) => (
                  <li key={i} className="text-[10.5px] sm:text-[11.5px] text-gray-700 dark:text-slate-200 font-semibold leading-relaxed">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* SOFTWARES SECTION WITH GLASS STYLING */}
        <section className="px-5 sm:px-7 py-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-gray-100 dark:border-slate-800">
          <h3 className="font-display text-xl font-extrabold text-brand-navy dark:text-sky-400 tracking-tight mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-pink" />
            <span>{t.softwaresTitle}</span>
          </h3>

          <div className="flex gap-4 sm:gap-5 items-start">
            {/* Icons Grid */}
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2">
                {/* CapCut */}
                <div 
                  onMouseEnter={() => setActiveSoftware(0)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-2xl bg-black border border-gray-700 p-1 flex items-center justify-center shadow-lg hover:scale-115 transition-all duration-300 cursor-pointer overflow-hidden relative glass-shine"
                  title="CapCut (91%)"
                >
                  <img 
                    src="/images/image.png" 
                    alt="CapCut"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                
                {/* Photoshop */}
                <div 
                  onMouseEnter={() => setActiveSoftware(1)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-2xl bg-[#001e36] border-2 border-[#31a8ff] flex items-center justify-center shadow-lg hover:scale-115 transition-all duration-300 cursor-pointer overflow-hidden relative glass-shine"
                  title="Photoshop (84%)"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" rx="18" fill="#001E36" />
                    <text x="50%" y="54%" dominantBaseline="central" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="54" fill="#31A8FF" letterSpacing="-3">Ps</text>
                  </svg>
                </div>

                {/* DaVinci Resolve */}
                <div 
                  onMouseEnter={() => setActiveSoftware(2)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-2xl bg-[#12131A] border border-gray-700 p-1 flex items-center justify-center shadow-lg hover:scale-115 transition-all duration-300 cursor-pointer overflow-hidden glass-shine"
                  title="DaVinci Resolve (50%)"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png" 
                    alt="DaVinci Resolve"
                    className="w-full h-full object-contain"
                    onError={(e) => { 
                      e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio_18_icon.png"; 
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                {/* After Effects */}
                <div 
                  onMouseEnter={() => setActiveSoftware(3)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-2xl bg-[#1a0033] border-2 border-[#cf9bff] flex items-center justify-center shadow-lg hover:scale-115 transition-all duration-300 cursor-pointer overflow-hidden relative glass-shine"
                  title="After Effects (48%)"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" rx="18" fill="#1A0033" />
                    <text x="50%" y="54%" dominantBaseline="central" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="54" fill="#CF9BFF" letterSpacing="-3">Ae</text>
                  </svg>
                </div>

                {/* VS Code */}
                <div 
                  onMouseEnter={() => setActiveSoftware(4)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-2xl bg-[#001c38] border border-blue-900/60 p-2 flex items-center justify-center shadow-lg hover:scale-115 transition-all duration-300 cursor-pointer overflow-hidden glass-shine"
                  title="VS Code (45%)"
                >
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" 
                    alt="VS Code"
                    className="w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>

                {/* Illustrator */}
                <div 
                  onMouseEnter={() => setActiveSoftware(5)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-2xl bg-[#261300] border-2 border-[#ff9a00] flex items-center justify-center shadow-lg hover:scale-115 transition-all duration-300 cursor-pointer overflow-hidden relative glass-shine"
                  title="Illustrator (38%)"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" rx="18" fill="#261300" />
                    <text x="50%" y="54%" dominantBaseline="central" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="54" fill="#FF9A00" letterSpacing="-3">Ai</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Software Bars */}
            <div className="flex-1 flex flex-col gap-3 pt-0.5">
              {softwareList.map((sw, index) => {
                const isHovered = activeSoftware === index;
                return (
                  <div key={index} className="flex flex-col gap-1 group">
                    <div className="flex justify-between items-center text-[11px] font-bold text-brand-navy dark:text-slate-200">
                      <span className={isHovered ? 'text-brand-pink transition-colors' : ''}>{sw.name}</span>
                      <span className="text-[10px] text-gray-500 dark:text-slate-400 font-extrabold">{sw.percent}%</span>
                    </div>
                    <div className="w-full h-[8px] bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden border border-gray-200/50 dark:border-slate-700/50 shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          sw.name === 'CapCut' ? 'bg-gradient-to-r from-gray-800 to-black dark:from-slate-400 dark:to-slate-200' :
                          sw.name === 'Photoshop' ? 'bg-gradient-to-r from-blue-600 to-sky-400' :
                          sw.name === 'DaVinci' ? 'bg-gradient-to-r from-rose-600 to-pink-500' :
                          sw.name === 'After Effects' ? 'bg-gradient-to-r from-purple-600 to-indigo-400' :
                          sw.name === 'VS Code' ? 'bg-gradient-to-r from-sky-600 to-blue-400' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                        } ${isHovered ? 'brightness-125 shadow-md scale-y-110' : ''}`} 
                        style={{ width: `${sw.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PORTFOLIO SHOWCASE GALLERY WITH GLASS CARDS & VIBRANT HOVER */}
        <section className="px-5 sm:px-7 py-6 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/50 dark:to-slate-900">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display text-xl font-extrabold text-brand-navy dark:text-sky-400 tracking-tight flex items-center gap-2">
                <Palette className="w-5 h-5 text-brand-pink" />
                <span>{t.galleryTitle}</span>
              </h3>
              <p className="text-[10.5px] text-gray-500 dark:text-slate-400 mt-0.5">{t.gallerySubtitle}</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 my-2 no-scrollbar">
            {Object.keys(t.categories).map((catKey) => {
              const isActive = activeTab === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveTab(catKey)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-navy via-indigo-950 to-brand-pink text-white shadow-lg scale-105 border border-white/40' 
                      : 'glass-pill text-gray-700 dark:text-slate-200 hover:text-brand-pink dark:hover:text-pink-400'
                  }`}
                >
                  {t.categories[catKey]}
                </button>
              );
            })}
          </div>

          {/* Artwork Cards Grid */}
          <div className="grid grid-cols-2 gap-3.5 mt-3">
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArtwork(art)}
                className="group relative rounded-2xl overflow-hidden glass-card glass-shine cursor-pointer"
              >
                {/* Visual Artwork Box */}
                <div className={`w-full h-[130px] relative overflow-hidden bg-gradient-to-br ${art.gradient}`}>
                  <img 
                    src={art.images ? art.images[slideshowIndices[art.id] || 0] : art.img} 
                    alt={art.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md glass-pill text-[9px] font-extrabold text-brand-navy dark:text-slate-100 uppercase tracking-wider shadow-sm">
                    {art.categoryLabel}
                  </span>

                  {/* Multi-Image Auto Badge */}
                  {art.images && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-[9px] font-bold text-white flex items-center gap-1 shadow-md">
                      <span>{(slideshowIndices[art.id] || 0) + 1}/{art.images.length} (3s)</span>
                    </span>
                  )}

                  {/* Quick View Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3.5 py-1.5 rounded-full glass-effect text-brand-navy dark:text-slate-100 text-xs font-black shadow-xl flex items-center gap-1 scale-90 group-hover:scale-100 transition-transform duration-300 border border-white/90 dark:border-slate-700">
                      <Eye className="w-3.5 h-3.5 text-brand-pink" />
                      <span>{lang === 'km' ? 'មើល' : 'View'}</span>
                    </span>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-3">
                  <h4 className="font-extrabold text-[12px] text-brand-navy dark:text-slate-100 truncate leading-snug group-hover:text-brand-pink transition-colors">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500 dark:text-slate-400 font-semibold">
                    <span>{art.year} • {art.client}</span>
                    <span className="flex items-center gap-0.5 text-rose-500 font-black">
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
        <section className="px-5 py-4 bg-slate-50 dark:bg-slate-950/80 border-t border-gray-100 dark:border-slate-800 text-center">
          <h4 className="font-display font-bold text-xs text-gray-500 dark:text-slate-400 mb-2.5">
            {lang === 'km' ? 'ទំនាក់ទំនង (Contact)' : 'Contact'}
          </h4>

          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {/* Facebook */}
            <a 
              href="https://web.facebook.com/Phochaifong007/" 
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
              href="https://www.tiktok.com/@ifong168" 
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
              href="https://t.me/Phochaifong" 
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

          {/* APP DOWNLOAD LINKS (APK & IPA REAL DOWNLOADS) */}
          <div className="mt-3.5 pt-3 border-t border-gray-200/80">
            <h5 className="font-display font-extrabold text-[11px] text-brand-navy mb-2 flex items-center justify-center gap-1.5 uppercase tracking-wider">
              <Download className="w-3.5 h-3.5 text-brand-pink" />
              <span>{lang === 'km' ? 'ទាញយកកម្មវិធីទូរស័ព្ទ (Official App Download)' : 'Download Official Mobile App'}</span>
            </h5>
            
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {/* Android APK Download */}
              <a 
                href="/downloads/ChaiFong_Official_App.apk" 
                download="ChaiFong_Official_App.apk"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-emerald-500/50"
                title="Download Android APK App"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.552 0 .9997.4482.9997.9993.0004.5511-.4477.9997-.9997.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.552 0 .9997.4482.9997.9993 0 .5511-.4477.9997-.9997.9997zm11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1522-.5676.416.416 0 0 0-.5676.1522l-2.0223 3.503C15.59 8.246 13.855 7.828 12 7.828s-3.59.418-5.1367 1.1218L4.841 5.4468a.416.416 0 0 0-.5676-.1522.416.416 0 0 0-.1522.5676l1.9973 3.4592C2.688 11.233.438 14.542.046 18.5h23.908c-.392-3.958-2.642-7.267-6.074-9.1786z"/>
                </svg>
                <span>{lang === 'km' ? 'ទាញយក APK (Android)' : 'Download APK (Android)'}</span>
              </a>

              {/* iOS IPA Download */}
              <a 
                href="/downloads/ChaiFong_Official_App.ipa" 
                download="ChaiFong_Official_App.ipa"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-extrabold shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-slate-700"
                title="Download iOS IPA App"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.97.99-3.12-1 .04-2.22.67-2.93 1.5-.64.74-1.2 1.93-1.05 3.06 1.12.09 2.27-.58 2.99-1.44z"/>
                </svg>
                <span>{lang === 'km' ? 'ទាញយក IPA (iOS)' : 'Download IPA (iOS)'}</span>
              </a>
            </div>
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

            {/* Artwork Image Banner with 3s Slideshow */}
            <div className={`w-full h-[240px] relative overflow-hidden bg-gradient-to-br ${selectedArtwork.gradient}`}>
              <img 
                src={selectedArtwork.images ? selectedArtwork.images[modalSlideIndex] : selectedArtwork.img} 
                alt={selectedArtwork.title}
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Prev / Next & Slideshow controls for multi-image artworks */}
              {selectedArtwork.images && selectedArtwork.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalSlideIndex(prev => (prev - 1 + selectedArtwork.images.length) % selectedArtwork.images.length);
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-95 z-10 shadow-lg"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalSlideIndex(prev => (prev + 1) % selectedArtwork.images.length);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm transition-transform active:scale-95 z-10 shadow-lg"
                    title="Next Image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Slide dots indicator */}
                  <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5 z-10 px-4">
                    {selectedArtwork.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalSlideIndex(idx);
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === modalSlideIndex ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Auto Badge */}
                  <div className="absolute top-3 left-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-md z-10">
                    <span>{modalSlideIndex + 1} / {selectedArtwork.images.length} (Auto 3s)</span>
                  </div>
                </>
              )}

              <div className="absolute bottom-3 left-4 right-4 text-white z-10">
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
                  href={selectedArtwork.demoUrl || "https://loctroi.online/kh"}
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

      {/* SOURCE CODE VIEWER MODAL - MOBILE OPTIMIZED */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#181825] border border-slate-700/80 rounded-2xl w-[96vw] sm:w-full max-w-5xl h-[92vh] sm:h-[88vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
            {/* Header bar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#11111b] border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="hidden sm:flex items-center gap-1.5 mr-1 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
                </div>
                <Code className="w-4 h-4 text-brand-pink shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-200 font-mono truncate">
                  {lang === 'km' ? 'កូដវេបសាយទាំងមូល' : 'Source Code Viewer'}
                </span>
              </div>

              {/* Mobile controls & Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Text Zoom Controls */}
                <div className="flex items-center bg-slate-800/90 rounded-xl p-0.5 border border-slate-700">
                  <button
                    onClick={zoomOutCode}
                    title="ពង្រួមអក្សរ"
                    className="p-1 sm:px-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">-</span>
                  </button>
                  <span className="text-[11px] font-mono font-bold text-brand-pink px-1 sm:px-1.5 min-w-[28px] text-center">
                    {codeFontSize}px
                  </span>
                  <button
                    onClick={zoomInCode}
                    title="ពង្រីកអក្សរ"
                    className="p-1 sm:px-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-[11px]">+</span>
                  </button>
                </div>

                {/* Line Wrap Toggle for Mobile */}
                <button
                  onClick={() => setWrapLines(!wrapLines)}
                  className={`px-2 sm:px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all border cursor-pointer hidden sm:flex items-center gap-1 ${
                    wrapLines 
                      ? 'bg-brand-pink/20 text-brand-pink border-brand-pink/50' 
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                  title="បត់បន្ទាត់កូដកុំឲ្យហៀរចេញ"
                >
                  <span>{wrapLines ? 'Wrap: On' : 'Wrap: Off'}</span>
                </button>

                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                  <span className="hidden sm:inline">{copiedCode ? (lang === 'km' ? 'បានចម្លង!' : 'Copied!') : (lang === 'km' ? 'ចម្លង' : 'Copy')}</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* File Switcher Tabs */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1e1e2e] border-b border-slate-800 overflow-x-auto no-scrollbar shrink-0">
              {Object.keys(codeFiles).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setActiveCodeFile(fileName)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    activeCodeFile === fileName
                      ? 'bg-[#313244] text-brand-pink border border-slate-600 shadow-sm scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>{fileName}</span>
                </button>
              ))}
            </div>

            {/* Code Display Area with Line Numbers & Adjustable Font Size */}
            <div className="flex-1 overflow-auto bg-[#11111b] font-mono text-slate-200 flex">
              {/* Line numbers column */}
              <div 
                className="py-2.5 px-1.5 sm:px-2 bg-[#181825]/60 text-slate-500 select-none text-right border-r border-slate-800/80 font-mono shrink-0"
                style={{ fontSize: `${Math.max(codeFontSize - 1, 7)}px`, lineHeight: 1.45 }}
              >
                {(codeFiles[activeCodeFile] || '').split('\n').map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
              {/* Actual Code content */}
              <div className="flex-1 p-2 sm:p-3 overflow-x-auto">
                <pre 
                  className={wrapLines ? "whitespace-pre-wrap break-words" : "whitespace-pre"}
                  style={{ fontSize: `${codeFontSize}px`, lineHeight: 1.45 }}
                >
                  <code>{codeFiles[activeCodeFile]}</code>
                </pre>
              </div>
            </div>

            {/* Mobile-Friendly Footer bar */}
            <div className="px-3 sm:px-4 py-2 bg-[#11111b] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
              <span className="font-mono text-brand-pink font-semibold truncate">
                📄 {activeCodeFile} ({ (codeFiles[activeCodeFile] || '').split('\n').length } lines)
              </span>
              <button 
                onClick={() => setWrapLines(!wrapLines)}
                className="text-[10.5px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                {wrapLines ? 'Unwrap Lines' : 'Wrap Lines'}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

