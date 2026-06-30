import React from 'react';
import Container from './Container';

const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="page-header">
      <Container>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </Container>
    </section>
  );
};

export default PageHeader;
