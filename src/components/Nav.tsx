import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GITHUB_URL } from '../data/socials';
import { PROFILE } from '../data/profile';
import { scrollToSection } from '../lib/scroll';

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

/**
 * 极简固定导航。
 * mix-blend-difference 让文字在浅色背景上呈深色、在深色项目卡上方自动反相，
 * 因此不需要额外的背景遮罩或滚动监听。
 */
const Nav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goTo = (id: string) => {
    if (location.pathname === '/') {
      scrollToSection(id);
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const linkClass =
    'hover:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-sm';

  return (
    <nav className="fixed top-0 left-0 w-full px-6 md:px-12 lg:px-24 py-6 md:py-8 z-50 pointer-events-none mix-blend-difference text-white">
      <div className="flex justify-between items-center gap-6">
        <Link
          to="/"
          className={`text-sm font-bold tracking-widest uppercase pointer-events-auto ${linkClass}`}
          aria-label={`${PROFILE.name} — home`}
        >
          FL.
        </Link>

        <div className="flex items-center gap-5 md:gap-7 text-xs md:text-sm font-medium pointer-events-auto">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => goTo(section.id)}
              className={`${linkClass} ${section.id === 'contact' ? 'hidden md:inline' : ''} ${
                section.id === 'about' ? 'hidden sm:inline' : ''
              }`}
            >
              {section.label}
            </button>
          ))}

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} hidden md:inline`}
          >
            GitHub
          </a>

          {/* Resume 是主要行动点，视觉上加一条下划线强调 */}
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} border-b border-current pb-0.5`}
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
