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

for (const datas of info){
    console.log(datas[0]);

    
    const div=document.createElement('div');
    div.classList.add('col','shadow', 'p-3')
    div.innerHTML=`
    <div class="card h-100">
    <img src="" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Samsung Galaxy Y</h5>
      <p class="card-text">Samsung</p>
    </div>
    <button type="button" class="btn btn-info w-25 px-2 mx-auto"><a href=""></a>Details</button>
  </div>
    `
    displaySearchResult.appendChild(div);

}


}