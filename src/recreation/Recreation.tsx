import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MotionProvider, useEngine } from "./motion";
import {
  Navigation,
  Footer,
  CustomCursor,
  Intro,
  ConsentNotice,
  TransitionProvider,
} from "./Chrome";
import {
  HomePage,
  WorkPage,
  CasePage,
  AboutPage,
  ServicesPage,
  ServicePage,
  ContactPage,
  NotFound,
} from "./Pages";
import "./recreation.css";
function Shell() {
  const location = useLocation(),
    engine = useEngine();
  useEffect(() => {
    document.title = `${location.pathname === "/" ? "Reference study" : location.pathname.split("/").at(-1)} — Phase 1`;
    engine.refresh();
  }, [location.pathname, engine]);
  return (
    <TransitionProvider>
      <a
        className="study-skip"
        href="#study-main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("study-main")?.focus();
        }}
      >
        Skip to content
      </a>
      <Navigation />
      <main id="study-main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CasePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ConsentNotice />
      <CustomCursor />
      <Intro />
    </TransitionProvider>
  );
}
export default function Recreation() {
  return (
    <HashRouter>
      <MotionProvider>
        <Shell />
      </MotionProvider>
    </HashRouter>
  );
}
