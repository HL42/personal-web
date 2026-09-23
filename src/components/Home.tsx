import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Section from './Section';
import FeaturedWork from './FeaturedWork';
import Archive from './Archive';
import ExperienceList from './ExperienceList';
import Skills from './Skills';
import About from './About';
import Contact from './Contact';
import { scrollToSection } from '../lib/scroll';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 从项目详情页点击导航回到首页时，滚动到目标小节
  // （清掉 state 是为了让刷新后不会重复触发）
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const frame = requestAnimationFrame(() => scrollToSection(target));
    navigate('.', { replace: true, state: null });
    return () => cancelAnimationFrame(frame);
  }, [location.state, navigate]);

  return (
    <>
      <Hero />

      <Section id="work" label="Featured Engineering Work">
        <FeaturedWork />
        <div className="mt-20">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
            Other Projects
          </h3>
          <Archive />
        </div>
      </Section>

      <Section id="experience" label="Experience">
        <ExperienceList />
      </Section>

      <Section id="skills" label="Technical Skills">
        <Skills />
      </Section>

      <Section id="about" label="About">
        <About />
      </Section>

      <Section id="contact" label="Contact" className="pb-8 md:pb-12">
        <Contact />
      </Section>
    </>
  );
};

export default Home;
