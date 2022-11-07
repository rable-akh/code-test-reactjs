import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { dateFormat, ucfirst } from '../../_config/helper';

function Review({show, closeFun, data}){
    return(
        <Modal show={show} onHide={closeFun} className="modal-lg">
            <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Note</th>
                        <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((row, key) => (
                                <tr>
                                    <th scope="row">{ucfirst(row.status)}</th>
                                    <td>{row.note}</td>
                                    <td>{dateFormat(row.date, 'full')}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeFun}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default Review