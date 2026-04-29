import { useState, useEffect } from "react";
import styles from "./StoneTable.module.css";
import { FaSortNumericDownAlt } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import EditableTd from "./EditableTd";

function StoneTable({ stones, updateField, sortOrder, toggleSort }) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th onClick={toggleSort}>
                            Rating{" "}
                            {sortOrder === "asc" ? (
                                <FaSortNumericUp />
                            ) : (
                                <FaSortNumericDownAlt />
                            )}
                        </th>
                        <th>Iamge</th>
                    </tr>
                </thead>
                <tbody>
                    {stones &&
                        stones.length > 0 &&
                        stones.map((stone) => (
                            <tr key={stone.id}>
                                <EditableTd
                                    id={stone.id}
                                    field="name"
                                    value={stone.name}
                                    updateField={updateField}
                                />
                                <EditableTd
                                    id={stone.id}
                                    field="description"
                                    value={stone.description}
                                    updateField={updateField}
                                />
                                <EditableTd
                                    id={stone.id}
                                    field="rating"
                                    value={stone.rating}
                                    type="number"
                                    maxNumber={10}
                                    updateField={updateField}
                                />
                                <td>
                                    <img src={stone.image} alt={stone.name} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default StoneTable;
