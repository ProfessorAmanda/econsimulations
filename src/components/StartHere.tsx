import { Button, Fade } from 'react-bootstrap';
import Link from 'next/link';

export default function StartHere() {
  return (
    <Fade in>
      <div className="jumbotron">
        <p className="lead">
          This website is an interactive educational application developed to simulate and visualize various statistical concepts.
        </p>
        <p>
          Project of Professor Tanya Byker and Professor Amanda Gregg at Middlebury College, with research assistants Kevin Serrao, Class of 2018, Dylan Mortimer, Class of 2019, Ammar Almahdy, Class of 2020, Jacqueline Palacios, Class of 2020, Siyuan Niu, Class of 2021, David Gikoshvili, Class of 2021, and Ethan Saxenian, Class of 2022.
        </p>
        <Link href={'/menu'} passHref>
          <Button variant="outline-danger" >Start!</Button>
        </Link>
      </div>
    </Fade>
  );
}