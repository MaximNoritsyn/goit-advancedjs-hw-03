import { fetchBreeds, fetchCatByBreed } from './js/cat-api'

const selectors = {
    breeds: document.querySelector('select.breed-select'),
    catInfo: document.querySelector('div.cat-info'),
    loader: document.querySelector('p.loader'),
    error: document.querySelector('p.error')
}

// markups

function markupBreedOption(breeds) {
    return breeds.map(
        breed => `<option value="${breed.id}">${breed.name}</option>`
    ).join('')
}

function markupCatInfo(cat) {
    return `
        <h2>${cat.breeds[0].name}</h2>
        <img src="${cat.url}" alt="${cat.breeds[0].name}" width="200px">
        <p>${cat.breeds[0].description}</p>
    `
}


// functions
function loadingStatus(isLoading) {
    if (isLoading) {
        selectors.loader.classList.remove('hidden')
        selectors.breeds.classList.add('hidden')
    } else {
        selectors.loader.classList.add('hidden')
        selectors.breeds.classList.remove('hidden')
    }
}

function errorStatus(isError) {
    if (isError) {
        selectors.error.classList.remove('hidden')
    } else {
        selectors.error.classList.add('hidden')
    }
}


// event handlers
function handleBreedChange(event) {
    const breedId = event.target.value
    selectors.catInfo.innerHTML = ''
    loadingStatus(true)
    fetchCatByBreed(breedId).then(
        data => {
            loadingStatus(false)
            selectors.catInfo.innerHTML = markupCatInfo(data[0])
        }
    )
    .catch(
        error => {
            console.error(error)
            loadingStatus(false)
            errorStatus(true)
        }
    )

}


// main code

loadingStatus(false)
errorStatus(false)

fetchBreeds()
    .then(
        data => {
            selectors.breeds.innerHTML = markupBreedOption(data)
        }
    )
    .catch(
        error => {
            console.error(error)
            errorStatus(true)
        }
    )

selectors.breeds.addEventListener('change', handleBreedChange)