
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

exports.Environments = (token) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/environment', {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
    })
}

exports.Schedules = (token, id) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/environment/' + id + '/schedule', {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
    })
}

exports.RemoveSchedules = (token, id) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/schedule/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
            }
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
    })
}