import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateMutation, useGetQuery, useUpdateMutation } from "./api"
import { CatDto } from "@client-rtkquery/dto";
import { useEffect } from "react";

type Props = {
    id?: number;
}

type FormType = {
    firstName: string;
    lastName: string;
    birthday: string;
}

export default function Form({ id }: Props) {
    const { data: cat, isLoading: isGetLoading, error: getError } = useGetQuery(id ?? 0);
    const [create, { isLoading: isCreateLoading, error: createError }] = useCreateMutation();
    const [update, { isLoading: isUpdateLoading, error: updateError }] = useUpdateMutation();

    const { register, handleSubmit, reset } = useForm<FormType>();

    useEffect(() => {
        // if (cat) {
            reset({ ...cat, birthday: cat?.birthDay ? new Date(cat.birthDay).toLocaleDateString('en') : new Date().toLocaleDateString() });
        // }
    }, [cat, reset]);

    if (isGetLoading || isCreateLoading || isUpdateLoading) {
        return <h1>Loading...</h1>
    }

    if (getError || (!cat && id)) {
        return <h1>Cannot fetch cat</h1>
    }

    const handle: SubmitHandler<FormType> = async (data) => {
        const cat: CatDto = {...data, birthDay: new Date(data.birthday), id: id ?? 0};
        id ? await update(cat) :
            await create(cat);
    }

    return (
        <form onSubmit={handleSubmit(handle)}>
            {(createError || updateError) && <span>{'may error hoy'}</span>}
            <input {...register('firstName')} type="text" /> <br />
            <input {...register('lastName')} type="text" /> <br />
            <input {...register('birthday')} type="date" /> <br />
            <button type="submit">Submit</button>
            {/* <button type="reset" onClick={onCancel}>Cancel</button> */}
        </form>
    )
}