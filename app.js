// display block,none property
const toggleShow = (id, displyStyle) => {
  document.getElementById(id).style.display = displyStyle;

}
const searchFieldText = (id) => {
  const searchField = document.getElementById(id);
  const searchText = searchField.value;
  searchField.value = '';
  return searchText;
}

// getting input key and create dynamic api 
const searchPhone = () => {
  const searchText = searchFieldText('search-field');
  toggleShow('phone-details', 'none')
  toggleShow('spinner', 'block');
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(phone => {

      // Error handling---------------->
      if (phone.data == 0) {
        toggleShow('error', 'block');
        toggleShow('spinner', 'none');
        toggleShow('phone-details', 'none')
        const displaySearchResult = document.getElementById('search-result');
        displaySearchResult.textContent = '';

      } else {

        toggleShow('error', 'none');

        displayAllPhone(phone.data);

      }
    })
}

// Display all result after searching by a name 
const displayAllPhone = info => {

  const displaySearchResult = document.getElementById('search-result');
  displaySearchResult.textContent = '';

  if (info.length > 20) {
    // console.log(info.length);


    const datas = info.slice(0, 20)

    datas.forEach(data => {
      // document.getElementById('show-more').style.display='block';

      const div = document.createElement('div');
      div.classList.add('col', 'shadow', 'p-3')
      div.innerHTML = `
    <div class="card h-100 bg-secondary shadow">
    <img src="${data.image?data.image:'Not available'}" class="card-img-top w-75  h-75 mx-auto rounded" alt="...">
    <div class="card-body">
      <h5 class="card-title text-light">${data.phone_name}</h5>
      <p class="card-text text-light">${data.brand}</p>
    </div>
    <p class="text-center"><a onclick=phoneDetailsButton('${data.slug}') class="btn btn-default bg-info" href="#" role="button">Details</a></p>
  </div>
     
    `
      toggleShow('show-more', 'block')
      displaySearchResult.appendChild(div);
      toggleShow('spinner', 'none');


    })

    //from here it's show more part--------->
    document.getElementById('show-more').addEventListener('click', () => {
      const displaySearchResult = document.getElementById('search-result');
      displaySearchResult.textContent = '';

      const infos = info.slice(20, info.length);
      infos.forEach(data => {


        const div = document.createElement('div');
        div.classList.add('col', 'shadow', 'p-3')
        div.innerHTML = `
  <div class="card h-100 bg-secondary shadow">
  <img src="${data.image?data.image:'Not available'}" class="card-img-top w-75  h-75 mx-auto rounded" alt="...">
  <div class="card-body">
    <h5 class="card-title text-light">${data.phone_name}</h5>
    <p class="card-text text-light">${data.brand}</p>
  </div>
  <p class="text-center"><a onclick=phoneDetailsButton('${data.slug}') class="btn btn-default bg-info" href="#" role="button">Details</a></p>
</div>
   
  `
        toggleShow('show-more', 'none')
        displaySearchResult.appendChild(div);
        toggleShow('spinner', 'none');

      })
    })
  } else {
    info.forEach(data => {
      const div = document.createElement('div');
      div.classList.add('col', 'shadow', 'p-3')
      div.innerHTML = `
      <div class="card h-100 bg-secondary shadow">
      <img src="${data.image?data.image:'Not available'}" class="card-img-top w-75  h-75 mx-auto rounded" alt="...">
      <div class="card-body">
        <h5 class="card-title text-light">${data.phone_name}</h5>
        <p class="card-text text-light">${data.brand}</p>
      </div>
      <p class="text-center"><a onclick=phoneDetailsButton('${data.slug}') class="btn btn-default bg-info" href="#" role="button">Details</a></p>
      </div>
      
      `
      toggleShow('show-more', 'none')
      displaySearchResult.appendChild(div);
      toggleShow('spinner', 'none');
    })
  }
}

//Getting API of single phone details------------>
const phoneDetailsButton = id => {
  toggleShow('spinner', 'block');
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
    .then(res => res.json())
    .then(info => {

      console.log(info);
      phoneDetails(info.data)
    })
}

//Getting everything from api about phone details
const phoneDetails = (datas) => {

  const dataMainFeature = datas.mainFeatures;
  const dataOthers = datas.others;
  const sensor = datas.mainFeatures.sensors;
  console.log(dataMainFeature)
  console.log(dataOthers);
  console.log(sensor)

  const detailsParent = document.getElementById('phone-details');
  toggleShow('phone-details', 'block')
  detailsParent.textContent = '';
  const div = document.createElement('div');
  div.classList.add('d-md-flex', 'justify-content-center', 'mx-auto', 'h-100');
  div.innerHTML = `
  <div class="w-50">
  <img src="${datas.image}" class="card-img-top w-100" alt="PHONE IMAGE">
  </div>
  <div class="card-body overflow-auto w-50">
    <h5 class="card-title">${datas.name}</h5>
    <p class="card-text ">Brand : ${datas.brand} <br>Release Date: ${datas.releaseDate?datas.releaseDate:'Not Available'} <br><b class="text-info">Main Features:</b><br>ChipSet : ${dataMainFeature.chipSet} <br> Display Size : ${dataMainFeature.displaySize}<br>Memory : ${dataMainFeature.memory} <br>Storage : ${dataMainFeature.storage} <br><b class="text-info">Sensors :</b> <br> ${sensor}<br> <b class="text-info">Others :</b><br>Bluetooth : ${dataOthers.bluetooth?dataOthers.bluetooth:'Not Available'}<br>GPS : ${dataOthers.GPS}<br>NFC : ${dataOthers.NFC}, Radio : ${dataOthers.Radio}<br>USB : ${dataOthers.USB}<br>WLAN : ${dataOthers.WLAN} </p>
  </div>

  `
  detailsParent.appendChild(div);
  toggleShow('spinner', 'none');

}