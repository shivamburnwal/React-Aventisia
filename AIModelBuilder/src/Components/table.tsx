import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import ModelData from "../interfaces";

interface TableProps {
    data: ModelData[];
    page: number;
    text: string;
}

const TableComponent: React.FC<TableProps> = ({ data, page, text }) => {
    const [displayedData, setDisplayedData] = useState<ModelData[]>(data);

    const pageSize = 5;
    const headers = ["Model Name", "Model Type", "Description", "Created On", "Last Trained On", "Status", "Action"];

    useEffect(() => {
        setDisplayedData(data.slice((page - 1) * pageSize, page * pageSize));
    }, [data, text, page]);

    return (
        <table className="w-full bg-gray-10 rounded">
            <thead>
                <tr className="text-left">
                    {headers.map((header) => (
                        <th key={header} className="p-3 text-center cursor-pointer">
                            {header}
                            <span className="inline-block ml-1 text-gray-400">
                                <button onClick={() => console.log("clicked")}>
                                    <BiSort />
                                </button>
                            </span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {displayedData.map((item, index) => (
                    <tr key={item.key} className={`h-8 text-center ${index !== displayedData.length - 1 ? "border-b border-gray-300" : ""}`}>
                        <td className="p-3">
                            <div>{item.name}</div>
                            <div className="text-gray-500 text-sm">ID: {item.id}</div>
                        </td>
                        <td className="p-3">{item.type}</td>
                        <td className="p-3">{item.description}</td>
                        <td className="p-3">{item.createdOn}</td>
                        <td className="p-3">{item.lastTrainedOn}</td>
                        <td className="p-3">
                            <span
                                className={`px-5 py-1 rounded-10 text-sm ${item.status === "Active" ? "bg-green-200 text-green" : "bg-red-200 text-red"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </td>
                        <td className="p-3">
                            <button className="text-gray-600 hover:text-black text-xl px-2">⋮</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableComponent;
