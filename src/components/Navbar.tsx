import React, { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { CgSmileSad } from "react-icons/cg"

import { IFolder } from "../types/IFolder"
import { INote } from "../types/INote"

import Header from "./Header"
import SortNotes from "./SortNotes"
import FolderItem from "./FolderItem"
import CreateInput from "./CreateInput"
import ProfileCard from "./ProfileCard"
import SearchBar from "./SearchBar"
import NoteItem from "./NoteItem"

import { useAppSelector } from "../store"

const Navbar: React.FC = () => {
    const { id, isPremium } = useAppSelector(state => state.user)
    const { folders } = useAppSelector(state => state.folders)
    const { notesDisplay } = useAppSelector(state => state.notes)

    const [isNewFolder, setIsNewFolder] = useState(false)
    const [search, setSearch] = useState("")
    const [filtredNotes, setFiltredNote] = useState<INote[]>()

    useEffect(() => {
        setFiltredNote(notesDisplay?.filter((note: INote) => note.title?.includes(search)))
    }, [search])

    return (
        <nav className="p-2 max-w-xs flex flex-col justify-between bg-blue-500 dark:bg-blue-900">
            <Header isPremium={isPremium} displayNewFolder={setIsNewFolder} />
            <SearchBar search={search} setSearch={setSearch} />
            {search.length > 0 ? (
                <div className="flex flex-col flex-1">
                    <div className="text-slate-50">
                        <div className="flex flex-col">
                            {filtredNotes!.length > 0 ? (
                                filtredNotes?.map((note: INote) => (
                                    <NoteItem key={note._id} title={note.title} noteId={note._id} />
                                ))
                            ) : (
                                <div className="flex items-center gap-1 justify-center">
                                    Aucune note trouvée <CgSmileSad size="20px" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <SortNotes />
                    <div className="flex flex-col flex-1">
                        <div className="text-slate-50">
                            <div className="flex flex-col">
                                {folders?.map((folder: IFolder) => {
                                    if (!folder.parentId) {
                                        return (
                                            <FolderItem
                                                title={folder.title}
                                                folders={folders}
                                                folderId={folder._id}
                                                key={folder._id}
                                                notes={notesDisplay}
                                            />
                                        )
                                    } else {
                                        return
                                    }
                                })}
                            </div>
                        </div>
                        <CreateInput
                            isNewFolder={isNewFolder}
                            setIsNewFolder={setIsNewFolder}
                            userId={id}
                        />
                    </div>
                </>
            )}
            <ProfileCard />
        </nav>
    )
}

export default Navbar
