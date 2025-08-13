'use client'
import React, { useState, useEffect, ChangeEvent } from "react"
import Image from "next/image";
import { supabase } from '@/config/supabaseClient'

import Navbar from "@/components/Navbar"

interface Location {
    id: number,
    title: string,
    description: string,
    image: string
}

interface Comment {
    id: number,
    location_id: number,
    comment: string,
    created_by: string,
    created_date: Date,
    modified_date: Date,
    isStillEdit: boolean | false,
}

const Review = () => {
    const [isOpenWatchReviewModal, setIsOpenWatchReviewModal] = useState(false)
    const handleOpenWatchReviewModal = (location_Id: number) => {
        setIsOpenWatchReviewModal(true)
        setLocationId(location_Id)
    }
    const handleCloseWatchReviewModal = () => {
        setIsOpenWatchReviewModal(false)
    }

    const [isOpenAddReviewModal, setIsOpenAddReviewModal] = useState(false)
    const handleOpenAddReviewModal = (location_Id: number) => {
        setIsOpenAddReviewModal(true)
        setLocationId(location_Id)
        setComment("")
        setActionBy("")
        setValidateMsg("")
    }
    const handleCloseAddReviewModal = () => {
        setIsOpenAddReviewModal(false)
    }

    const [locationList, setLocationList] = useState<Location[]>([])
    const fetchLocation = async () => {
        const { data, error } = await supabase.from("Location").select("*").order("id");
        if (error) {
            console.error(error);
        } else {
            setLocationList(data);
            console.log(data)
        }
    }
    useEffect(() => {
        fetchLocation()
    }, [])

    const [locationId, setLocationId] = useState<number>(0)
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
        if (isOpenWatchReviewModal) {
            fetchCommetList()
        }
    }, [isOpenWatchReviewModal])


    const [comment, setComment] = useState<string>("")
    const [actionBy, setActionBy] = useState<string>("")
    const [validateMsg, setValidateMsg] = useState<string>("")

    const handleChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const handleChangeActionBy = (e: ChangeEvent<HTMLInputElement>) => {
        setActionBy(e.target.value)
    }

    const saveComment = async () => {
        if (!comment || !comment.trim() || !actionBy || !actionBy.trim()) {
            setValidateMsg("Please input comment or name.")
            return
        }
        const { error } = await supabase.from("Review").insert([{ location_id: locationId, comment: comment, created_by: actionBy, created_date: new Date(), modified_date: new Date() }]);
        if (error) console.error(error);

        handleCloseAddReviewModal()
        setComment("")
        setActionBy("")
    }

    const deleteComment = async (id: number) => {
        const { error } = await supabase.from("Review").delete().eq("id", id);
        if (error) console.error(error);
        else {
            fetchCommetList()
        }
    }

    const handleChangeNewComment = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let newArr = [...commentList]
        newArr[index].comment = e.target.value
        setCommentList(newArr)
    }

    const editComment = (index: number) => {
        let newArr = [...commentList]
        newArr[index].isStillEdit = true
        setCommentList(newArr)
    }

    const saveEditedComment = async (index: number) => {
        let newComment: string = commentList[index].comment

        const { error } = await supabase
            .from('Review')
            .update({ comment: newComment })
            .eq('id', commentList[index].id);

        if (!error){
            fetchCommetList()
        }else {
            console.log(error)
        }
    }


    return (
        <div className="relative">
            <Navbar />
            <div className="relative w-xl md:w-3xl lg:w-5xl mx-auto flex flex-wrap justify-items-stretch gap-4 mt-4 mb-4">
                {locationList.map(item => (
                    <div key={item.id}>
                        <div className="card bg-base-100 w-60 shadow-sm border-1 border-dashed">
                            <figure style={{ position: "relative", width: "100%", height: "170px" }}>
                                <Image src={item.image} alt="f" layout="fill" objectFit="content" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.description?.substr(0, 45)}...</p>
                                <div className="card-actions justify-end mt-6">
                                    <button className="btn btn-xs btn-secondary" onClick={() => handleOpenWatchReviewModal(item.id)}>Watch Review</button>
                                    <button className="btn btn-xs btn-primary" onClick={() => handleOpenAddReviewModal(item.id)}>Review</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                isOpenWatchReviewModal ? <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-5xl min-h-100 p-0 max-h-100" >
                        <div className="flex justify-between items-center sticky top-0 z-1 bg-white p-5 pb-0">
                            <p></p>
                            <h3 className="font-bold text-lg">Watch Review</h3>
                            <button className="btn btn-circle" onClick={handleCloseWatchReviewModal}>X</button>
                        </div>

                        <div className="p-5">
                            {commentList.map((item, index) => (
                                <ul className="list bg-base-100 rounded-box shadow-md" key={item.id}>
                                    <li className="list-row">
                                        <div><img className="size-10 rounded-box" src="/qoobee.jpg" /></div>
                                        <div>
                                            <div>{item.created_by}</div>
                                            <div className="text-xs uppercase font-semibold opacity-60">Guest</div>
                                            <br />
                                            {
                                                item.isStillEdit ?
                                                    <input type="text" className="input" placeholder=""
                                                        defaultValue={item.comment}
                                                        value={item.comment}
                                                        onChange={(e) => handleChangeNewComment(e, index)}
                                                    /> :
                                                    <p className="list-col-wrap text-xs">
                                                        {item.comment}
                                                    </p>
                                            }
                                        </div>

                                        {
                                            item.isStillEdit ?
                                                <button className="btn btn-dash btn-secondary" onClick={() => saveEditedComment(index)}>
                                                    save
                                                </button> :
                                                <>
                                                    <button className="btn btn-dash btn-info" onClick={() => editComment(index)}>
                                                        edit
                                                    </button>
                                                    <button className="btn btn-dash btn-error" onClick={() => deleteComment(item.id)}>
                                                        remove
                                                    </button>
                                                </>
                                        }
                                    </li>
                                </ul>
                            ))}

                        </div>
                    </div>
                </div> : null
            }
            {
                isOpenAddReviewModal ?
                    <div className="modal modal-open">
                        <div className="modal-box w-11/12 max-w-4xl">
                            <div className="flex justify-between items-center mb-4">
                                <p></p>
                                <h3 className="font-bold text-lg">Review</h3>
                                <button className="btn btn-circle" onClick={handleCloseAddReviewModal}>X</button>
                            </div>
                            <div>
                                <div className="grid grid-cols-24 mb-4">
                                    <div className="md:col-span-3 col-span-24"><p >Comment:</p></div>
                                    <div className="md:col-span-21 col-span-24">
                                        <textarea
                                            className="textarea w-full"
                                            placeholder=""
                                            value={comment}
                                            onChange={handleChangeComment}>

                                        </textarea>
                                    </div>
                                </div>
                                <div className="grid grid-cols-24 mb-4">
                                    <div className="md:col-span-3 col-span-24"><p>By: </p></div>
                                    <div className="md:col-span-21 col-span-24">
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
                                <form method="dialog" className="flex items-center gap-4">
                                    <p className="text-red-400">{validateMsg}</p>
                                    <button className="btn btn-info" onClick={saveComment}>Save</button>
                                </form>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default Review