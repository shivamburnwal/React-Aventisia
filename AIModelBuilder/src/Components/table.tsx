import { useEffect, useState } from "react";
import { BiSort, BiSortUp, BiSortDown } from "react-icons/bi";
import ModelData from "../interfaces";

interface TableProps {
    data: ModelData[];
    page: number;
}

const TableComponent: React.FC<TableProps> = ({ data, page }) => {
    const [displayedData, setDisplayedData] = useState<ModelData[]>([]);
    const [sortedData, setSortedData] = useState<ModelData[]>([]);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof ModelData | null;
        direction: "asc" | "desc"
    }>
        ({
            key: null,
            direction: "asc",
        });

    const pageSize = 5;
    const headers: { label: string; key: keyof ModelData }[] = [
        { label: "Model Name", key: "name" },
        { label: "Model Type", key: "type" },
        { label: "Description", key: "description" },
        { label: "Created On", key: "createdOn" },
        { label: "Last Trained On", key: "lastTrainedOn" },
        { label: "Status", key: "status" },
    ];

    useEffect(() => {
        let sorted = [...data];

        if (sortConfig.key) {
            sorted.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];

                if (typeof aValue === "string" && typeof bValue === "string") {
                    return sortConfig.direction === "asc"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
                return 0;
            });
        }

        setSortedData(sorted);
    }, [data, sortConfig]);

    useEffect(() => {
        setDisplayedData(sortedData.slice((page - 1) * pageSize, page * pageSize));
    }, [sortedData, page]);

    const handleSort = (key: keyof ModelData) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const getSortIcon = (key: keyof ModelData) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === "asc" ? <BiSortUp /> : <BiSortDown />;
        }
        return <BiSort />;
    };

    return (
        <table className="w-full bg-gray-10 rounded">
            <thead>
                <tr className="text-left">
                    {headers.map(({ label, key }) => (
                        <th
                            key={key}
                            className="p-3 text-center cursor-pointer"
                            onClick={() => handleSort(key)}
                        >
                            {label}
                            <span className="inline-block ml-1 text-gray-400">{getSortIcon(key)}</span>
                        </th>
                    ))}
                    <th className="p-3 text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {displayedData.map((item, index) => (
                    <tr
                        key={item.key}
                        className={`h-8 text-center ${index !== displayedData.length - 1 ? "border-b border-gray-300" : ""
                            }`}
                    >
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
                                className={`px-5 py-1 rounded-10 text-sm ${item.status === "Active"
                                    ? "bg-green-200 text-green"
                                    : "bg-red-200 text-red"
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
