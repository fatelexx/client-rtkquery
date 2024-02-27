import { useCreateMutation, useGetQuery, useUpdateMutation } from "./api"

type Props = {
    id?: number;
}

export default function Form({ id }: Props) {
    const { data: cat, isLoading: isGetLoading, error: getError } = useGetQuery(id ?? 0);
    const [create, { isLoading: isCreateLoading, error: createError }] = useCreateMutation();
    const [update, { isLoading: isUpdateLoading, error: updateError}] = useUpdateMutation();

    if (isGetLoading || isCreateLoading || isUpdateLoading) {
        return <h1>Loading...</h1>
    }

    if (getError || (!cat && id)) {
        return <h1>Cannot fetch cat</h1>
    }

    const handle = async () => {
        id ? await update({id, firstName: 'puss', lastName: 'ahh', birthday: new Date('11/22/2023')}) : 
        await create({ firstName: 'dashu', lastName: 'catsu', birthday: new Date('8/12/2023'), id: 1 });
    }

    return (
        <>
            {(createError || updateError) && <span>{'may error hoy'}</span>}
            <button onClick={handle}>Add New</button>
            <textarea value={JSON.stringify(cat)}></textarea>
        </>
    )
}