export const getToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const milli = today.getMilliseconds();
    return `${dd + "_" + mm + "_" + yyyy + "_" + milli}`;
};
