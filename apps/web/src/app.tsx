import { useState } from "react";
import Form from "./form";
import Listing from "./listing";

export default function App() {
    const [selectedId, setSelectedId] = useState<number | undefined>();

    return (
        <>
        <Listing setSelectedId={setSelectedId} />
        <Form id={selectedId} />
        </>
    )
}