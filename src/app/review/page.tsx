'use client'
import React, { useState, useEffect } from "react"
import { supabase } from '@/config/supabaseClient'

import Navbar from "@/components/Navbar"
import Card from "@/components/Review/Card"
import AddReviewModal from "@/components/Review/AddReviewModal"
import WatchReviewModal from "@/components/Review/WatchReviewModal"

interface Location {
    id: number,
    title: string,
    description: string,
    image: string
}

const Review = () => {
    const [isOpenWatchReviewModal, setIsOpenWatchReviewModal] = useState(false)
    const handleOpenWatchReviewModal = (locationId: number) => {
        setIsOpenWatchReviewModal(true)
        setLocationId(locationId)
    }
    const handleCloseWatchReviewModal = () => {
        setIsOpenWatchReviewModal(false)
    }

    const [isOpenAddReviewModal, setIsOpenAddReviewModal] = useState(false)
    const handleOpenAddReviewModal = (locationId: number) => {
        setIsOpenAddReviewModal(true)
        setLocationId(locationId)
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

    return (
        <div>
            <Navbar />
            <div className="w-5xl mx-auto flex flex-wrap justify-items-stretch gap-4 mt-4">
                {locationList.map(item => (
                    <Card key={item.id} locationId={item.id} handleOpenWatchReviewModal={handleOpenWatchReviewModal} handleOpenAddReviewModal={handleOpenAddReviewModal} title={item.title} image={item.image} description={item.description} />
                ))}
            </div>
            <WatchReviewModal locationId={locationId} isOpen={isOpenWatchReviewModal} onClose={handleCloseWatchReviewModal} />
            <AddReviewModal locationId={locationId} isOpen={isOpenAddReviewModal} onClose={handleCloseAddReviewModal} />
        </div>
    )
}

export default Review