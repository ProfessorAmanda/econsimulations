import { Table } from "reactstrap";
import PropTypes from "prop-types";
import { olsSampleType } from "../../lib/types";

export default function SamplesTable({ samples, setSelected, selected }) {

  const samplesTable = samples.map((sampleObject) =>
    <tr
      style={{ backgroundColor: (selected && (sampleObject.id === selected.id)) ? "#747EF2" : undefined, cursor: "pointer" }}
      key={sampleObject.id}
      onClick={() => setSelected(sampleObject)}
    >
      <td>{sampleObject.id}</td>
      <td>{sampleObject.size}</td>
      <td>{sampleObject.slope}</td>
      <td>{sampleObject.intercept}</td>
    </tr>
  );

  samplesTable.reverse();

  return (
    <div style={{ height: 250, overflow: "auto", margin: "auto" }}>
      <Table hover striped className="ci-table">
        <thead>
          <tr>
            <th>Sample</th>
            <th>Size</th>
            <th>Slope</th>
            <th>Intercept</th>
          </tr>
        </thead>
        <tbody>
          {samplesTable}
        </tbody>
      </Table>
    </div>
  )
}

SamplesTable.propTypes = {
  samples: PropTypes.arrayOf(olsSampleType).isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: olsSampleType
}
