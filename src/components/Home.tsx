import React from 'react';
import Hero from './Hero';
import ProjectList from './ProjectList';
import ExperienceList from './ExperienceList';
import Contact from './Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ProjectList />
      <ExperienceList />
      <Contact />
    </>
  );
};

export default Home;