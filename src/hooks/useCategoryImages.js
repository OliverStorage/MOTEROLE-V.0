// hooks/useCategoryImages.js
import { useState, useEffect } from 'react'
import { loadImages } from '../utils/imageLoader'

const useCategoryImages = (category, items, difficulty) => {
    const [images, setImages] = useState({})

    useEffect(() => {
        const fetchImages = async () => {
            const imagePromises = items.map((item) =>
                loadImages(category, item, difficulty),
            )
            const resolvedImages = await Promise.all(imagePromises)
            const imageMap = resolvedImages.reduce((acc, img, index) => {
                acc[items[index]] = img
                return acc
            }, {})
            setImages(imageMap)
        }
        fetchImages()
    }, [category, items, difficulty])

    return images
}

export default useCategoryImages
