import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ApiUri } from "../../_config";

function Add({show, closeFun, data={}}){

    const handleSubmit = (e) => {
        e.preventDefault();
        var formdata = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.pass.value,
            role: e.target.role.value
        };
        if (data===null) {
            axios.post(ApiUri('auth/user'), formdata)
            .then((res) => {
                closeFun();
            })
            .catch((err) => {

            })
        } else {
            formdata = {...formdata, id: data._id}
            axios.put(ApiUri('auth/user'), formdata)
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
            <Modal.Title>User {data?._id?'Edit': 'Add'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' defaultValue={data?.name} className="form-control" id="name" placeholder="Name"/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" name='email' defaultValue={data?.email} className="form-control" id="email" placeholder="example@mm.com"/>
                    </div>
                    {
                        !data?.password&&(
                            <div className="col-12">
                                <label htmlFor="pass" className="form-label">Password</label>
                                <input type="text" name='pass' defaultValue={data?.password} className="form-control" id="pass" placeholder="******"/>
                            </div>
                        )
                    }
                    <div className="col-12">
                        <label htmlFor="price" className="form-label">Role</label>
                        <select class="form-select" name="role" aria-label="Default select example">
                            <option selected>Choose</option>
                            {/* <option value="admin">Admin</option> */}
                            <option value="staff" selected={data?.role==="staff"}>Staff</option>
                            <option value="supervisor" selected={data?.role==="supervisor"}>Supervisor</option>
                            <option value="leader" selected={data?.role==="leader"}>Leader</option>
                        </select>
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