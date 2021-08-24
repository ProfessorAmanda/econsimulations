import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import EffectsToggle from './EffectsToggle';
import FixedEffectsPlot from './FixedEffectsPlot';

export default function FixedEffects() {
  const [effects, setEffects] = useState([]);
  const [showBestFit, setShowBestFit] = useState(false);

  const toggleEffect = (effect) => {
    if (effects.includes(effect)) {
      setEffects(effects.filter((e) => e !== effect))
    } else {
      setEffects([...effects, effect])
    }
  }

  const data = {
    1: {
      x: [-6, 1, 8],
      y: [-5, -4, 7]
    },
    2: {
      x: [-2, 2, 5],
      y: [1, 3, 4]
    }
  }

  return (
    <Row>
      <Col>
        <FixedEffectsPlot data={data} effects={effects} showBestFit={showBestFit}/>
      </Col>
      <Col style={{margin: 'auto'}}>
        <EffectsToggle effects={effects} toggleEffect={toggleEffect} showBestFit={showBestFit} setShowBestFit={setShowBestFit}/>
      </Col>
    </Row>
  )
}
