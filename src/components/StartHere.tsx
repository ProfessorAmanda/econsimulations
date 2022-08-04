import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function StartHere() {
  return (
    <div style={{
      textAlign: 'center',
      marginRight: 'auto',
      marginLeft: 'auto',
      width: '100%',
    }}>
      <p style={{ fontSize: 20 }}>
        This website is an interactive educational application developed to simulate and visualize various statistical concepts.
      </p>
      <p style={{ fontSize: 16 }}>
        Project of Professor Tanya Byker and Professor Amanda Gregg at Middlebury College, with research assistants Kevin Serrao, Class of 2018, Dylan Mortimer, Class of 2019, Ammar Almahdy, Class of 2020, Jacqueline Palacios, Class of 2020, Siyuan Niu, Class of 2021, David Gikoshvili, Class of 2021, Ethan Saxenian, Class of 2022, and Wayne Wang, Class of 2022.5.
      </p>
      <Link href={'/menu'} passHref>
        <Button variant="outline-danger" >Start!</Button>
      </Link>
    </div>
  );
}