
exports.Login = (objectRequest) => {
    return new Promise((resolve, reject) => {
        fetch('http://http://ec2-18-204-229-11.compute-1.amazonaws.com:8080/login', {
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
        fetch('http://http://ec2-18-204-229-11.compute-1.amazonaws.com:8080/environment', {
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

exports.EnvironmentById = (token, uuid) => {
    return new Promise((resolve, reject) => {
        fetch('http://http://ec2-18-204-229-11.compute-1.amazonaws.com:8080/environment/' + uuid, {
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

exports.AddEnvironments = (token, env) => {
    return new Promise((resolve, reject) => {
        fetch('http://http://ec2-18-204-229-11.compute-1.amazonaws.com:8080/environment', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(env)
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
    })
}

exports.Schedules = (token, id) => {
    return new Promise((resolve, reject) => {
        fetch('http://http://ec2-18-204-229-11.compute-1.amazonaws.com:8080/environment/' + id + '/schedule', {
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

exports.AddSchedules = (token, id, schedule) => {
    return new Promise((resolve, reject) => {
        fetch('http://http://ec2-18-204-229-11.compute-1.amazonaws.com:8080/environment/' + id + '/schedule', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schedule)
        })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err))
    })
}

exports.RemoveSchedules = (token, id) => {
    return new Promise((resolve, reject) => {
        fetch('http://http://ec2-18-204-229-11.compute-1.amazonaws.com:8080/schedule/' + id, {
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