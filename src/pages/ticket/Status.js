import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ApiUri } from "../../_config";

function Status({show, closeFun, id}){

    const handleSubmit = (e) => {
        e.preventDefault();
        var formdata = {
            id: id,
            status: e.target.status.value,
            note: e.target.note.value
        };
        axios.post(ApiUri(`auth/ticket-status`), formdata)
        .then((res) => {
            closeFun();
        }).catch((err) => {
            //console.log(err);
        })
    }

    return(
        <Modal show={show} onHide={closeFun}>
            <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <select class="form-select" name="status" aria-label="Default select example" required>
                            <option value="" selected>Choose</option>
                            <option value="review">Review</option>
                            <option value="approved">Approved</option>
                            <option value="passed">Passed</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="desc" className="form-label">Note</label>
                        <textarea className="form-control" name="note" id="desc" placeholder='Description'></textarea>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeFun}>
                Close
            </Button>
            <Button variant="primary" type='submit'>
                Save
            </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}
export default Status