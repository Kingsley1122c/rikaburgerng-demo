import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';

const FaqPage = () => {
  return (
    <>
      <PageHeader title="Frequently Asked Questions" subtitle="Quick answers for common customer questions." />
      <section style={{ padding: 'var(--spacing-xl) 0' }}>
        <Container>
          <p style={{ lineHeight: 1.7, maxWidth: '720px' }}>
            Our full FAQ section is being prepared. For urgent support, please use our contact details.
          </p>
        </Container>
      </section>
    </>
  );
};

export default FaqPage;
