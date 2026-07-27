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
  Phone
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('km'); // 'km' or 'en'
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
        <title>Chai_Fong_CV_2025.pdf</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');
          * { box-sizing: border-box; }
          body {
            font-family: 'Kantumruy Pro', 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 35px;
            color: #1e1b4b;
            background: #ffffff;
            line-height: 1.6;
          }
          .cv-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #e85d75;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .name {
            font-size: 28px;
            font-weight: 800;
            color: #1e1b4b;
            margin: 0;
          }
          .subtitle {
            font-size: 14px;
            font-weight: 700;
            color: #e85d75;
            margin-top: 4px;
          }
          .contact-list {
            font-size: 12px;
            color: #4b5563;
            margin-top: 8px;
            line-height: 1.7;
          }
          .profile-img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #e85d75;
            box-shadow: 0 4px 12px rgba(232, 93, 117, 0.2);
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            background: #fdf2f4;
            border: 1px solid #fecdd3;
            border-radius: 12px;
            padding: 14px;
            margin-bottom: 22px;
            text-align: center;
          }
          .stat-num { font-size: 18px; font-weight: 900; color: #1e1b4b; }
          .stat-desc { font-size: 11px; font-weight: 700; color: #e85d75; }
          .section { margin-bottom: 22px; }
          .sec-title {
            font-size: 15px;
            font-weight: 800;
            color: #1e1b4b;
            border-bottom: 2px solid #f3f4f6;
            padding-bottom: 6px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .bio-text {
            font-size: 12.5px;
            color: #374151;
            white-space: pre-line;
            background: #fafafa;
            padding: 12px 16px;
            border-radius: 10px;
            border-left: 4px solid #e85d75;
          }
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 10px;
          }
          .skill-card {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 10px 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
          }
          .skill-head {
            display: flex;
            justify-content: space-between;
            font-size: 12.5px;
            font-weight: 800;
            color: #1e1b4b;
            margin-bottom: 6px;
          }
          .skill-bar-bg {
            background: #e5e7eb;
            height: 9px;
            border-radius: 5px;
            overflow: hidden;
          }
          .skill-bar-fill {
            background: linear-gradient(90deg, #1e1b4b, #e85d75);
            height: 100%;
            border-radius: 5px;
          }
          .footer-note {
            margin-top: 30px;
            text-align: center;
            font-size: 11px;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            padding-top: 14px;
          }
          @media print {
            body { padding: 15px; }
          }
        </style>
      </head>
      <body>
        <div class="cv-header">
          <div>
            <h1 class="name">ឆៃហ្វុង (CHAI FONG)</h1>
            <div class="subtitle">Graphic Designer & Video Editor | Official Resume</div>
            <div class="contact-list">
              📞 Phone: <strong>071 777 3554</strong> &nbsp;|&nbsp; ✉️ Email: <strong>Profong085@gmail.com</strong><br>
              💬 Telegram: <strong>@Phochaifong007</strong> &nbsp;|&nbsp; 🌐 Website: <strong>https://chaifong.website</strong>
            </div>
          </div>
          <img src="${window.location.origin}/images/IMG_7733.webp" class="profile-img" alt="Chai Fong" />
        </div>

        <div class="stats-grid">
          <div><div class="stat-num">50+</div><div class="stat-desc">គម្រោងបញ្ចប់</div></div>
          <div><div class="stat-num">15+</div><div class="stat-desc">វីដេអូកាត់ត</div></div>
          <div><div class="stat-num">99%</div><div class="stat-desc">ការពេញចិត្ត</div></div>
          <div><div class="stat-num">5+ ឆ្នាំ</div><div class="stat-desc">បទពិសោធន៍</div></div>
        </div>

        <div class="section">
          <div class="sec-title">📌 អំពីខ្ញុំ (About Me)</div>
          <div class="bio-text">
            ខ្ញុំគឺជា Graphic Designer និងជា Video Editor ដែលមានបេះដូងស្រឡាញ់ការបង្កើតសាច់រឿង និងគំនិតច្នៃប្រឌិតប្លែកៗ។ ជំនាញចម្បងរបស់ខ្ញុំគឺការឌីហ្សាញ Poster និងរូបភាពផ្សេងៗដោយប្រើប្រាស់ Adobe Photoshop ព្រមទាំងការកាត់តវីដេអូយ៉ាងស្ទាត់ជំនាញជាមួយ CapCut និង DaVinci Resolve។
          </div>
        </div>

        <div class="section">
          <div class="sec-title">🎓 បទពិសោធន៍ការងារ & ការអប់រំ (Work & Education)</div>
          <div class="bio-text">
            💼 <strong>Loctroi Cambodia (ក្រុមហ៊ុនថ្នាំកសិកម្ម):</strong>
            • ធ្វើជា Graphic Designer & Video Editor ឌីហ្សាញ Poster, Banner ផលិតផលថ្នាំកសិកម្ម និងក្រាហ្វិក Social Media។
            • កាត់តវីដេអូផ្សព្វផ្សាយផលិតផលស្ទាត់ជំនាញជាមួយ CapCut & DaVinci Resolve និង Motion Graphics ជាមួយ After Effects។
            
            🎓 <strong>ការសិក្សា:</strong>
            • សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម (RUA)
          </div>
        </div>

        <div class="section">
          <div class="sec-title">🛠️ កម្មវិធីប្រើប្រាស់ស្ទាត់ជំនាញ (Software Skills)</div>
          <div class="skills-grid">
            <div class="skill-card">
              <div class="skill-head"><span>CapCut</span><span>91%</span></div>
              <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 91%;"></div></div>
            </div>
            <div class="skill-card">
              <div class="skill-head"><span>Adobe Photoshop (Ps)</span><span>88%</span></div>
              <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 88%;"></div></div>
            </div>
            <div class="skill-card">
              <div class="skill-head"><span>DaVinci Resolve</span><span>75%</span></div>
              <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 75%;"></div></div>
            </div>
            <div class="skill-card">
              <div class="skill-head"><span>Adobe After Effects (Ae)</span><span>48%</span></div>
              <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 48%;"></div></div>
            </div>
            <div class="skill-card">
              <div class="skill-head"><span>VS Code</span><span>45%</span></div>
              <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 45%;"></div></div>
            </div>
            <div class="skill-card">
              <div class="skill-head"><span>Adobe Illustrator (Ai)</span><span>38%</span></div>
              <div class="skill-bar-bg"><div class="skill-bar-fill" style="width: 38%;"></div></div>
            </div>
          </div>
        </div>

        <div class="footer-note">
          © 2025 Chai Fong Studio | Official Resume generated from https://chaifong.website
        </div>
      </body>
      </html>
    `;
    printWindow.document.write(cvHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 600);
  };

  return (
    <>
      {/* INITIAL LOADING SPLASH SCREEN (1% - 100%) - 100% SEAMLESS HERO MATCHED STYLE */}
      {!isLoaded && (
        <div 
          className={`fixed inset-0 z-[100] bg-[#e2f0f9] flex flex-col justify-between items-center py-10 px-6 select-none transition-all duration-500 ease-out ${
            fadeOutLoader ? 'opacity-0 scale-100 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Top Brand Header Bar matching site hero badge */}
          <div className="w-full flex items-center justify-between max-w-sm z-10">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/70 shadow-sm text-[11px] font-bold text-brand-navy">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>{lang === 'km' ? 'ស្នាដៃ ឆៃហ្វុង ២០២៦' : 'Chai Fong Portfolio 2026'}</span>
            </div>
            <div className="bg-brand-navy text-white text-[10.5px] font-extrabold px-3 py-1 rounded-full shadow-sm">
              PHO CHAIFONG
            </div>
          </div>

          {/* Main Center Content */}
          <div className="flex flex-col items-center text-center z-10 my-auto">
            {/* Profile Avatar matching main portfolio */}
            <div className="relative mb-5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-rose-100/80 p-0.5 bg-white">
                <img 
                  src="/images/IMG_7733.webp" 
                  alt="Chai Fong Profile" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -inset-2.5 rounded-full border-2 border-dashed border-brand-pink/50 animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            {/* Author Title & Subtitle */}
            <div className="flex flex-col items-center">
              <h1 className="font-koulen text-3xl sm:text-4xl tracking-wider text-brand-navy leading-snug py-1">
                {lang === 'km' ? 'ផូ ឆៃហ្វុង' : 'PHO CHAIFONG'}
              </h1>
              <div className="mt-1 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-white shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                <span className="text-[10.5px] font-outfit font-extrabold tracking-[0.2em] text-brand-pink uppercase">
                  GRAPHIC DESIGNER & VIDEO EDITOR
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Progress Counter & Seamless Bar */}
          <div className="w-full max-w-sm flex flex-col items-center z-10">
            {/* Status & Counter Row */}
            <div className="w-full flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-gray-600 italic">
                {loadingProgress < 40 
                  ? (lang === 'km' ? 'កំពុងរៀបចំទិន្នន័យ...' : 'Loading assets...') 
                  : loadingProgress < 85 
                  ? (lang === 'km' ? 'កំពុងផ្ទុករូបភាព...' : 'Preparing graphics...') 
                  : (lang === 'km' ? 'រួចរាល់ហើយ!' : 'Welcome!')}
              </span>
              <span className="text-2xl font-black text-brand-navy font-display">
                {loadingProgress}%
              </span>
            </div>

            {/* Seamless Progress Bar */}
            <div className="w-full h-3 bg-white/80 rounded-full p-0.5 border border-white shadow-inner overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-navy to-brand-pink rounded-full transition-all duration-75 ease-out shadow-sm"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>

        </div>
      )}

      <div className="w-full max-w-full sm:max-w-[440px] mx-auto flex justify-center pb-0 sm:pb-10 overflow-hidden">
      <div className="w-full max-w-full bg-white sm:rounded-[36px] sm:shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300 sm:border sm:border-gray-100">

        {/* FLOAT BAR: LANGUAGE TOGGLE & CV DOWNLOAD */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 sm:gap-2">
          <button 
            onClick={handleDownloadCV}
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#1d1b4b]/90 backdrop-blur-md shadow-md text-[10px] sm:text-xs font-bold text-white hover:scale-105 transition-all duration-200 border border-white/30 cursor-pointer"
            title="Download CV PDF"
          >
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink shrink-0" />
            <span>CV PDF</span>
          </button>
          <button 
            onClick={() => setLang(l => l === 'km' ? 'en' : 'km')}
            className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-[10px] sm:text-xs font-bold text-brand-navy hover:scale-105 transition-all duration-200 border border-white/50 cursor-pointer"
          >
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-pink shrink-0" />
            <span>{t.toggleLang}</span>
          </button>
        </div>

        {/* HERO SECTION WITH FULL UNCROPPED NATURAL DIMENSIONS */}
        <section className="relative w-full overflow-hidden rounded-b-[24px] sm:rounded-b-[32px] bg-[#e2f0f9]">
          <img 
            src="/images/IMG_8039.webp" 
            alt="Chai Fong Portfolio Hero"
            loading="eager"
            fetchPriority="high"
            className="w-full h-auto block hover:scale-105 transition-transform duration-700"
          />
          
          {/* Subtle Floating Glow Effect Badge */}
          <div className="absolute bottom-2 left-2.5 sm:bottom-4 sm:left-6 z-20 flex items-center gap-1 sm:gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/70 shadow-lg text-[9.5px] sm:text-[11px] font-bold text-brand-navy">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 animate-pulse shrink-0" />
            <span>{lang === 'km' ? 'ស្នាដៃ Graphic Design & Video Edit ២០២៦' : 'Design & Video Portfolio 2026'}</span>
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
                <h1 className="font-koulen text-[28px] sm:text-[36px] leading-snug text-brand-navy tracking-wider py-1">
                  {lang === 'km' ? (
                    <>ផូ ឆៃហ្វុង</>
                  ) : (
                    <>PHO CHAIFONG</>
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
                <span className="font-normal whitespace-pre-line">{t.bio}</span>
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
                  src="/images/IMG_7733.webp" 
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
                <a href="tel:0717773554" className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-brand-pink transition-colors">
                  <Phone className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                  <span className="truncate">071 777 3554</span>
                </a>
                <a href="https://web.facebook.com/Phochaifong007/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-brand-pink transition-colors">
                  <Compass className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                  <span className="truncate">Phochaifong007</span>
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-gray-700 hover:text-brand-pink transition-colors text-left group"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-navy shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{copied ? t.copiedEmail : 'Profong085@...'}</span>
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
              <p className="text-[11.5px] leading-relaxed text-gray-600 font-normal whitespace-pre-line">
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
                {/* CapCut */}
                <div 
                  onMouseEnter={() => setActiveSoftware(0)}
                  onMouseLeave={() => setActiveSoftware(null)}
                  className="w-[50px] h-[50px] rounded-xl bg-black border border-gray-800 p-1 flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer overflow-hidden relative"
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
                  className="w-[50px] h-[50px] rounded-xl bg-[#001e36] border-2 border-[#31a8ff] flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer overflow-hidden relative"
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
                  className="w-[50px] h-[50px] rounded-xl bg-[#12131A] border border-gray-800 p-1 flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer overflow-hidden"
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
                  className="w-[50px] h-[50px] rounded-xl bg-[#1a0033] border-2 border-[#cf9bff] flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer overflow-hidden relative"
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
                  className="w-[50px] h-[50px] rounded-xl bg-[#001c38] border border-blue-900/60 p-2 flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer overflow-hidden"
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
                  className="w-[50px] h-[50px] rounded-xl bg-[#261300] border-2 border-[#ff9a00] flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer overflow-hidden relative"
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
                    <div className="flex justify-between items-center text-[11px] font-bold text-brand-navy">
                      <span className={isHovered ? 'text-brand-pink transition-colors' : ''}>{sw.name}</span>
                      <span className="text-[10px] text-gray-500">{sw.percent}%</span>
                    </div>
                    <div className="w-full h-[7px] bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          sw.name === 'CapCut' ? 'bg-[#222222]' :
                          sw.name === 'Photoshop' ? 'bg-[#31a8ff]' :
                          sw.name === 'DaVinci' ? 'bg-[#f43f5e]' :
                          sw.name === 'After Effects' ? 'bg-[#9c8dc7]' :
                          sw.name === 'VS Code' ? 'bg-[#007acc]' : 'bg-[#f7b731]'
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
                    src={art.images ? art.images[slideshowIndices[art.id] || 0] : art.img} 
                    alt={art.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider">
                    {art.categoryLabel}
                  </span>

                  {/* Multi-Image Auto Badge */}
                  {art.images && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-[9px] font-bold text-white flex items-center gap-1 shadow-md">
                      <Sparkles className="w-2.5 h-2.5 animate-spin" />
                      <span>{(slideshowIndices[art.id] || 0) + 1}/{art.images.length} (3s)</span>
                    </span>
                  )}

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
                    <Sparkles className="w-3 h-3 animate-spin" />
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

    </div>
    </>
  );
}

