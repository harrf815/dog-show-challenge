document.addEventListener('DOMContentLoaded', () => {
    getDogs()

    let form = document.getElementById('dog-form')
    form.addEventListener('submit', handleSubmit)

    //! Get the data from the api
    function getDogs(){
        fetch('http://localhost:3000/dogs')
            .then(res => res.json())
            // .then(dogs => dogs.forEach(dog => renderDog(dog)))
            .then(dogs => {
                let tbody = document.querySelector('#table-body')
                tbody.innerHTML = ''
                dogs.forEach(dog => renderDog(dog))
            })
    }

    //! Editing the data 
    function editDog(newDog){
        // console.log(newDog)
        fetch(`http://localhost:3000/dogs/${newDog.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(newDog)
        })
        .then(res => res.json())
        // .then(dog =>{
        //     // console.log(dog)
        //     let tr = document.getElementById(dog.id)
        //     // console.log(tr)
        //     tr.remove()
        //     renderDog(dog)
        
        // })
        .then(() => getDogs())
    }

    //! Handle the submit button 
    function handleSubmit(e){
        e.preventDefault()
        let newDog ={
            name: form.name.value,
            breed: form.breed.value,
            sex: form.sex.value,
            id: e.target.dataset.id  
        }
        editDog(newDog)
    }

    //! Handle the edit button 
    function handleEdit(dog){
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
        form.dataset.id = dog.id 
    }

    //! Create a table with all the dogs 
        function renderDog(dog){
            // console.log(dog)

            //! Need to locate an element to place the table 
            tbody = document.getElementById('table-body')

            //! Need to create elements
            let tr = document.createElement('tr')
    
            let name = document.createElement('td')
            let breed = document.createElement('td')
            let sex = document.createElement('td')
            let edit = document.createElement('td')
            let button = document.createElement('button')
          
            //! Assign class, id, and innerText to elements 
            tr.id = dog.id
            name.innerText = dog.name
            breed.innerText = dog.breed
            sex.innerText = dog.sex
            button.innerText = "Edit Dog"

            //! Event Listeners
            button.addEventListener('click', () => handleEdit(dog))

            //! Append 
            edit.appendChild(button)
            tr.append(name, breed, sex, edit)
            tbody.appendChild(tr)
        }




    // getDogs()
    
    // form.document.getElementById('dog-form')
    // form.addEventListener('submit', editDog)
    
    // function getDogs(){
    //     fetch('http://localhost:3000/dogs')
    //     .then(res => res.json())
    //     .then(dogs => dogs.forEach(dog => renderDog(dog)))
    // }
    
    // function editDog(e){
    //     e.preventDefault()
        
    //     let id = e.target.dataset.id
    //     let newDog ={
    //         name: form.name.value,
    //         breed: form.breed.value,
    //         sex: form.sex.value
    //     }
        
    //     fetch(`http://localhost:3000/dogs/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json'
    //         },
    //         body: JSON.stringify(newDog)
    //     })
    //     .then(res => res.json())
    //     .then(dog => {
    //         const oldRow = document.getElementById(dog.id)
    //         oldRow.remove()
    //         renderDog(dog)
    //     })
    // }
    
    // function renderDog(dog){
        
    //     let tbody = document.getElementById('table-body')
        
    //     let tr = document.createElement('tr')
    //     let tr = dog.id
    //     let name = document.createElement('td')
    //     let breed = document.createElement('td')
    //     let sex = document.createElement('td')
    //     let edit = document.createElement('td')
    //     let button = document.createElement('button')
        
    //     button.innerText = 'Edit Dog'
    //     name.innerText = dog.name
    //     breed.innerText = dog.breed
    //     sex.innerText = dog.sex 
        
    //     button.addEventListener('click', () => handleEdit(dog))
        
    //     edit.appendChild(button)
    //     tr.append(name, breed, sex, edit)
    //     tbody.appendChild(tr)
        
    // }
    
    // function handleEdit(dog){
    //     form.name.value = dog.name
    //     form.breed.value = dog.breed
    //     form.sex.value = dog.sex
    //     form.dataset.id = dog.id 
    // }
    
})