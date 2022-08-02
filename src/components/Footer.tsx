import { Button } from 'react-bootstrap';

export default function Footer() {
  return (
    <div style={{ paddingBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
      <Button
        size="sm"
        variant="outline-primary"
        href="https://amandagreggeconomics.com/statistics-simulations-project/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ width: '12rem' }}
      >
        View teaching materials
      </Button>
      <Button
        size="sm"
        variant="outline-success"
        href="https://github.com/ProfessorAmanda/econsimulations"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: '0.5rem', width: '12rem' }}
      >
        View code on GitHub
      </Button>
    </div>
  )
}
