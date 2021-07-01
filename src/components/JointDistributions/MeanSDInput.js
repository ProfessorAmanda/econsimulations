/*

  Displays sliders for the user to adjust the mean and standard deviation

*/
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import PropTypes from 'prop-types';
import { stringOrNumberType } from '../../lib/types.js';

export default function MeanSDInput({ title, mean, setMean, sd, setSD }){
  return (
    <div>
      <p> Choose the Mean and Standard Deviation for {title} Height </p>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>{title} Height Mean:</InputGroupText>
        </InputGroupAddon>
        <Input type="number" min={60} max={80} step={1} value={mean} onChange={(event) => setMean(event.target.value)}/>
      </InputGroup>
      <br/>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>
          <InputGroupText>{title} Height SD:</InputGroupText>
        </InputGroupAddon>
        <Input
          type="number"
          min={1}
          max={7}
          value={sd}
          onChange={(event) => setSD(event.target.value)}
          aria-label={`${title}-SD`}
        />
      </InputGroup>
    </div>
  );
}

MeanSDInput.propTypes = {
  title: PropTypes.string.isRequired,
  mean: stringOrNumberType.isRequired,
  setMean: PropTypes.func.isRequired,
  sd: stringOrNumberType.isRequired,
  setSD: PropTypes.func.isRequired,
}
