export function useFormat() {
    const addZeroToId = (id: string, count = 6) => {
        const idLength = id.length;
        if (idLength >= count) {
            return id;
        }
        const otherLength = 6 - idLength;
        let zero = "";
        for (let i = 0; i < otherLength; i++) {
            zero = zero + "0";
        }
        return zero + id;
    };
    return { addZeroToId };
}
