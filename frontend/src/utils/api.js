class Api {
    constructor (options) {
        this.url = options.baseUrl;
        this.authorization = options.authorization;
    }


getInitialCards() {
    return fetch(this.url+"cards", {
        headers: {
            authorization: this.authorization
        }
    })
    .then(res=> {
        if (res.ok) {

            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

getUserInfo(){
    return fetch(this.url+"users/me", {
        headers:{
            authorization: this.authorization
        }
    })
    .then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

updateUserInfo(newInfo){
    return fetch(this.url+"users/me", {
        method: "PATCH",
        headers: {
            authorization: this.authorization,
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

postNewCard(newCard) {
        return fetch(this.url+"cards", {
            method: "POST",
            headers: {
                authorization: this.authorization,
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

deleteCard(id)    {
    return fetch(this.url+"cards"+ "/" + id, {
    method: "DELETE",
    headers: {
        authorization: this.authorization,
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

addLike(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(this.url+"cards/likes/"+id, {
        method: method,
        headers:{
            authorization: this.authorization
        }
    })
    .then(res=> {
        if (res.ok) {
           
            return res.json()
        }
        return Promise.reject(`Error: ${res.status}`)
    })
    }

updateAvatar(avatarUrl) {
    return fetch(this.url+"users/me/avatar", {
        method: "PATCH",
        headers: {
            authorization: this.authorization,
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
    baseUrl: "https://around.nomoreparties.co/v1/group-5/",
    authorization: "c3db06be-da70-4990-b8ca-8515a1d7c281",     
    }
  );



