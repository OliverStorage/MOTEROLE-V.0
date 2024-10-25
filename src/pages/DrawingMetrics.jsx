import React, { useRef, useState } from 'react'

const DrawingMetrics = () => {
    const [userImage, setUserImage] = useState(null)
    const [correctImage, setCorrectImage] = useState(null)
    const [metrics, setMetrics] = useState(null)
    const canvasRefUser = useRef(null)
    const canvasRefCorrect = useRef(null)

    const handleImageChange = (event, setImage) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const preprocessImage = (imgSrc, canvasRef) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const img = new Image()

        return new Promise((resolve) => {
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                const imageData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                )
                const binaryMask = new Uint8Array(imageData.data.length / 4)

                for (let i = 0; i < imageData.data.length; i += 4) {
                    // Convert to binary mask: white (255) to 1, black (0) to 0
                    binaryMask[i / 4] = imageData.data[i] > 128 ? 1 : 0 // R channel threshold
                }

                resolve(binaryMask)
            }
            img.src = imgSrc
        })
    }

    const calculateMetrics = (userMask, correctMask) => {
        const intersection = userMask.reduce(
            (acc, val, index) => acc + (val && correctMask[index] ? 1 : 0),
            0,
        )
        const union = userMask.reduce(
            (acc, val, index) => acc + (val || correctMask[index] ? 1 : 0),
            0,
        )

        const iou = intersection / union
        const precision =
            intersection / userMask.reduce((acc, val) => acc + val, 0)
        const recall =
            intersection / correctMask.reduce((acc, val) => acc + val, 0)
        const f1 = (2 * precision * recall) / (precision + recall || 1) // Avoid division by zero

        return { iou, precision, recall, f1 }
    }

    const compareDrawings = async () => {
        const userMask = await preprocessImage(userImage, canvasRefUser)
        const correctMask = await preprocessImage(
            correctImage,
            canvasRefCorrect,
        )

        const metrics = calculateMetrics(userMask, correctMask)
        setMetrics(metrics)
    }

    return (
        <div className="drawing-metrics">
            <h1>Drawing Metrics Comparison</h1>
            <input
                type="file"
                accept="image/png"
                onChange={(e) => handleImageChange(e, setUserImage)}
            />
            {userImage && (
                <canvas ref={canvasRefUser} style={{ display: 'none' }} />
            )}
            <input
                type="file"
                accept="image/png"
                onChange={(e) => handleImageChange(e, setCorrectImage)}
            />
            {correctImage && (
                <canvas ref={canvasRefCorrect} style={{ display: 'none' }} />
            )}
            <button onClick={compareDrawings}>Compare Drawings</button>

            {metrics && (
                <div>
                    <h2>Metrics Results:</h2>
                    <p>IoU: {metrics.iou.toFixed(4)}</p>
                    <p>Precision: {metrics.precision.toFixed(4)}</p>
                    <p>Recall: {metrics.recall.toFixed(4)}</p>
                    <p>F1 Score: {metrics.f1.toFixed(4)}</p>
                </div>
            )}
        </div>
    )
}

export default DrawingMetrics
