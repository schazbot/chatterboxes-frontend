const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json"
};


const get = (url) => {
  return fetch(url).then(resp => resp.json())
}

const post = (url, id, data) => {
  return fetch(`${url}${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
}


const destroy = (url, id) => {
  return fetch(`${url}${id}`, {
    method: "DELETE"
  }).then(resp => resp.json())
}

const patch = (url, id, picData) => {
  return fetch(`${url}${id}`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(picData)
  })
}



export default {get, post, destroy, patch}