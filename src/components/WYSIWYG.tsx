import React, { useEffect, useState } from "react"
import {
    AiOutlineAlignRight,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlineOrderedList,
    AiOutlineUnderline,
    AiOutlineLink,
    AiOutlineBgColors,
    AiOutlineUpload,
} from "react-icons/ai"

import { INote } from "../types/INote"

import Button from "./Button"

type TextProps = string | null | undefined
type ImgProps = string | ArrayBuffer | null | undefined

interface WYSIWYGProps {
    selectedNote: INote
}

const WYSIWYG: React.FC<WYSIWYGProps> = ({ selectedNote }) => {
    const [text, setText] = useState<TextProps>()
    const [selectedFile, setSelectedFile] = useState()
    const [image, setImage] = useState<HTMLImageElement | ImgProps>()

    const toolChoice = (role: any) => {
        const textSelected = window.getSelection()!
        document.designMode = "on"

        switch (role) {
            case "code":
                document.execCommand(
                    "insertHTML",
                    false,
                    "<br>" +
                        "<pre class='bg-slate-200 text-slate-900 p-2'>" +
                        textSelected +
                        "</pre>" +
                        "<hr>",
                )
                break
            case "h1":
                document.execCommand("insertHTML", false, "<h1>" + textSelected + "</h1>")
                break
            case "h2":
                document.execCommand("insertHTML", false, "<h2>" + textSelected + "</h2>")
                break
            case "li":
                document.execCommand("insertHTML", false, "<li>" + textSelected + "</li>")
                break
            case "link":
                document.execCommand(
                    "insertHTML",
                    false,
                    "<a contentEditable='false' href='" +
                        textSelected +
                        "'>" +
                        textSelected +
                        "</a>",
                )
                break
            default:
                document.execCommand(role, false, undefined)
                break
        }
    }

    const fileSelectedHandler = (event: any) => {
        setSelectedFile(event.target.files[0])
    }

    const size = (event: any) => {
        toolChoice(event.target.value)
    }

    useEffect(() => {
        const image = document.getElementById("image")
        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = function (e) {
                setImage(e.target?.result)
            }
            reader.readAsDataURL(selectedFile)
        }

        setText(selectedNote.text)
    }, [selectedFile])

    return (
        <div className="h-[60%]">
            <div className="flex items-center gap-4 bg-slate-200 text-slate-900 p-2 rounded-md mt-10 mb-5">
                <div className="flex border border-slate-900">
                    <select
                        className="text-slate-900 text-xs bg-slate-200 cursor-pointer"
                        name="size"
                        id="size"
                        onChange={size}
                    >
                        <option value="paragraphe">Paragraphe</option>
                        <option value="h1">Titre</option>
                        <option value="h2">Sous titre</option>
                    </select>
                </div>
                <Button onClick={() => toolChoice("bold")} icon={<AiOutlineBold />} />
                <Button onClick={() => toolChoice("italic")} icon={<AiOutlineItalic />} />
                <Button onClick={() => toolChoice("underline")} icon={<AiOutlineUnderline />} />
                <Button onClick={() => toolChoice("li")} icon={<AiOutlineOrderedList />} />
                <Button onClick={() => toolChoice("justifyLeft")} icon={<AiOutlineAlignLeft />} />
                <Button
                    onClick={() => toolChoice("justifyCenter")}
                    icon={<AiOutlineAlignCenter />}
                />
                <Button onClick={() => toolChoice("justifyRight")} icon={<AiOutlineAlignRight />} />
                <Button onClick={() => toolChoice("code")} icon={<AiOutlineBgColors />} />
                <Button onClick={() => toolChoice("link")} icon={<AiOutlineLink />} />
            </div>
            <div
                className="focus:outline-none p-2 border rounded-md min-h-full"
                contentEditable
                suppressContentEditableWarning
            >
                {text}
            </div>
            <div className="mt-5">
                <input
                    className="hidden"
                    type="file"
                    id="files"
                    accept=".jpg, .png, .gif"
                    onClick={fileSelectedHandler}
                />
                <label htmlFor="files" className="flex items-center cursor-pointer ml-2">
                    <div className="p-2 bg-slate-900 dark:bg-slate-200 text-slate-200 dark:text-slate-900 rounded-md">
                        <AiOutlineUpload />
                    </div>
                    <span className="ml-2">Ajouter une image</span>
                </label>
                {selectedFile && image && <img src={image as string} />}
            </div>
        </div>
    )
}

export default WYSIWYG
