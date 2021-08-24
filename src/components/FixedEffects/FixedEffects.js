import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import EffectsToggle from './EffectsToggle';
import FixedEffectsPlot from './FixedEffectsPlot';
import MeansTable from './MeansTable';

export default function FixedEffects() {
  const [effects, setEffects] = useState({
    periods: [],
    entities: []
  });
  const [means, setMeans] = useState({
    periods: [],
    entities: []
  });
  const [olsLines, setOLSLines] = useState([]);

  const toggleEffect = (effect, type) => {
    let newEffects;
    if (effects[type].includes(effect)) {
      newEffects = effects[type].filter((e) => e !== effect)
    } else {
      newEffects = [...effects[type], effect]
    }
    setEffects({ ...effects, [type]: newEffects });
  }

  const toggleMean = (mean, type) => {
    let newMeans;
    if (means[type].includes(mean)) {
      newMeans = means[type].filter((m) => m !== mean)
    } else {
      newMeans = [...means[type], mean]
    }
    setMeans({ ...means, [type]: newMeans });
  }

  const toggleOLSLine = (type) => {
    let newLines;
    if (olsLines.includes(type)) {
      newLines = olsLines.filter((line) => line !== type)
    } else {
      newLines = [...olsLines, type]
    }
    setOLSLines(newLines);
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
    <>
      <Row>
        <Col>
          <FixedEffectsPlot data={data} effects={effects} means={means} olsLines={olsLines}/>
        </Col>
        <Col style={{margin: 'auto'}}>
          <EffectsToggle
            effects={effects}
            toggleEffect={toggleEffect}
            means={means}
            toggleMean={toggleMean}
            olsLines={olsLines}
            toggleOLSLine={toggleOLSLine}
          />
        </Col>
      </Row>
      <MeansTable data={data}/>
    </>
  )
}
