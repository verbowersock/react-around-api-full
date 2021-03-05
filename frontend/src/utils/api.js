class Api {
    constructor (options) {
        this.url = options.baseUrl;
    }


getInitialCards(token) {
    return fetch(this.url+"/cards", {
        headers:{
            authorization: "Bearer " + token,
        }
    })
    .then(res=> {
        if (res.ok) {

            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

getUserInfo(token){
    return fetch(this.url+"/users/me", {
        headers:{
            authorization: "Bearer " + token,
        }
    })
    .then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

updateUserInfo(newInfo, token){
    return fetch(this.url+"/users/me", {
        method: "PATCH",
        headers:{
            authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newInfo.name,
            about: newInfo.about
        })
    })
    .then(res=> {
            if (res.ok) {
               
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`)
        })
    }

postNewCard(newCard, token) {
        return fetch(this.url+"/cards", {
            method: "POST",
            headers:{
                authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: newCard.title,
                link: newCard.url
            })
        })
        .then(res=> {
                if (res.ok) {
                   
                    return res.json()
                }
                return Promise.reject(`Error: ${res.status}`)
            })
    
}    

deleteCard(id, token)    {
    return fetch(this.url+"/cards"+ "/" + id, {
    method: "DELETE",
    headers:{
            authorization: "Bearer " + token,
        "Content-Type": "application/json"
    },
})
.then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })

}    

addLike(id, isLiked, token) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(this.url+"/cards/"+id+"/likes", {
        method: method,
        headers:{
            authorization: "Bearer " + token
        }
    })
    .then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

updateAvatar(avatarUrl, token) {
    return fetch(this.url+"/users/me/avatar", {
        method: "PATCH",
        headers:{
            authorization: "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar:avatarUrl
        })
        
    })
    .then(res=> {
            if (res.ok) {
               
                return res.json()
            }
            return Promise.reject(`Error: ${res.status}`)
        })
}     

}    

export const api = new Api({
    baseUrl: "https://api.vkaround.students.nomoreparties.site",
// baseUrl:"http://localhost:3000"
    }
  );



