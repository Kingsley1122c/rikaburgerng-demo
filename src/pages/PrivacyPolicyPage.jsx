import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';

const PrivacyPolicyPage = () => {
  return (
    <>
      <PageHeader title="Privacy Policy" subtitle="How we handle and protect your data." />
      <section style={{ padding: 'var(--spacing-xl) 0' }}>
        <Container>
          <p style={{ lineHeight: 1.7, maxWidth: '720px' }}>
            A complete legal privacy policy will be added as part of the production launch readiness phase.
          </p>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
