import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ApiUri } from "../../_config";

function Add({show, closeFun, data={}}){

    const handleSubmit = (e) => {
        e.preventDefault();
        var formdata = {
            name: e.target.name.value,
            code: e.target.code.value,
            desc: e.target.desc.value,
            price: e.target.price.value
        };
        if (data===null) {
            axios.post(ApiUri('auth/ticket'), formdata)
            .then((res) => {
                closeFun();
            })
            .catch((err) => {

            })
        } else {
            formdata = {...formdata, id: data._id}
            axios.put(ApiUri('auth/ticket'), formdata)
            .then((res) => {
                closeFun();
            })
            .catch((err) => {

            })
        }
    }

    return(
        <Modal show={show} onHide={closeFun}>
            <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
            <Modal.Title>Ticket {data?._id?'Edit': 'Add'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' defaultValue={data?.name} className="form-control" id="name" placeholder="1234 Main St"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="code" className="form-label">Code</label>
                        <input type="text" name='code' defaultValue={data?.code} className="form-control" id="code" placeholder="1234 Main St"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea className="form-control" name="desc" id="desc" defaultValue={data?.desc} placeholder='Description'></textarea>
                    </div>
                    <div className="col-12">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="text" name='price' defaultValue={data?.price} className="form-control" id="price" placeholder="Price"/>
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
export default Add