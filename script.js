// let notesStore = [
//     {
//         id:1,
//         text: "Test 1"
//     },
//     {
//         id:1,
//         text: "Test 2"
//     }
// ]

// let indexDelete = 1

// let arr = [10, 11, 12];
// let newArr = []
//  arr.map((el, index) => {
//     if(index != indexDelete) {
//         // return el
//         newArr.push(el)
//     }
//     // else {
//     //     return{
//     //             ...el,
//     //             status: "Delete"
//     //     }
//     // }
// })

// console.log(newArr)


// let notesBlock = document.querySelector('.notesBlock');
// let inputText = document.querySelector('#inputText');
// let btnCreate = document.querySelector('.btnCreate')

// let notesStore = []
// let btnsDelete = []

// let generateNotes = () => {
//     notesBlock.innerHTML = ""
//     btnsDelete = []
// if (notesStore.length != 0) {
//     notesStore.map((el, index) => {
//         notesBlock.innerHTML += `
//         <div id ="note${el.id}" class = "note">
//            <p class = "noteText">${el.text}</p>
//            <button class = "noteDelete" id = "btnDelete${el.id}">Delete</button>
//         </div>
//         `
//         btnsDelete.push (  document.querySelector(`#btnDelete${el.id}`))

        
        // document.querySelector(`#btnDelete${el.id}`).addEventListener('click', () => {
        //     // document.querySelector(`#note${el.id}`).innerHTML = ""
        //    notesStore = notesStore.map((el, index) => {
        //         if (index != el.id - 1){
        //             return el
        //         }
        //         else {
        //             return {
        //                 ...el,
        //                 status: "Delete"
        //             }
        //         }
        //     })
        //     console.log(notesStore)
        // })

//       })  
//       for( let i =0; i <= btnsDelete.length-1; i++){
//         btnsDelete[i].onclick = () => {
//             alert(i)
//         }
//       }
//   }
//   console.log (btnsDelete)
// }

// generateNotes()

// let createNote = () => {
//     if ( inputText.value.length != 0) {
//        notesStore.push (
//         {
//             id: notesStore.length>0 ? notesStore[notesStore.length-1].id + 1 : 1,
//             text: inputText.value
//         }
//        )
//        inputText.value = ""
//        generateNotes()
//     }
// } 

// btnCreate.addEventListener('click', createNote);





let notesHtml = document.querySelector('#notes')
let btnPost = document.querySelector('#btnPost')
let inputSearch = document.querySelector('#inputSearch')
let inputs = { 
    title: document.querySelector('#inputTitle'),
    text: document.querySelector('#inputText'),
    color: document.querySelector('#inputColor'),
    clearInput(){
        this.title.value = null
        this.text.value = null
    },

    getInfo() {
        if(this.title.value.length != 0 && this.text.value.length != 0){
            return {
                title: this.title.value,
                text: this.text.value,
                color: this.color.value
            }
        } else { 
            return null
        }
    }
}

let notesStore = [
    {
        id:1,
        title: 'Title 1',
        text: 'Do h/w',
        color: '#FFF',
        timeCreated: {
            hours: 10,
            minutes: 20,
            seconds: 25
        }
    }
]

let btnsDelete = []
let btnsChange = []

let genereteNotes = () => { 
    notesHtml.innerHTML = null
    btnsDelete = [] 
    btnsChange = []
    notesStore.map((el,index) => {
        if(!el.statusDelete){
        notesHtml.innerHTML += `
        <div class="noteBlock" id="note${index}" style="background:${el.color}">
            <h2>${el.title}</h2>
            <p id="noteText${index}">${el.text}</p>
            <p class="time">${el.timeCreated.hours}:${el.timeCreated.minutes}:${el.timeCreated.seconds}</p>
            <button id="btnChange${index}"><img class="icon" src="./edit.svg" alt="change"/></button>
            <button class="btnDelete" id="btnDel${index}">Delete</button>
        </div>
        `     
        }
        //console.log(document.querySelector(`#note${index}`))  
      
    })
    
    for(let i=0;i<=notesStore.length-1;i++){
        if(!notesStore[i].statusDelete){
            btnsDelete[i] = document.querySelector(`#btnDel${i}`)
            btnsDelete[i].addEventListener('click', () => { 
                notesStore[i].statusDelete = true
                genereteNotes()
            })
            
            btnsChange[i] = document.querySelector(`#btnChange${i}`)
            btnsChange[i].addEventListener('click', () => {
                document.querySelector(`#note${i}`).innerHTML = `
                <textarea id="changeTitle${i}" placeholder="Write new text"></textarea>
                <textarea id="change${i}" placeholder="Write new title"></textarea>
                <p class="time">${notesStore[i].timeCreated.hours}:${notesStore[i].timeCreated.minutes}:${notesStore[i].timeCreated.seconds}</p>
                <button id="btnSave${i}"><img class="icon" src="./save.svg" alt="change"/></button>
                <button class="btnDelete" id="btnDel${i}">Delete</button>
                `
                document.querySelector(`#btnSave${i}`).addEventListener('click', () => {
                    let inputChange = { 
                        title: document.querySelector(`#change${i}`),
                        text: document.querySelector(`#changeTitle${i}`)
                    }
                    if (inputChange.title.value.length != 0){
                        notesStore[i].text = inputChange.text.value
                    }
                    if (inputChange.text.value.length !=0) {
                        notesStore[i].title = inputChange.title.value
                    }
                    genereteNotes()
                })
            })
        }
    }
}
let getCurrentTime = () => {
    let time = new Date ()
    return{
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds()
    }
}

let checkTimeFormst = (time) => {
    if(time.hours<10){
        time.hours = '0'+time.hours
    }
    if(time.minutes<10){
        time.minutes = '0'+time.minutes
    }
    if(time.seconds<10){
        time.seconds = '0'+time.seconds
    }
    return time
}

let btnPostClick = () => { 
      let timeNow = checkTimeFormst(getCurrentTime())
    // console.log(inputs.color.value)
    //console.log(inputs.getInfo() ? inputs.getInfo() : "Write input")
    if(inputs.getInfo()) { 
        notesStore = [
            ...notesStore, 
            {   
                id: notesStore.length+1,
                title: inputs.getInfo().title,
                text: inputs.getInfo().text,
                color: inputs.getInfo().color,
                timeCreated: {
                    ...timeNow
                }
            }
        ]
        // console.log(notesStore)
        inputs.clearInput()
        genereteNotes()
    } else { 
        alert("Pls, write title or text")
    }
}

genereteNotes()

let genereteNotesSearch = (notes) => { 
    notesHtml.innerHTML = null
    notes.map((el,index) => {
        if(!el.statusDelete){
        notesHtml.innerHTML += `
        <div class="noteBlock" id="note${index}" style="background:${el.color}">
            <h2>${el.title}</h2>
            <p id="noteText${index}">${el.text}</p>
            <p class="time">${el.timeCreated.hours}:${el.timeCreated.minutes}:${el.timeCreated.seconds}</p>
        </div>
        `     
        }
    })
}

let startSearch = () => {
    if(inputSearch.value.length != 0){
        notesHtml.innerHTML = null
        let notesStoreToSearch = []
        notesStore.map((el) => {
            if (!el.statusDelete){
                notesStoreToSearch.push(el.text)
            }
        })
        let resultSearch = searchText(inputSearch.value, notesStoreToSearch, notesStore)
        if(resultSearch.length == 0) { 
            notesStoreToSearch = []
            notesStore.map((el) => {
                if (!el.statusDelete){
                    notesStoreToSearch.push(el.title)
                }
            })
            resultSearch = searchText(inputSearch.value, notesStoreToSearch, notesStore)
        } 
        genereteNotesSearch(resultSearch)
    } else {
        genereteNotes()
    }
}

inputSearch.addEventListener('change', startSearch )
btnPost.addEventListener('click', btnPostClick)