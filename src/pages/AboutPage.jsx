import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import Reveal from '../components/common/Reveal';
import {
  aboutTimeline,
  teamMembers,
  awards,
  restaurantStats,
  galleryShots,
} from '../data/siteContent';
import './AboutPage.css';

const AboutPage = () => {
  const values = [
    {
      title: 'Quality First',
      description: 'Every ingredient and process is selected to deliver a world-class taste experience.',
    },
    {
      title: 'Hospitality',
      description: 'We serve with warmth, speed, and attention to customer satisfaction.',
    },
    {
      title: 'Innovation',
      description: 'We constantly improve recipes and service touchpoints for modern food lovers.',
    },
  ];

  return (
    <div className="about-page">
      <PageHeader
        title="About RikaburgerNG"
        subtitle="A premium burger brand built on craftsmanship, local flavor, and modern hospitality."
      />

      <section className="about-section">
        <Container>
          <div className="about-grid">
            <Reveal>
              <article className="about-card">
                <h2>Our Story</h2>
                <p>
                  RikaburgerNG began with a clear vision: to prove that burgers in Nigeria can be
                  bold, premium, and unforgettable. We merged local spice intelligence with global
                  burger standards to create a distinct culinary identity.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="about-card">
                <h2>Mission</h2>
                <p>
                  To deliver premium meals and hospitality experiences that delight customers every
                  single time.
                </p>
                <h2 style={{ marginTop: '16px' }}>Vision</h2>
                <p>To become Africa's most admired premium fast-casual burger brand.</p>
              </article>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="about-section" style={{ background: '#fff8f2' }}>
        <Container>
          <Reveal>
            <SectionTitle title="Core Values" subtitle="The standards that shape every meal and customer interaction." />
          </Reveal>
          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06}>
                <motion.article className="value-card" whileHover={{ y: -6 }}>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-section">
        <Container>
          <Reveal>
            <SectionTitle title="Timeline" subtitle="Major milestones in our growth journey." />
          </Reveal>
          <div className="timeline-grid">
            {aboutTimeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.06}>
                <article className="timeline-card">
                  <strong>{item.year}</strong>
                  <p>{item.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-section" style={{ background: '#fff8f2' }}>
        <Container>
          <Reveal>
            <SectionTitle title="Meet the Team" subtitle="The people behind the flavor and service quality." />
          </Reveal>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <motion.article className="team-card" whileHover={{ y: -6 }}>
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="team-content">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-section">
        <Container>
          <Reveal>
            <SectionTitle title="Awards" subtitle="Recognition from the food and hospitality ecosystem." />
          </Reveal>
          <div className="awards-grid">
            {awards.map((award, index) => (
              <Reveal key={award} delay={index * 0.06}>
                <article className="award-card">
                  <h3>Award</h3>
                  <p>{award}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-section" style={{ background: '#fff8f2' }}>
        <Container>
          <Reveal>
            <SectionTitle title="Restaurant Photos" subtitle="A visual look into our dining, kitchen, and food styling." />
          </Reveal>
          <div className="photos-grid">
            {galleryShots.slice(0, 6).map((shot, index) => (
              <Reveal key={shot.title} delay={index * 0.05}>
                <motion.article className="photo-card" whileHover={{ y: -6 }}>
                  <img src={shot.image} alt={shot.title} loading="lazy" />
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-section">
        <Container>
          <Reveal>
            <SectionTitle title="Statistics" subtitle="Operational metrics that reflect customer trust." />
          </Reveal>
          <div className="about-stats-grid">
            {restaurantStats.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.06}>
                <article className="about-stat-card">
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
