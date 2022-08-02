import { Button } from 'react-bootstrap';

export default function Footer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>
        <Button
          size="sm"
          variant="outline-primary"
          href="https://amandagreggeconomics.com/statistics-simulations-project/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View teaching materials
        </Button>
        {' '}
        <Button
          size="sm"
          variant="outline-success"
          href="https://github.com/ProfessorAmanda/econsimulations"
          target="_blank"
          rel="noopener noreferrer"
        >
          View code on GitHub
        </Button>
      </p>
      <p style={{ color: '#aaa', fontSize: 12, marginTop: '2rem' }}>
        © 2022 Econ Simulations.
      </p>
    </div>

  )
}
