'use client'
import { FC } from "react"
import { supabase } from '@/config/supabaseClient'

interface PanelProps {
    comment: Comment,
    fetchCommetList: () => void
}

interface Comment {
    id: number,
    location_id: number,
    comment: string,
    created_by: string,
    created_date: Date,
    modified_date: Date
}

const Panel: FC<PanelProps> = ({ comment, fetchCommetList }) => {

    const deleteComment = async () => {
        const { error } = await supabase.from("Review").delete().eq("id", comment.id);
        if (error) console.error(error);
        else {
            fetchCommetList()
        }
    }

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="list-row">
                <div><img className="size-10 rounded-box" src="/qoobee.jpg" /></div>
                <div>
                    <div>{comment.created_by}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">Guest</div>
                </div>
                <p className="list-col-wrap text-xs">
                    {comment.comment}
                </p>
                <button className="btn btn-dash btn-error" onClick={deleteComment}>
                    remove
                </button>
            </li>
        </ul>
    )
}

export default Panel