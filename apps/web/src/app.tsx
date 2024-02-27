import { useDeleteMutation, useGetAllQuery } from "./api";

export default function App() {
    const { data, error, isLoading } = useGetAllQuery();
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

    return (
        <>
            <h1>Cats</h1>
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
                            {/* <td>{(Date.now() - new Date(c.birthday)).}</td> */}
                            <td>
                                <button onClick={() => onDelete(c.id)}>Delete</button>
                                {/* <button onClick={() => onUpdate(c.id)}>Update</button> */}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>

    );
}