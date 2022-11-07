import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Add from "./Add";

import axios from "axios";
import { ApiUri } from "../../_config";
import { ucfirst } from "../../_config/helper";
import { FaEdit } from "react-icons/fa";

function List(){

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [tkd, setTkd] = useState(null);

    const handleAdd = () => {
        setOpen(true);
        setTkd(null);
    }

    const handleEdit = (data) => {
        setOpen(true);
        setTkd(data);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getList = () => {
        axios.get(ApiUri('auth/user'))
        .then((res) => {
            setUsers(res.data.response.results.items);
        }).catch((err) => {
            //console.log(err);
        })
    }

    useEffect(() => {
        getList();
    }, [open])

    return(
        <>
        <div className="card mt-3">
            <div className="card-body">
                <Button onClick={handleAdd}>Add User</Button>
            </div>
            <div className="card-body">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            users.length > 0 ? (
                                users.map((user, key) => (
                                    <tr key={key}>
                                        <th scope="row">{key++ + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{ucfirst(user.role)}</td>
                                        <td>
                                            {user.role!=="admin"&&<Button size="sm" variant="primary" onClick={() => handleEdit(user)}><FaEdit/></Button>}
                                            {/* <Button size="sm" variant="danger" onClick={() => handleDelt(user._id)}><FaTrash/></Button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <th colSpan={9} className="text-center">No data...</th>
                                </tr>
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
        <Add
            show={open}
            closeFun={handleClose}
            data={tkd}
        />
        </>
    )
}

export default List;