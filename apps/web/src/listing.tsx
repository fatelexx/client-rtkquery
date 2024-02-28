import { useDeleteMutation, useGetAllQuery } from "./api";

type Props = {
    setSelectedId: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function Listing({ setSelectedId }: Props) {
    const { data, error, isLoading, refetch } = useGetAllQuery();
    const [mutate] = useDeleteMutation();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>An error occurred</h1>
    }

    if (!data) {
        return <h1>No data found</h1>
    }

    const onDelete = async (id: number) => {
        await mutate(id);
    }

    const onUpdate = (id: number) => {
        setSelectedId(id);
    }

    const onAddNew = () => {
        setSelectedId(undefined);
    }

    return (
        <>
            <h1>Cats</h1>
            <button
                aria-label="Refresh"
                onClick={() => refetch()}
            >
                Refresh
            </button>
            <button
                onClick={onAddNew}
            >
                Add New
            </button>
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birthday</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                    {data.map(c =>
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.firstName}</td>
                            <td>{c.lastName}</td>
                            <td>{new Date(c.birthday).toDateString()}</td>
                            <td></td>
                            <td>
                                <button onClick={() => onDelete(c.id)}>Delete</button>
                                <button onClick={() => onUpdate(c.id)}>Update</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>

    );
}