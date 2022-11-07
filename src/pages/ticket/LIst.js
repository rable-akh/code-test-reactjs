import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Add from "./Add";

import { FaAlignCenter, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import axios from "axios";
import { ApiUri } from "../../_config";
import Status from "./Status";
import { checkPermit } from "../../_config/helper";
import Review from "./Review";

function List(){

    const [open, setOpen] = useState(false);
    const [sopen, setSopen] = useState(false);
    const [ropen, setRopen] = useState(false);
    const [tickets, setTicket] = useState([]);
    const [tkd, setTkd] = useState(null);
    const [rdata, setRdata] = useState(null);
    const [stkd, setSTkd] = useState(null);

    const handleAdd = () => {
        setOpen(true);
        setTkd(null);
    }

    const handleEdit = (data) => {
        setOpen(true);
        setTkd(data);
    }

    const handleReview = (data) => {
        setRopen(true);
        setRdata(data);
    }

    const handleClose = () => {
        setOpen(false);
        setSopen(false);
        setRopen(false);
    }

    const handleDelt = (id) => {
        axios.delete(ApiUri(`auth/ticket/${id}`))
        .then((res) => {
            getList();
        }).catch((err) => {
            //console.log(err);
        })
    }

    const handleStatus = (id) => {
        setSopen(true);
        setSTkd(id);
    } 

    const getList = () => {
        axios.get(ApiUri('auth/ticket'))
        .then((res) => {
            setTicket(res.data.response.results.items);
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
                <Button onClick={handleAdd}>Add Ticket</Button>
            </div>
            <div className="card-body">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Code</th>
                            <th scope="col">Desc</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                            <th scope="col">By Whom</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            tickets.length > 0 ? (
                                tickets.map((ticket, key) => (
                                    <tr key={key}>
                                        <th scope="row">{key++ + 1}</th>
                                        <td>{ticket.name}</td>
                                        <td>{ticket.code}</td>
                                        <td>{ticket.desc}</td>
                                        <td>$ {ticket.price}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket?.created_by?.name}</td>
                                        <td>
                                            {
                                                checkPermit('edit', ticket?.status, ticket?.created_by?._id) && <Button size="sm" variant="primary" onClick={() => handleEdit(ticket)}><FaEdit/></Button>
                                            }
                                            {
                                                checkPermit('status', ticket?.status) && <Button size="sm" variant="primary" onClick={() => handleStatus(ticket._id)}><FaAlignCenter/></Button>
                                            }
                                            <Button size="sm" variant="info" onClick={() => handleReview(ticket.status_logs)}><FaEye/></Button>
                                            <Button size="sm" variant="danger" onClick={() => handleDelt(ticket._id)}><FaTrash/></Button>
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
        <Status
            show={sopen}
            closeFun={handleClose}
            id={stkd}
        />
        <Review
            show={ropen}
            closeFun={handleClose}
            data={rdata}
        />
        </>
    )
}

export default List;