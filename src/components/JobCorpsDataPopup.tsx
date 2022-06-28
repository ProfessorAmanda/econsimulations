import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function JobCorpsDataPopup({ showButton } : { showButton: boolean }) {
  const [showDataInfo, setShowDataInfo] = useState(false);

  return (
    <>
      {showButton && (
        <>
          <Button size="sm" variant="outline-success" onClick={() => setShowDataInfo(!showDataInfo)}>
            More about this dataset
          </Button>
          <Modal show={showDataInfo} onHide={() => setShowDataInfo(false)} size="lg" centered>
            <Modal.Header>
              <Modal.Title>More about this dataset:</Modal.Title>
              <Button variant="light" className="btn-close" onClick={() => setShowDataInfo(false)}/>
            </Modal.Header>
            <Modal.Body>
              The Department of Labor commissioned a multi-year study of Job Corps, the nation’s largest education and job training program for disadvantaged youth. The study randomly assigned applicants into two groups: 1) Job Corp group (participated in the program), and 2) Control group (did not participate in the program). Information on earnings for both groups was collected in the following years. This randomized control trial (RCT) found that four years after random assignment, Job Corps participants had weekly earnings $16 per month ($211 vs $195) higher than individuals in the control group representing an 8% increase in earnings. We created a synthetic population dataset to match this finding.
            </Modal.Body>
            <Modal.Footer>
              <cite>Schochet, Peter Z, John Burghard, and Sheena McConnell. 2006. “National Job Corps Study and Longer-Term Follow-Up Study: Impact and Benefit-Cost Findings Using Survey and Summary Earnings Records Data.” Mathematica Policy Research, Inc.</cite>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  )
}

JobCorpsDataPopup.propTypes = {
  showButton: PropTypes.bool.isRequired
}
