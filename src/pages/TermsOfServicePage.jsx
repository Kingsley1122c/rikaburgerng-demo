import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';

const TermsOfServicePage = () => {
  return (
    <>
      <PageHeader title="Terms of Service" subtitle="The terms that govern the use of our website and services." />
      <section style={{ padding: 'var(--spacing-xl) 0' }}>
        <Container>
          <p style={{ lineHeight: 1.7, maxWidth: '720px' }}>
            Full legal terms will be added during legal content finalization for production deployment.
          </p>
        </Container>
      </section>
    </>
  );
};

export default TermsOfServicePage;
