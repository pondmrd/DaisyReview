'use client'
import { FC, useState, ChangeEvent } from "react"
import { supabase } from '@/config/supabaseClient'

interface ModalProps {
    locationId: number,
    isOpen: boolean,
    onClose: () => void
}


const Modal: FC<ModalProps> = ({ locationId, isOpen, onClose }) => {
    if (!isOpen) {
        return null
    }
    const [comment, setComment] = useState<string>("")
    const [actionBy, setActionBy] = useState<string>("")

    const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const handleChangeActionBy = (e: ChangeEvent<HTMLInputElement>) => {
        setActionBy(e.target.value)
    }

    const saveComment = async () => {
        if (!comment.trim() && !actionBy.trim()) return;
        const { error } = await supabase.from("Review").insert([{ location_id: locationId, comment: comment, created_by: actionBy, created_date: new Date(), modified_date: new Date() }]);
        if (error) console.error(error);

        onClose()
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-4xl">
                <div className="flex justify-between items-center mb-4">
                    <p></p>
                    <h3 className="font-bold text-lg">Review</h3>
                    <button className="btn btn-circle" onClick={onClose}>X</button>
                </div>
                <div>
                    <div className="grid grid-cols-24 mb-4">
                        <div className="col-span-3"><p >Comment:</p></div>
                        <div className="col-span-21">
                            <textarea
                                className="textarea w-full"
                                placeholder=""
                                value={comment}
                                onChange={handleChangeComment}>

                            </textarea>
                        </div>
                    </div>
                    <div className="grid grid-cols-24 mb-4">
                        <div className="col-span-3"><p>By: </p></div>
                        <div className="col-span-21">
                            <input
                                className="input w-full"
                                type="text"
                                placeholder="Type your name"
                                value={actionBy}
                                onChange={handleChangeActionBy}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-info" onClick={saveComment}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal