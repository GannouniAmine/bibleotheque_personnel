'use client'


import Input from "@/sharedComponent/Input";
import { genres, lireStatus } from "../../const";


export default function Filterbook(props: any) {
    
    const handleGenreChange = (genre: string) => {
        if (props.selectedGenres.includes(genre)) {
            props.setSelectedGenres(props.selectedGenres.filter((g: string) => g !== genre));
        } else {
            props.setSelectedGenres([...props.selectedGenres, genre]);
        }
    };

    const handleStatusChange = (status: string) => {
        if (props.selectedStatus.includes(status)) {
            props.setSelectedStatus(props.selectedStatus.filter((s: string) => s !== status));
        } else {
            props.setSelectedStatus([...props.selectedStatus, status]);
        }
    };

    return (
        <>
        <div className="w-full p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Genres</h6>
            <ul className="space-y-2 text-sm">
            {genres.map((genre, index) => (
                <li key={index} className="flex items-center">
                    <Input
                        type="checkbox"
                        name={genre}
                        label={genre}
                        value={props.selectedGenres.includes(genre) ? "checked" : ""}
                        onChange={() => handleGenreChange(genre)}
                    />
                </li>
            ))}
            </ul>
        </div>

        <div className="w-full p-3 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Status</h6>
            <ul className="space-y-2 text-sm">
            {lireStatus.map((status, index) => (
                <li key={index} className="flex items-center">
                    <Input
                        type="checkbox"
                        name={status}
                        label={status}
                        value={props.selectedStatus.includes(status) ? "checked" : ""}
                        onChange={() => handleStatusChange(status)}
                    />
                </li>
            ))}
            </ul>
        </div>
        </>
    );
}
