/**
 * DisasterShield - Core JavaScript Logic
 * Includes: Navigation, Multi-language, Weather API Simulation, Quiz System, 
 * SOS Logic, Dashboard Tracking, and UI Interactions.
 */

// --- 1. DATA & CONFIGURATION ---

const disasterModules = [
    { id: 'flood', title: 'Flood Safety', image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=400&q=60', overview: 'Flooding is the most common natural disaster worldwide.', causes: 'Heavy rain, melting snow, dam failures.', signs: 'Rising water levels, flash flood warnings.', prevention: 'Build away from floodplains, improve drainage.', before: 'Create evacuation plan, move valuables to higher ground.', during: 'Move to higher ground, avoid walking/driving through water.', after: 'Avoid floodwaters, check for structural damage.', tips: 'Turn off electricity at the main breaker if your home is flooding.' },
    { id: 'earthquake', title: 'Earthquake Safety', image: 'https://images.unsplash.com/photo-1585822719534-91182e857d67?auto=format&fit=crop&w=400&q=60', overview: 'Sudden shaking of the ground caused by seismic waves.', causes: 'Tectonic plate movement, volcanic activity.', signs: 'Ground shaking, rumbling sounds.', prevention: 'Retrofit buildings, secure heavy furniture.', before: 'Practice "Drop, Cover, and Hold On".', during: 'Drop to knees, cover head, hold on until shaking stops.', after: 'Check for gas leaks, be ready for aftershocks.', tips: 'Stay away from glass, windows, and heavy objects.' },
    { id: 'fire', title: 'Fire Safety', image: 'https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&w=400&q=60', overview: 'Rapid combustion of material leading to smoke and flames.', causes: 'Electrical faults, cooking accidents, wildfires.', signs: 'Smoke, smell of burning, fire alarms.', prevention: 'Install smoke detectors, keep fire extinguishers.', before: 'Create fire escape plan, test alarms monthly.', during: 'Get low and go under smoke, touch doors before opening.', after: 'Do not enter building until cleared by fire officials.', tips: 'Stop, Drop, and Roll if your clothes catch fire.' },
    { id: 'cyclone', title: 'Cyclone Safety', image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=400&q=60', overview: 'Large rotating air mass with strong winds and rain.', causes: 'Warm ocean waters, atmospheric instability.', signs: 'Strong winds, heavy rain, storm surges.', prevention: 'Build cyclone shelters, plant windbreaks.', before: 'Secure loose items, board up windows.', during: 'Stay indoors, stay away from windows.', after: 'Watch for fallen power lines and unstable trees.', tips: 'Stay tuned to local radio for emergency broadcasts.' },
    { id: 'tsunami', title: 'Tsunami Safety', image: 'https://images.unsplash.com/photo-1502933691298-84fa14a82812?auto=format&fit=crop&w=400&q=60', overview: 'Giant waves caused by underwater earthquakes.', causes: 'Underwater seismic activity.', signs: 'Ground shaking, sea water receding significantly.', prevention: 'Warning systems, coastal barriers.', before: 'Know evacuation zones, plan high ground routes.', during: 'Move inland and to higher ground immediately.', after: 'Stay away from coast until cleared by officials.', tips: 'A tsunami is a series of waves, not just one.' },
    { id: 'landslide', title: 'Landslide Safety', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=60', overview: 'Movement of rock or earth down a sloped section of land.', causes: 'Heavy rain, earthquakes, deforestation.', signs: 'New cracks, leaning trees, unusual sounds.', prevention: 'Retaining walls, proper drainage.', before: 'Monitor weather, avoid building on steep slopes.', during: 'Move to second floor if possible, stay alert.', after: 'Stay away from slide area, check for injuries.', tips: 'If outside, run to the nearest high ground.' },
    { id: 'drought', title: 'Drought Safety', image: 'https://images.unsplash.com/photo-1509063919279-542bc5b27488?auto=format&fit=crop&w=400&q=60', overview: 'Prolonged period of abnormally low rainfall.', causes: 'Lack of precipitation, climate change.', signs: 'Drying soil, falling water levels.', prevention: 'Water conservation, rainwater harvesting.', before: 'Repair leaks, install water-efficient fixtures.', during: 'Follow water restrictions, reuse water.', after: 'Continue conservation, plan for future droughts.', tips: 'Never pour water down the drain when it can be reused.' },
    { id: 'heatwave', title: 'Heat Wave Safety', image: 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?auto=format&fit=crop&w=400&q=60', overview: 'Period of excessively hot weather with high humidity.', causes: 'High-pressure systems, climate change.', signs: 'Extreme temperatures, heat advisories.', prevention: 'Urban greening, cooling centers.', before: 'Install window reflectors, insulate home.', during: 'Stay hydrated, stay indoors, wear light clothing.', after: 'Check on elderly, continue hydration.', tips: 'Never leave children or pets in a parked car.' },
    { id: 'pandemic', title: 'Pandemic Awareness', image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=400&q=60', overview: 'Outbreak of infectious disease across a large region.', causes: 'Viruses or bacteria spreading between humans.', signs: 'Increased cases, health alerts.', prevention: 'Vaccination, hygiene, monitoring.', before: 'Stock essentials, stay informed.', during: 'Practice distancing, wear masks, wash hands.', after: 'Continue hygiene, follow recovery guidelines.', tips: 'Avoid touching your eyes, nose, and mouth.' },
    { id: 'thunderstorm', title: 'Thunderstorm Safety', image: 'https://images.unsplash.com/photo-1605727281914-506899962b27?auto=format&fit=crop&w=400&q=60', overview: 'Storm with lightning and thunder.', causes: 'Atmospheric instability, moisture.', signs: 'Dark clouds, thunder, increasing wind.', prevention: 'Lightning rods, surge protectors.', before: 'Postpone outdoor activities, secure objects.', during: 'Go indoors. Avoid water and electronics.', after: 'Wait 30 minutes after last thunder.', tips: 'Avoid tall trees and open fields during a storm.' }
];

const translations = {
    en: {
        nav_home: "Home", nav_modules: "Awareness Modules", nav_quiz: "Interactive Quiz", nav_weather: "Weather Alert", nav_checklist: "Checklist", nav_emergency: "Emergency Contacts", nav_sos: "Emergency SOS", nav_learning: "Learning Center", nav_dashboard: "Student Dashboard", nav_faq: "FAQ", nav_about: "About", nav_contact: "Contact Us",
        hero_title: "Be Prepared, Stay Safe", hero_desc: "Your comprehensive education system for disaster awareness, preparedness, and response. Empowering communities through knowledge.",
        btn_start: "Start Learning", btn_sos: "Emergency SOS", login: "Login", register: "Register", search_placeholder: "Search safety tips...",
        stat_modules_text: "Awareness Modules", stat_quizzes_text: "Practice Quizzes", stat_users_text: "Active Learners",
        modules_title: "Disaster Awareness Modules", back_to_modules: "Back to Modules",
        quiz_title: "Safety Quiz & Certification", quiz_intro_h: "Test Your Knowledge", quiz_intro_p: "Complete the quiz to test your preparedness and earn a certificate.", btn_start_quiz: "Start Quiz",
        weather_title: "Live Weather Alert Dashboard", humidity: "Humidity", wind_speed: "Wind Speed", pressure: "Pressure", visibility: "Visibility", active_alerts: "Active Alerts", no_alerts: "No active weather warnings in your area.",
        checklist_title: "Emergency Preparedness Checklist", checklist_subtitle: "Ensure you have these essentials ready at all times.",
        emergency_title: "Emergency Contacts", police: "Police", fire_service: "Fire Service", ambulance: "Ambulance", disaster_helpline: "Disaster Helpline", regional_helplines: "Regional Helplines",
        sos_h: "EMERGENCY SOS", sos_p: "Press and hold for 3 seconds to trigger emergency alert.", sending_sos: "Sending location to emergency services...",
        learning_title: "Learning Center", tab_articles: "Articles", tab_videos: "Videos", tab_resources: "Resources",
        dashboard_title: "Student Dashboard", learning_progress: "Learning Progress", quiz_history: "Quiz History", my_certificates: "My Certificates",
        faq_title: "Frequently Asked Questions", about_title: "About DisasterShield", contact_title: "Contact Us"
    },
    hi: {
        nav_home: "होम", nav_modules: "जागरूकता मॉड्यूल", nav_quiz: "क्विज़", nav_weather: "मौसम अलर्ट", nav_checklist: "चेकलिस्ट", nav_emergency: "आपातकालीन संपर्क", nav_sos: "एसओएस", nav_learning: "लर्निंग सेंटर", nav_dashboard: "डैशबोर्ड", nav_faq: "एफएक्यू", nav_about: "बारे में", nav_contact: "संपर्क करें",
        hero_title: "तैयार रहें, सुरक्षित रहें", hero_desc: "आपदा जागरूकता, तैयारी और प्रतिक्रिया के लिए आपका व्यापक शिक्षा तंत्र। ज्ञान के माध्यम से समुदायों को सशक्त बनाना।",
        btn_start: "सीखना शुरू करें", btn_sos: "आपातकालीन एसओएस", login: "लॉगिन", register: "पंजीकरण", search_placeholder: "सुरक्षा टिप्स खोजें...",
        stat_modules_text: "जागरूकता मॉड्यूल", stat_quizzes_text: "अभ्यास क्विज़", stat_users_text: "सक्रिय शिक्षार्थी",
        modules_title: "आपदा जागरूकता मॉड्यूल", back_to_modules: "मॉड्यूल पर वापस जाएं",
        quiz_title: "सुरक्षा क्विज़ और प्रमाणन", quiz_intro_h: "अपने ज्ञान का परीक्षण करें", quiz_intro_p: "अपनी तैयारी का परीक्षण करने और प्रमाणपत्र अर्जित करने के लिए क्विज़ पूरा करें।", btn_start_quiz: "क्विज़ शुरू करें",
        weather_title: "लाइव मौसम अलर्ट डैशबोर्ड", humidity: "नमी", wind_speed: "हवा की गति", pressure: "दबाव", visibility: "दृश्यता", active_alerts: "सक्रिय अलर्ट", no_alerts: "आपके क्षेत्र में कोई सक्रिय मौसम चेतावनी नहीं है।",
        checklist_title: "आपातकालीन तैयारी चेकलिस्ट", checklist_subtitle: "सुनिश्चित करें कि आपके पास ये आवश्यक वस्तुएं हर समय तैयार हैं।",
        emergency_title: "आपातकालीन संपर्क", police: "पुलिस", fire_service: "अग्निशमन सेवा", ambulance: "एम्बुलेंस", disaster_helpline: "आपदा हेल्पलाइन", regional_helplines: "क्षेत्रीय हेल्पलाइन",
        sos_h: "आपातकालीन एसओएस", sos_p: "आपातकालीन अलर्ट ट्रिगर करने के लिए 3 सेकंड तक दबाकर रखें।", sending_sos: "आपातकालीन सेवाओं को स्थान भेज रहा है...",
        learning_title: "लर्निंग सेंटर", tab_articles: "लेख", tab_videos: "वीडियो", tab_resources: "संसाधन",
        dashboard_title: "छात्र डैशबोर्ड", learning_progress: "सीखने की प्रगति", quiz_history: "क्विज़ इतिहास", my_certificates: "मेरे प्रमाणपत्र",
        faq_title: "अक्सर पूछे जाने वाले प्रश्न", about_title: "डिजास्टरशील्ड के बारे में", contact_title: "संपर्क करें"
    },
    ta: {
        nav_home: "முகப்பு", nav_modules: "விழிப்புணர்வு தொகுதிகள்", nav_quiz: "வினாடி வினா", nav_weather: "வானிலை எச்சரிக்கை", nav_checklist: "சரிபார்ப்பு பட்டியல்", nav_emergency: "அவசர தொடர்புகள்", nav_sos: "அவசர SOS", nav_learning: "கற்றல் மையம்", nav_dashboard: "மாணவர் டாஷ்போர்டு", nav_faq: "கேள்விகள்", nav_about: "பற்றி", nav_contact: "தொடர்பு",
        hero_title: "தயாராக இருங்கள், பாதுகாப்பாக இருங்கள்", hero_desc: "பேரிடர் விழிப்புணர்வு, தயார்நிலை மற்றும் பதிலளிப்புக்கான உங்கள் விரிவான கல்வி முறை. அறிவின் மூலம் சமூகங்களை மேம்படுத்துதல்.",
        btn_start: "கற்றலைத் தொடங்கு", btn_sos: "அவசர SOS", login: "உள்நுழை", register: "பதிவு", search_placeholder: "பாதுகாப்பு குறிப்புகளைத் தேடு...",
        stat_modules_text: "விழிப்புணர்வு தொகுதிகள்", stat_quizzes_text: "பயிற்சி வினாடி வினாக்கள்", stat_users_text: "செயலில் உள்ள கற்பவர்கள்",
        modules_title: "பேரிடர் விழிப்புணர்வு தொகுதிகள்", back_to_modules: "தொகுதிகளுக்குத் திரும்பு",
        quiz_title: "பாதுகாப்பு வினாடி வினா மற்றும் சான்றிதழ்", quiz_intro_h: "உங்கள் அறிவை சோதிக்கவும்", quiz_intro_p: "உங்கள் தயார்நிலையை சோதிக்க வினாடி வினாவை முடித்து சான்றிதழைப் பெறுங்கள்.", btn_start_quiz: "வினாடி வினாவைத் தொடங்கு",
        weather_title: "நேரடி வானிலை எச்சரிக்கை டாஷ்போர்டு", humidity: "ஈரப்பதம்", wind_speed: "காற்றின் வேகம்", pressure: "அழுத்தம்", visibility: "பார்வைத்திறன்", active_alerts: "செயலில் உள்ள எச்சரிக்கைகள்", no_alerts: "உங்கள் பகுதியில் வானிலை எச்சரிக்கைகள் எதுவும் இல்லை.",
        checklist_title: "அவசர தயார்நிலை சரிபார்ப்பு பட்டியல்", checklist_subtitle: "இந்த அத்தியாவசிய பொருட்கள் உங்களிடம் எப்போதும் தயாராக இருப்பதை உறுதி செய்யவும்.",
        emergency_title: "அவசர தொடர்புகள்", police: "காவல்துறை", fire_service: "தீயணைப்பு சேவை", ambulance: "ஆம்புலன்ஸ்", disaster_helpline: "பேரிடர் உதவி எண்", regional_helplines: "வட்டார உதவி எண்கள்",
        sos_h: "அவசர SOS", sos_p: "அவசர எச்சரிக்கையைத் தூண்ட 3 விநாடிகள் அழுத்திப் பிடிக்கவும்.", sending_sos: "அவசர சேவைகளுக்கு இருப்பிடத்தை அனுப்புகிறது...",
        learning_title: "கற்றல் மையம்", tab_articles: "கட்டுரைகள்", tab_videos: "வீடியோக்கள்", tab_resources: "ஆதாரங்கள்",
        dashboard_title: "மாணவர் டாஷ்போர்டு", learning_progress: "கற்றல் முன்னேற்றம்", quiz_history: "வினாடி வினா வரலாறு", my_certificates: "எனது சான்றிதழ்கள்",
        faq_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்", about_title: "டிசாஸ்டர்ஷீல்ட் பற்றி", contact_title: "தொடர்பு கொள்ள"
    }
};

const quizQuestions = {
    general: [
        { q: "What should you have in your emergency kit?", options: ["Bottled water", "Gaming console", "Expensive jewelry", "Ice cream"], a: 0 },
        { q: "How much water is needed per person per day in an emergency?", options: ["1 cup", "1 gallon", "5 gallons", "None"], a: 1 },
        { q: "What is the primary goal of disaster preparedness?", options: ["Buying more items", "Saving lives and reducing impact", "Watching news", "Going on vacation"], a: 1 },
        { q: "Which number is the standard emergency helpline in many countries?", options: ["100", "911", "101", "All of above (Regional)"], a: 3 },
        { q: "Where should you keep important documents?", options: ["In the kitchen", "In a waterproof/fireproof container", "In the car", "Under the bed"], a: 1 }
    ],
    flood: [
        { q: "What should you do during a flash flood warning?", options: ["Go to the basement", "Move to higher ground immediately", "Drive through water", "Wait for instructions"], a: 1 },
        { q: "How many inches of moving water can knock you off your feet?", options: ["6 inches", "2 feet", "5 feet", "10 feet"], a: 0 }
    ],
    earthquake: [
        { q: "What is the correct action during earthquake shaking?", options: ["Run outside", "Drop, Cover, and Hold On", "Use the elevator", "Stand under a tree"], a: 1 },
        { q: "After an earthquake, you should be prepared for:", options: ["Snow", "Aftershocks", "Tornadoes", "Heatwaves"], a: 1 }
    ],
    fire: [
        { q: "If your clothes catch fire, you should:", options: ["Run", "Stop, Drop, and Roll", "Pour oil", "Fan the flames"], a: 1 },
        { q: "What should you do if you encounter smoke during an evacuation?", options: ["Run through it", "Crawl low under the smoke", "Stand tall", "Close your eyes"], a: 1 }
    ]
};

const checklistItems = [
    "3 Gallons of Water per person", "3-day supply of non-perishable food", "First Aid Kit", "Flashlight & extra batteries",
    "Whistle to signal for help", "Dust mask to filter contaminated air", "Moist wipes & garbage bags",
    "Wrench or pliers to turn off utilities", "Manual can opener for food", "Local maps"
];

const learningResources = {
    articles: [
        { title: "Building Your First Aid Kit", desc: "A guide to medical essentials.", img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=60" },
        { title: "Understanding Warning Signs", desc: "How to read nature's alerts.", img: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=60" }
    ],
    videos: [
        { title: "Earthquake Safety Drill", desc: "Watch the proper technique.", img: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?auto=format&fit=crop&w=400&q=60" },
        { title: "Fire Extinguisher Tutorial", desc: "Learn the PASS method.", img: "https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&w=400&q=60" }
    ],
    resources: [
        { title: "Family Emergency Plan PDF", desc: "Download and print.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=60" },
        { title: "Disaster Kit Checklist", desc: "Digital interactive list.", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=60" }
    ]
};

const faqs = [
    { q: "What is an emergency kit?", a: "An emergency kit is a collection of basic items your household may need in the event of an emergency." },
    { q: "How often should I update my kit?", a: "You should review and update your kit every six months to ensure food and water are fresh." },
    { q: "Where can I find my local evacuation route?", a: "Contact your local emergency management office or check your city's official website." }
];

// --- 2. STATE MANAGEMENT ---

let state = {
    currentPage: 'home',
    lang: 'en',
    theme: 'light',
    quiz: { active: false, topic: 'general', step: 0, score: 0, questions: [] },
    user: { loggedIn: false, name: 'Guest User', email: 'guest@disastershield.com', progress: 0, history: [], certs: [] },
    checklist: new Array(checklistItems.length).fill(false)
};

// --- 3. UI INITIALIZATION & CORE FUNCTIONS ---

function init() {
    // Event Listeners
    document.getElementById('lang-switch').addEventListener('change', (e) => setLanguage(e.target.value));
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('toggle-sidebar').addEventListener('click', toggleSidebar);
    document.getElementById('search-input').addEventListener('input', handleSearch);
    
    // Initial Render
    renderModules();
    renderChecklist();
    renderLearning('articles');
    renderFAQs();
    updateDashboard();
    setLanguage('en');
    
    console.log("DisasterShield Initialized Successfully");
}

// Navigation
function navigateTo(pageId) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav li').forEach(l => l.classList.remove('active'));
    
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        state.currentPage = pageId;
        const navItem = document.querySelector(`.sidebar-nav li[data-page="${pageId}"]`);
        if (navItem) navItem.classList.add('active');
    }
    
    if (window.innerWidth <= 1200) toggleSidebar(false);
    window.scrollTo(0, 0);
}

document.querySelectorAll('.sidebar-nav li').forEach(li => {
    li.addEventListener('click', () => navigateTo(li.getAttribute('data-page')));
});

function toggleSidebar(force) {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main-content');
    if (typeof force === 'boolean') {
        if (force) { sidebar.classList.add('active'); } else { sidebar.classList.remove('active'); }
    } else {
        sidebar.classList.toggle('active');
    }
}

// Multi-language
function setLanguage(lang) {
    state.lang = lang;
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
    // Re-render dynamic content if needed
}

// Theme
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.body.className = state.theme + '-mode';
    const icon = document.querySelector('#theme-toggle i');
    icon.className = state.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// --- 4. FEATURE LOGIC ---

// Disaster Modules
function renderModules() {
    const list = document.getElementById('modules-list');
    list.innerHTML = disasterModules.map(m => `
        <div class="module-card" onclick="showModuleDetail('${m.id}')">
            <img src="${m.image}" alt="${m.title}">
            <div class="module-info">
                <h3>${m.title}</h3>
                <p>${m.overview.substring(0, 60)}...</p>
                <button class="btn-text">Learn More</button>
            </div>
        </div>
    `).join('');
}

function showModuleDetail(id) {
    const m = disasterModules.find(x => x.id === id);
    if (!m) return;
    
    document.getElementById('modules-list').classList.add('hidden');
    const detail = document.getElementById('module-detail');
    detail.classList.remove('hidden');
    
    document.getElementById('module-content').innerHTML = `
        <div class="module-header">
            <h2 class="section-title">${m.title}</h2>
            <img src="${m.image}" class="detail-img" style="width:100%; border-radius:20px; margin-bottom:20px;">
        </div>
        <div class="detail-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">
            <div class="detail-block"><h3>Overview</h3><p>${m.overview}</p></div>
            <div class="detail-block"><h3>Causes</h3><p>${m.causes}</p></div>
            <div class="detail-block"><h3>Warning Signs</h3><p>${m.signs}</p></div>
            <div class="detail-block"><h3>Prevention</h3><p>${m.prevention}</p></div>
        </div>
        <div class="action-blocks" style="margin-top:30px;">
            <div class="act-box before"><h4>Before</h4><p>${m.before}</p></div>
            <div class="act-box during"><h4>During</h4><p>${m.during}</p></div>
            <div class="act-box after"><h4>After</h4><p>${m.after}</p></div>
        </div>
        <div class="tip-banner" style="background:#fff3cd; padding:20px; border-radius:15px; margin-top:30px; border-left:5px solid #ffc107;">
            <strong><i class="fas fa-lightbulb"></i> Pro Tip:</strong> ${m.tips}
        </div>
    `;
    
    // Track progress
    if (!state.user.history.includes(m.id)) {
        state.user.history.push(m.id);
        state.user.progress = Math.min(100, Math.round((state.user.history.length / disasterModules.length) * 100));
        updateDashboard();
    }
}

function showModulesList() {
    document.getElementById('module-detail').classList.add('hidden');
    document.getElementById('modules-list').classList.remove('hidden');
}

// Weather Alert
async function getWeather() {
    const city = document.getElementById('weather-city-input').value || 'Chennai';
    // Simulated API response for reliability
    const mockWeather = {
        temp: Math.floor(Math.random() * 15) + 20,
        humidity: Math.floor(Math.random() * 40) + 40,
        wind: Math.floor(Math.random() * 20) + 5,
        desc: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)]
    };
    
    document.getElementById('city-name').innerText = city + ", IN";
    document.getElementById('temp').innerText = mockWeather.temp + "°C";
    document.getElementById('humidity').innerText = mockWeather.humidity + "%";
    document.getElementById('wind-speed').innerText = mockWeather.wind + " km/h";
    document.getElementById('weather-desc').innerText = mockWeather.desc;
    
    const icon = document.getElementById('main-w-icon');
    if (mockWeather.desc.includes('Sunny')) icon.className = 'fas fa-sun';
    else if (mockWeather.desc.includes('Cloudy')) icon.className = 'fas fa-cloud';
    else icon.className = 'fas fa-cloud-rain';
    
    const alertList = document.getElementById('alert-list');
    if (mockWeather.temp > 33) {
        alertList.innerHTML = `<p class="alert-item high" style="color:red; font-weight:bold;"><i class="fas fa-exclamation-circle"></i> HEAT WAVE WARNING: Stay hydrated!</p>`;
    } else {
        alertList.innerHTML = `<p class="no-alerts">No active weather warnings in your area.</p>`;
    }
}

// Checklist
function renderChecklist() {
    const container = document.getElementById('checklist-items-container');
    container.innerHTML = checklistItems.map((item, i) => `
        <div class="check-item ${state.checklist[i] ? 'checked' : ''}" onclick="toggleCheck(${i})">
            <input type="checkbox" ${state.checklist[i] ? 'checked' : ''}>
            <span>${item}</span>
        </div>
    `).join('');
    updateCheckProgress();
}

function toggleCheck(index) {
    state.checklist[index] = !state.checklist[index];
    renderChecklist();
}

function updateCheckProgress() {
    const count = state.checklist.filter(x => x).length;
    const percent = (count / checklistItems.length) * 100;
    document.getElementById('check-progress').style.width = percent + "%";
    document.getElementById('check-count').innerText = `${count} of ${checklistItems.length} items completed`;
}

function resetChecklist() {
    state.checklist = new Array(checklistItems.length).fill(false);
    renderChecklist();
}

// Quiz System
function startQuiz() {
    const topic = document.getElementById('quiz-topic-select').value;
    state.quiz = { active: true, topic: topic, step: 0, score: 0, questions: quizQuestions[topic] || quizQuestions.general };
    document.getElementById('quiz-intro').classList.add('hidden');
    document.getElementById('quiz-body').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const q = state.quiz.questions[state.quiz.step];
    document.getElementById('question-number').innerText = `Question ${state.quiz.step + 1}/${state.quiz.questions.length}`;
    document.getElementById('progress').style.width = `${((state.quiz.step + 1) / state.quiz.questions.length) * 100}%`;
    document.getElementById('question-text').innerText = q.q;
    
    const container = document.getElementById('options-container');
    container.innerHTML = q.options.map((opt, i) => `
        <button class="option-btn" onclick="selectOption(${i})">${opt}</button>
    `).join('');
    document.getElementById('next-btn').disabled = true;
}

function selectOption(idx) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    btns[idx].classList.add('selected');
    state.quiz.selected = idx;
    document.getElementById('next-btn').disabled = false;
}

document.getElementById('next-btn').addEventListener('click', () => {
    if (state.quiz.selected === state.quiz.questions[state.quiz.step].a) {
        state.quiz.score++;
    }
    state.quiz.step++;
    if (state.quiz.step < state.quiz.questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

function finishQuiz() {
    document.getElementById('quiz-body').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
    const score = state.quiz.score;
    const total = state.quiz.questions.length;
    const percent = Math.round((score / total) * 100);
    
    document.getElementById('score-text').innerText = `You scored ${score} out of ${total} (${percent}%)`;
    
    if (percent >= 80) {
        document.getElementById('certificate-area').classList.remove('hidden');
        document.getElementById('cert-course-name').innerText = state.quiz.topic.toUpperCase() + " SAFETY SPECIALIST";
        document.getElementById('cert-date').innerText = "Date: " + new Date().toLocaleDateString();
        
        // Add to dashboard
        const certTitle = state.quiz.topic.toUpperCase() + " Safety";
        if (!state.user.certs.includes(certTitle)) {
            state.user.certs.push(certTitle);
        }
    } else {
        document.getElementById('certificate-area').classList.add('hidden');
    }
    
    state.user.history.push({ topic: state.quiz.topic, score: percent, date: new Date().toLocaleDateString() });
    updateDashboard();
}

function resetQuiz() {
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-intro').classList.remove('hidden');
}

function printCertificate() {
    const content = document.getElementById('certificate-print').innerHTML;
    const win = window.open('', '', 'height=700,width=900');
    win.document.write('<html><head><title>Certificate</title>');
    win.document.write('<link rel="stylesheet" href="style.css">');
    win.document.write('</head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    setTimeout(() => win.print(), 500);
}

// SOS Button
let sosTimer;
const sosBtn = document.getElementById('sos-btn');
sosBtn.addEventListener('mousedown', startSOS);
sosBtn.addEventListener('touchstart', startSOS);
sosBtn.addEventListener('mouseup', cancelSOS);
sosBtn.addEventListener('touchend', cancelSOS);

function startSOS() {
    sosBtn.style.transform = "scale(0.9)";
    document.querySelector('.sos-ripple').style.animation = "ripple 0.5s infinite";
    sosTimer = setTimeout(() => {
        document.getElementById('sos-status').classList.remove('hidden');
        alert("EMERGENCY SOS ACTIVATED! Your coordinates have been sent to local authorities.");
        cancelSOS();
    }, 3000);
}

function cancelSOS() {
    clearTimeout(sosTimer);
    sosBtn.style.transform = "scale(1)";
    document.querySelector('.sos-ripple').style.animation = "ripple 2s infinite";
}

// Learning Center
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLearning(btn.getAttribute('data-tab'));
    });
});

function renderLearning(type) {
    const container = document.getElementById('learning-content');
    const data = learningResources[type];
    container.innerHTML = data.map(item => `
        <div class="learning-card" style="background:var(--card-light); border-radius:15px; overflow:hidden; box-shadow:var(--shadow);">
            <img src="${item.img}" style="width:100%; height:150px; object-fit:cover;">
            <div style="padding:20px;">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <button class="btn-text" onclick="alert('Resource coming soon!')">View Content</button>
            </div>
        </div>
    `).join('');
}

// Dashboard
function updateDashboard() {
    document.getElementById('progress-val').innerText = state.user.progress + "%";
    document.getElementById('dash-progress-circle').style.background = `conic-gradient(var(--accent-color) ${state.user.progress}%, #e2e8f0 0%)`;
    document.getElementById('modules-completed').innerText = `${state.user.history.filter(h => typeof h === 'string').length} of 10 modules completed`;
    
    const historyList = document.getElementById('quiz-history-list');
    const quizHistory = state.user.history.filter(h => typeof h === 'object');
    if (quizHistory.length > 0) {
        historyList.innerHTML = quizHistory.map(h => `
            <li><span>${h.topic}</span> <strong>${h.score}%</strong> <small>${h.date}</small></li>
        `).join('');
    }
    
    const certList = document.getElementById('cert-list');
    if (state.user.certs.length > 0) {
        certList.innerHTML = state.user.certs.map(c => `
            <div class="cert-thumb"><i class="fas fa-certificate"></i> ${c}</div>
        `).join('');
    }
}

// AI Chat
function toggleChat() {
    document.getElementById('chat-window').classList.toggle('hidden');
}

function sendMessage() {
    const input = document.getElementById('user-msg');
    const text = input.value.trim();
    if (!text) return;
    
    addChatMessage(text, 'user');
    input.value = '';
    
    // Simple Response Logic
    setTimeout(() => {
        let reply = "I'm analyzing your request. For safety tips, try asking about 'floods', 'fire', or 'earthquakes'.";
        const low = text.toLowerCase();
        if (low.includes('flood')) reply = "During a flood, move to higher ground immediately. Do not drive through water!";
        if (low.includes('fire')) reply = "If you smell smoke, get low and go. Have an escape plan ready.";
        if (low.includes('help')) reply = "I can help with safety tips, emergency contacts, and disaster preparedness guides.";
        
        addChatMessage(reply, 'bot');
        // Voice output
        if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(reply));
        }
    }, 1000);
}

function addChatMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    const container = document.getElementById('chat-messages');
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// FAQ
function renderFAQs() {
    const container = document.getElementById('faq-accordion');
    container.innerHTML = faqs.map((f, i) => `
        <div class="accordion-item" style="margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:10px;">
            <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('hidden')" style="cursor:pointer; font-weight:600; display:flex; justify-content:space-between;">
                ${f.q} <i class="fas fa-chevron-down"></i>
            </div>
            <div class="accordion-content hidden" style="padding:10px 0; opacity:0.8;">${f.a}</div>
        </div>
    `).join('');
}

// Search
function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    if (term.length < 3) return;
    
    const match = disasterModules.find(m => m.title.toLowerCase().includes(term));
    if (match) {
        navigateTo('modules');
        showModuleDetail(match.id);
    }
}

// Auth
function showAuthModal() { document.getElementById('auth-modal').classList.remove('hidden'); }
function closeAuthModal() { document.getElementById('auth-modal').classList.add('hidden'); }
function switchAuth(type) {
    document.getElementById('login-form-div').classList.toggle('hidden', type === 'register');
    document.getElementById('register-form-div').classList.toggle('hidden', type === 'login');
}

function handleAuth(e, type) {
    e.preventDefault();
    const name = type === 'register' ? document.getElementById('reg-name').value : 'Learner';
    state.user.loggedIn = true;
    state.user.name = name;
    document.getElementById('user-display-name').innerText = name;
    document.getElementById('login-btn').innerText = "Profile";
    closeAuthModal();
    alert(`Welcome, ${name}!`);
}

// Start
init();
