/**
 * Portfolio Data Store
 * Uses Firebase Firestore when configured, otherwise falls back to localStorage.
 */
const FIRESTORE_COLLECTION = 'portfolio';
const FIRESTORE_DOC = 'main';

const DEFAULT_DATA = {
  hero: {
    name: 'Himamshu S',
    tagline: 'Technical Secretary at Canara Engineering College | Front-end Web Dev; Learning FSD, DevOps | Public Speaker, Fast Learner, Open to Growth.',
    location: 'Mangaluru, Karnataka, India',
    resumeUrl: 'resume.pdf'
  },
  summary: "I'm a natural leader with strong communication skills and fluency in three languages, including English. I'm deeply curious, and I learn best by building and applying what I study. As an engineering student and budding developer, I focus on turning ideas into real, functional products rather than just theories.",
  contact: [
    { type: 'phone', value: '7259680026', label: '7259680026', url: 'tel:7259680026' },
    { type: 'email', value: 'himamshus06@gmail.com', label: 'himamshus06@gmail.com', url: 'mailto:himamshus06@gmail.com' },
    { type: 'linkedin', value: 'https://www.linkedin.com/in/himamshus-886b35301', label: 'LinkedIn', url: 'https://www.linkedin.com/in/himamshus-886b35301' },
    { type: 'website', value: 'https://himamshus06.github.io/Himamshu/', label: 'Personal Site', url: 'https://himamshus06.github.io/Himamshu/' }
  ],
  skills: {
    top: ['Leadership', 'Event Planning', 'Anchoring'],
    languages: ['Hindi (Native or Bilingual)', 'Kannada (Native or Bilingual)', 'English (Native or Bilingual)']
  },
  experience: [
    { title: 'Technical Secretary', meta: 'Canara Engineering College · Feb 2026 – Present (2 months)', description: '' },
    { title: 'Member of Technical Activity Cell', meta: 'Canara Engineering College · Sep 2025 – Present (7 months)', description: "As a member of the Technical Committee, I actively contribute to the planning, organization, and execution of technical events within the college. My role involves close collaboration with other office bearers to conceptualize, coordinate, and successfully conduct workshops, hackathons, and competitions. I also manage essential documentation and official paperwork related to event proposals, budgets, and reports, ensuring smooth administrative functioning. Through this role, I have strengthened my teamwork, event management, and organizational skills while fostering a culture of innovation and technical growth among students." },
    { title: 'Member of Training Committee', meta: 'Canara Engineering College · Sep 2025 – Present (7 months)', description: '' },
    { title: 'Club Advisor', meta: 'Gavel Club of Canara Engineering College · Jan 2026 – Present (3 months)', description: '' },
    { title: 'Core Committee Member', meta: 'Canara Students – Open Source Community · Mangaluru · Sep 2025 – Present (7 months)', description: "As a core committee member, I play a key role in fostering a vibrant open-source culture and enhancing technical skills among my peers. My responsibilities include:", bullets: ['Event Management & Coordination — Planning and executing technical and skill enhancement events, including workshops, seminars, and training sessions. Coordinating with team members, speakers, and faculty to ensure seamless and impactful events.', 'Mentorship & Knowledge Sharing — Acting as a resource person for juniors, providing training and mentorship on various technical topics. Leading sessions and offering guidance to help them navigate their learning journeys and contribute to open-source projects.', 'Contest & Talk Organization — Organizing technical contests and talks, designing challenges for coding competitions and securing speakers for expert talks. These events provide a platform for students to test their abilities, learn from industry professionals, and engage in healthy competition.'] }
  ],
  education: {
    degree: 'Bachelor of Engineering — BE, Computer Science',
    school: 'Canara Engineering College',
    period: 'September 2024 – September 2028'
  },
  certifications: [
    'Data Base Management System',
    'Cryptography: Technologies for Securing Data and Communications',
    'Artificial Intelligence Essentials'
  ],
  footer: {
    year: 2026,
    linkedin: 'https://www.linkedin.com/in/himamshus-886b35301',
    email: 'himamshus06@gmail.com'
  }
};

const LOCALSTORAGE_KEY = 'himamshu_portfolio_data';

function isFirebaseConfigured() {
  return firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY';
}

let db = null;

function getFirestore() {
  if (!db && typeof firebase !== 'undefined' && isFirebaseConfigured()) {
    try {
      try {
        firebase.app();
      } catch (_) {
        firebase.initializeApp(firebaseConfig);
      }
      db = firebase.firestore();
    } catch (e) {
      console.warn('Firebase not initialized:', e);
    }
  }
  return db;
}

const DataStore = {
  /**
   * Get portfolio data. Returns a Promise that resolves with the data.
   * Uses Firestore if configured, otherwise localStorage.
   */
  async get() {
    const firestore = getFirestore();
    if (firestore) {
      try {
        const doc = await firestore.collection(FIRESTORE_COLLECTION).doc(FIRESTORE_DOC).get();
        if (doc.exists) {
          const data = doc.data();
          return { ...DEFAULT_DATA, ...data };
        }
      } catch (e) {
        console.warn('Firestore read failed, using defaults:', e);
      }
    }
    try {
      const stored = localStorage.getItem(LOCALSTORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_DATA, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('localStorage read failed:', e);
    }
    return { ...DEFAULT_DATA };
  },

  /**
   * Save portfolio data. Returns a Promise that resolves to true on success.
   */
  async save(data) {
    const firestore = getFirestore();
    if (firestore) {
      try {
        await firestore.collection(FIRESTORE_COLLECTION).doc(FIRESTORE_DOC).set(data);
        try {
          localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
        } catch (_) {}
        return true;
      } catch (e) {
        console.error('Firestore save failed:', e);
        return false;
      }
    }
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('localStorage save failed:', e);
      return false;
    }
  },

  /**
   * Reset to defaults. Returns a Promise that resolves with default data.
   */
  async reset() {
    const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
    await this.save(defaults);
    return defaults;
  },

  getDefaults() {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
};
