export const useUtils = () => {
    const convertBytesToMB = (bytes: number): number => {
        return (bytes / 1024 / 1024);
    };

    const percentReduction = (originalSize: number, reducedSize: number): number => {
        return (reducedSize / originalSize) * 100;
    }

    return {
        convertBytesToMB,
        percentReduction
    }
}