export const getAllSerialNumbers = () => {
    return fetch('http://localhost:8080/serials')
    .then(res => res.json())
    .then((data) => {
        return data;
    }).catch((error) => {
        return error
    });
}

export const getDataBySerialNumber = (serialNumber: string) => {
    const url = `http://localhost:8080/serials/${serialNumber}/metrics`;
    return fetch(url)
    .then(res => res.json())
    .then((data) => {
        return data
    })
    .catch((error) => {
        console.log(error)
        throw new Error(error)
    });;
}