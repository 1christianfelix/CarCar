import React, {useEffect, useState} from 'react'

function ManufacturerList(props) {

    return (
        <div>
            <h1 className="mt-3 mb-3 p-0">Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.manufacturer_list.map((manufacturer) => {
                    return (
                        <tr key={manufacturer.id}>
                            <td>{manufacturer.name}</td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManufacturerList;
