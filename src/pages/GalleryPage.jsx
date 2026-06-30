import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import Reveal from '../components/common/Reveal';
import Modal from '../components/ui/Modal';
import { galleryShots } from '../data/siteContent';
import './GalleryPage.css';

const GalleryPage = () => {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <>
      <PageHeader
        title="RikaburgerNG Gallery"
        subtitle="A closer look at our kitchen craft, premium food styling, and in-store atmosphere."
      />
      <section className="gallery-page-section">
        <Container>
          <Reveal>
            <div className="gallery-grid" role="list" aria-label="Restaurant gallery">
              {galleryShots.map((shot, index) => (
                <motion.button
                  type="button"
                  className="gallery-item"
                  key={shot.title}
                  role="listitem"
                  onClick={() => setActiveImage(shot)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <img src={shot.image} alt={shot.title} loading="lazy" />
                  <span>{shot.type}</span>
                </motion.button>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <Modal isOpen={Boolean(activeImage)} onClose={() => setActiveImage(null)} title={activeImage?.title || ''}>
        {activeImage ? (
          <div className="gallery-modal-body">
            <img src={activeImage.image} alt={activeImage.title} />
            <p>{activeImage.type}</p>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default GalleryPage;
