const searchPhone=()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value='';
    // console.log(searchText);
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(phone=>displayAllPhone(phone.data))
}

const displayAllPhone =info=>{
// console.log(info);
const displaySearchResult = document.getElementById('search-result');
displaySearchResult.textContent='';
// console.log(info[0]);
for (let i=0;i<20;i++){
    let data = info[i];

    
    const div=document.createElement('div');
    div.classList.add('col','shadow', 'p-3')
    div.innerHTML=`
    <div class="card h-100 bg-secondary shadow">
    <img src="${data.image}" class="card-img-top w-75 h-75 mx-auto rounded" alt="...">
    <div class="card-body">
      <h5 class="card-title text-light">${data.phone_name}</h5>
      <p class="card-text text-light">${data.brand}</p>
    </div>
    <p class="text-center"><a onclick=phoneDetailsButton('${data.slug}') class="btn btn-default bg-info" href="#" role="button">Details</a></p>
  </div>
    `
    displaySearchResult.appendChild(div);

}


}
const phoneDetailsButton=id=>{
  // console.log(id);
  const url=`https://openapi.programming-hero.com/api/phone/${id}`
  fetch(url)
  .then(res=>res.json())
  .then(info=>phoneDetails(info.data))
}
const phoneDetails =(datas)=>{
  // console.log(datas.mainFeatures)
  const data = datas.mainFeatures;
  console.log(data)
  const detailsParent = document.getElementById('phone-details');
  detailsParent.textContent='';





}