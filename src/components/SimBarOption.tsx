import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { optionalLaTeXType } from 'src/lib/types';
import Link from 'next/link';
import { Section } from 'src/lib/ts-types';

const module2Slug = (module : string) => {
  const slug = module.toLowerCase().replace(/\s/g, '-');
  console.log(`module2Slug: ${module} -> ${slug}`);
  return slug;
}

export default function SimBarOption({ section } : { section : Section }) {
  return (
    <Link href={`/modules/${module2Slug(section.name)}`} passHref>
      <Card border="primary" className="menu-item" data-testid={`module-${section.name}`}>
        <Card.Header className="menu-item-title">{section.name}</Card.Header>
        <Card.Body>
          <Card.Text className="menu-item-text">{section.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

SimBarOption.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: optionalLaTeXType.isRequired
  }).isRequired,
}
