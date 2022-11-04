import React from "react"
import {
    AiOutlineAlignRight,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlinePaperClip,
    AiOutlineOrderedList,
    AiOutlineUnorderedList,
} from "react-icons/ai"

import { updateNote } from "../actions/notes"

import { INote } from "../types/INote"

import { useAppDispatch } from "../store"

import { convertToPDF } from "../helpers/convertToPDF"

import Button from "./Button"
import WYSIWYG from "./WYSIWYG"

interface ContentProps {
    note: INote
}

const Content: React.FC<ContentProps> = ({ note }) => {
    const dispatch = useAppDispatch()

    return (
        <div className="flex-1">
            <div className="flex justify-between">
                <Button
                    title={note.state === "archived" ? "Publier " : "Archiver"}
                    onClick={() => {
                        dispatch(
                            updateNote({
                                id: note._id!,
                                title: note.title!,
                                text: note.text!,
                                state: note.state === "archived" ? "public" : "archived",
                            }),
                        )
                    }}
                    className="rounded-md p-2 bg-slate-100 dark:text-slate-900"
                />
                <Button
                    title="Partager"
                    onClick={() => {
                        console.log("partager")
                    }}
                    className="rounded-md p-2 bg-slate-100 dark:text-slate-900"
                />
                <Button
                    title="Télécharger"
                    onClick={() => convertToPDF(note.title!, note.text)}
                    className="rounded-md p-2 bg-slate-100 dark:text-slate-900"
                />
                <Button
                    title={note.state === "junk" ? "Publier " : "Brouillon"}
                    onClick={() =>
                        dispatch(
                            updateNote({
                                id: note._id!,
                                title: note.title!,
                                text: note.text!,
                                state: note.state === "junk" ? "public" : "junk",
                            }),
                        )
                    }
                    className="rounded-md p-2 bg-slate-100 dark:text-slate-900"
                />
            </div>
            <WYSIWYG selectedNote={note} />
        </div>
    )
}

export default Content
