import { useEffect, useState } from "react";

import axios from "axios";
import { ApiUri } from "../../_config";
import { ucfirst } from "../../_config/helper";

function List(){

    const [logs, setLogs] = useState([]);

    const getList = () => {
        axios.get(ApiUri('auth/logs'))
        .then((res) => {
            setLogs(res.data.response.results.items);
        }).catch((err) => {
            //console.log(err);
        })
    }

    useEffect(() => {
        getList();
    }, [])

    return(
        <div className="card mt-3">
            <div className="card-body">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Page</th>
                            <th scope="col">Action</th>
                            <th scope="col">Description</th>
                            <th scope="col">By Whom</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {
                            logs.length > 0 ? (
                                logs.map((slog, key) => (
                                    <tr key={key}>
                                        <th scope="row">{key++ + 1}</th>
                                        <td>{slog?.link}</td>
                                        <td>{slog?.action}</td>
                                        <td>{slog?.change}</td>
                                        <td>{slog?.created_by?.name}</td>
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
    )
}

export default List;