export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

export const areArraysEqual = (array1, array2) => {
    return (
        Array.isArray(array1) &&
        Array.isArray(array2) &&
        array1.length == array2.length &&
        array1.every((val, index) => val === array2[index])
    )
}