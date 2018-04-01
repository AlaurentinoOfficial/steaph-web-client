
exports.Login = (objectRequest) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectRequest)
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
    })
}