import { Button } from 'react-bootstrap';

export default function Footer() {
  return (
    <p>
      <Button
        size="sm"
        variant="primary"
        href="https://amandagreggeconomics.com/statistics-simulations-project/"
        target="_blank"
        rel="noopener noreferrer"
      >
        View teaching materials
      </Button>
      {' '}
      <Button
        size="sm"
        variant="success"
        href="https://github.com/ProfessorAmanda/econsimulations"
        target="_blank"
        rel="noopener noreferrer"
      >
        View code on GitHub
      </Button>
    </p>
  )
}
