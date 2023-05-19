
fetch("http://localhost:3000/breweries")
.then((res) => res.json())
.then(data => displayBreweries(data))

function displayBreweries(breweries) {
    const container = document.getElementById('beer-container')
    breweries.forEach((brewery) =>{
        const breweryList = breweryCard(brewery)
        container.append(breweryList)
    })
}

function breweryCard(brewery) {
    const div = document.createElement('div')
    div.className = "brewery-card"
    const name = document.createElement('h2')
    // const website = document.createElement('a')
    const image = document.createElement('img')
    image.className = "brewery-image"
    const location = document.createElement('h4')

    name.textContent = brewery.name
    // website.setAttribute('href', '#')
    // website.textContent = brewery.website_url
    location.textContent = `${brewery.city}, ${brewery.state}`
    image.src = brewery.image

    div.append(name, image, location)
    return div
}

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const breweryData = {
        name: e.target.name.value,
        image: e.target.image.value,
        location: e.target.location.value,
    }
    fetch(' http://localhost:3000/breweries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(breweryData) 
    })
    .then(res => res.json())
    .then(newBrewery => {
        document.getElementById('beer-container').append(
            displayBreweries(newBrewery))
    });
    form.reset
})