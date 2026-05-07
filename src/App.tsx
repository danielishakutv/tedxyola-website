import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { useScrollToTop } from './hooks/useScrollToTop';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PastEventsPage = lazy(() => import('./pages/PastEventsPage').then(module => ({ default: module.PastEventsPage })));
const ThemePage = lazy(() => import('./pages/ThemePage').then(module => ({ default: module.ThemePage })));
const SpeakersPage = lazy(() => import('./pages/SpeakersPage').then(module => ({ default: module.SpeakersPage })));
const ProgramPage = lazy(() => import('./pages/ProgramPage').then(module => ({ default: module.ProgramPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(module => ({ default: module.GalleryPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const WatchPage = lazy(() => import('./pages/WatchPage').then(module => ({ default: module.WatchPage })));
const TicketsPage = lazy(() => import('./pages/TicketsPage').then(module => ({ default: module.TicketsPage })));
const ActivitiesPage = lazy(() => import('./pages/ActivitiesPage').then(module => ({ default: module.ActivitiesPage })));
const SipNPaintPage = lazy(() => import('./pages/SipNPaintPage').then(module => ({ default: module.SipNPaintPage })));

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block w-16 h-16 border-4 border-white/20 border-t-ted-red rounded-full animate-spin mb-4" />
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

const AppRoutes = () => {
  useScrollToTop();

  return (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/past-events" element={<PastEventsPage />} />
          <Route path="/event/theme" element={<ThemePage />} />
          <Route path="/event/speakers" element={<SpeakersPage />} />
          <Route path="/event/program" element={<ProgramPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/snp" element={<SipNPaintPage />} />

          {/* 404 fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
