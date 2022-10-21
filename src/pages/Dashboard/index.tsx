import React from "react"

import Navbar from "../../components/Navbar"
import Content from "../../components/Content"

import { useAppSelector } from "../../store"

const Dashboard: React.FC = () => {
    const { selectedNote } = useAppSelector(state => state.notes)

    if (selectedNote) {
        return (
            <>
                <Navbar />
                <div className="flex-1 p-2">
                    <div className="mb-10 text-2xl font-bold">{selectedNote?.title}</div>
                    <Content title={selectedNote.title!} text={selectedNote.text!} />
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="flex-1 p-2">
                <h1>📝 Selectionner une note</h1>
            </div>
        </>
    )
}

export default Dashboard
