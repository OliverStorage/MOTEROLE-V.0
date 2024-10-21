// utils/imageLoader.js
export const loadImages = async (type, item, difficulty) => {
    try {
        const [bgImage, itemImage] = await Promise.all([
            import(`../assets/${type}bg/${item}_${difficulty}.png`),
            import(`../assets/${type}img/${item}_${difficulty}.png`),
        ])
        return {
            bgImage: bgImage.default,
            itemImage: itemImage.default,
        }
    } catch (err) {
        console.error(
            `Error loading images for ${item} at ${difficulty} level:`,
            err,
        )
        return { bgImage: null, itemImage: null }
    }
}
