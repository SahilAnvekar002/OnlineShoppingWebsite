export const url = "http://localhost:5000/api"

export const postRequest = async(url, data) =>{
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
    })

    const json = await response.json()

    if(response?.ok){
        return json;
    }
    else{
        return {error: true, message : json}
    }
}

export const getRequest = async(url) =>{
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          }
    })

    const json = await response.json()

    if(response?.ok){
        return json;
    }
    else{
        return {error: true, message : json}
    }
}

export const deleteRequest = async(url) =>{
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
          }
    })

    const json = await response.json()

    if(response?.ok){
        return json;
    }
    else{
        return {error: true, message : json}
    }
}

