export const Data = (num: number) => {
    const data = [];
    for (let i = 1; i < num + 1; i++) {
        const obj = {
            name: i
        };
        data.push(obj);
    }
    return data;
};
