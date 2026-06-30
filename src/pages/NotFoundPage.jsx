import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

const NotFoundPage = () => {
  return (
    <>
      <PageHeader title="Page Not Found" subtitle="We could not find the page you requested." />
      <section style={{ padding: 'var(--spacing-xl) 0' }}>
        <Container>
          <EmptyState
            title="404"
            description="The link may be broken or the page may have been moved."
            action={
              <Button as={Link} to={ROUTES.HOME}>
                Back to Home
              </Button>
            }
          />
        </Container>
      </section>
    </>
  );
};

export default NotFoundPage;
