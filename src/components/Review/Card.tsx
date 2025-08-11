'use client'
import { FC, useState } from "react";
import Image from "next/image";

interface CardProps {
    locationId: number,
    image: string,
    title: string;
    description?: string;
    handleOpenWatchReviewModal: (locationId: number) => void,
    handleOpenAddReviewModal: (locationId: number) => void,
}

const Card: FC<CardProps> = ({ locationId, image, title, description, handleOpenWatchReviewModal, handleOpenAddReviewModal }) => {
    return (
        <div>
            <div className="card bg-base-100 w-60 shadow-sm border-1 border-dashed">
                <figure style={{ position: "relative", width: "100%", height: "170px" }}>
                    {/* <img
                        src={image}
                        alt="Shoes"
                        width="300px"
                        height="300px"
                    /> */}
                    <Image src={image} alt="f" layout="fill" objectFit="content" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description?.substr(0, 45)}...</p>
                    <div className="card-actions justify-end mt-6">
                        <button className="btn btn-xs btn-secondary" onClick={() => handleOpenWatchReviewModal(locationId)}>Watch Review</button>
                        <button className="btn btn-xs btn-primary" onClick={() => handleOpenAddReviewModal(locationId)}>Review</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card