'use client'
import { FC, useState, useEffect } from "react"
import { supabase } from '@/config/supabaseClient'

import CommentPanel from "./CommentPanel"

interface ModalProps {
    locationId: number,
    isOpen: boolean,
    onClose: () => void
}

interface Comment {
    id: number,
    location_id: number,
    comment: string,
    created_by: string,
    created_date: Date,
    modified_date: Date
}

const Modal: FC<ModalProps> = ({ locationId, isOpen, onClose }) => {

    const [commentList, setCommentList] = useState<Comment[]>([])

    const fetchCommetList = async () => {
        const { data, error } = await supabase.from("Review").select("*").eq("location_id", locationId).order("id");

        if (error) {
            console.error(error);
        } else {
            setCommentList(data)
            console.log(data)
        }
    }


    useEffect(() => {
        if (isOpen) {
            fetchCommetList()
        }

    }, [isOpen])

    if (isOpen) {
        return (
            <div className={"modal modal-open"}>
                <div className="modal-box w-11/12 max-w-5xl">
                    <div className="flex justify-between items-center">
                        <p></p>
                        <h3 className="font-bold text-lg">Watch Review</h3>
                        <button className="btn btn-circle" onClick={onClose}>X</button>
                    </div>

                    <div>
                        {commentList.map(item => (
                            <CommentPanel key={item.id} comment={item} fetchCommetList={fetchCommetList}/>
                        ))}

                    </div>
                </div>
            </div>
        )
    }
}

export default Modal