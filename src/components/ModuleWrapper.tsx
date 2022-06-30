import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function ModuleWrapper({ children }: { children: React.ReactElement }) {
  return (
    <div className="wrapper">
    <div data-testid="sim-container" style={{ paddingBottom: 25 }}>
      <Link href={'/menu'} passHref>
        <Button className="home-button" variant="outline-danger" id="Menu" style={{ margin: 15 }}>MENU</Button>
      </Link>
      <div className="mini-logo" />
      {children}
    </div>
  </div>
  );
}