import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';

export default function ModuleWrapper({ children }: { children: React.ReactElement }) {
  return (
    <div className="wrapper">
      <Head>
        <title>Econ Simulations</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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