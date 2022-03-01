const toggleShow=(id,displyStyle)=>{
  document.getElementById(id).style.display=displyStyle;
  
}

const searchPhone=()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value='';
    toggleShow('phone-details','none')
    toggleShow('spinner','block');
    // console.log(searchText);
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(phone=>{
      console.log(phone)
      if(phone.data==0){
        toggleShow('error','block');
        toggleShow('spinner','none');
        toggleShow('phone-details','none')
        const displaySearchResult = document.getElementById('search-result');
        displaySearchResult.textContent='';

      }
      else{
        
        toggleShow('error','none');
        
        displayAllPhone(phone.data);
        
      }
    })
}

const displayAllPhone =info=>{
// console.log(info);
const displaySearchResult = document.getElementById('search-result');
displaySearchResult.textContent='';
// console.log(info[0]);
for (let i=0;i<20;i++){
    let data = info[i];
    // toggleShow('search-result','block')
    
    const div=document.createElement('div');
    div.classList.add('col','shadow', 'p-3')
    div.innerHTML=`
    <div class="card h-100 bg-secondary shadow">
    <img src="${data.image}" class="card-img-top w-75  h-75 mx-auto rounded" alt="...">
    <div class="card-body">
      <h5 class="card-title text-light">${data.phone_name}</h5>
      <p class="card-text text-light">${data.brand}</p>
    </div>
    <p class="text-center"><a onclick=phoneDetailsButton('${data.slug}') class="btn btn-default bg-info" href="#" role="button">Details</a></p>
  </div>
    `
    displaySearchResult.appendChild(div);
    toggleShow('spinner','none');

}


}
const phoneDetailsButton=id=>{
  toggleShow('spinner','block');
  // console.log(id);
  const url=`https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(info=>phoneDetails(info.data))
}
const phoneDetails =(datas)=>{
  
  // console.log(datas)
  const dataMainFeature = datas.mainFeatures;
  const dataOthers = datas.others;
  const sensor =datas.mainFeatures.sensors;
  console.log(dataMainFeature)
  console.log(dataOthers);
  console.log(sensor)
  console.log(datas)
  const detailsParent = document.getElementById('phone-details');
  // detailsParent.style.display='block';
  toggleShow('phone-details','block')
  detailsParent.textContent='';
  const div = document.createElement('div');
  div.classList.add('d-flex', 'justify-content-center','mx-auto','h-100');
  div.innerHTML=`
  <div>
  <img src="${datas.image}" class="card-img-top w-100" alt="PHONE IMAGE">
  </div>
  <div class="card-body ps-5">
    <h5 class="card-title">${datas.name}</h5>
    <p class="card-text">${datas.brand}</p>
    <p class="card-text">${datas.releaseDate?datas.releaseDate:'Not Available'}</p>
    <p class="card-text">${datas.brand}</p>
    <p class="card-text">${datas.brand}</p>
  </div>

  `
  detailsParent.appendChild(div);
  toggleShow('spinner','none');

}