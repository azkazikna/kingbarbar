// varible wadah card
const cardContainerProduct = document.querySelector('.card-detail-container');


// function detailProductCard html fragment

function detailProductCard(dataDetailProduct){
 
    let card  = ``
    dataDetailProduct.forEach(el => {
     

        card += `
        <div class="card card card-item-detail" >
           <img src="${el.img_url}" class="card-img-top" alt="...">
           <div class="card-body mt-0">
             <span class="card-kategori text-muted">${el.kategori.nama}</span>
             <h5 class="card-title-detail">${el.nama} </h5>
             <p class="card-text text-muted">
             ${el.deskripsi}
             </p>
             <h3 class="harga-detail">Rp ${numberWithCommas(el.harga)}</h3>
             <a class="btn btn-outline-info btn-detail" href="detailProduct.html?id=${el.id}"  data-name="${el.nama}">Detail</a>
             <a class="btn btn-outline-info btn-detail" href="#">
                <img src="../assets/images/iconShopee.svg" class="icon-olshop" alt="icon shopee">
             </a> 
             <a class="btn btn-outline-info btn-detail" href="#">
                <img src="../assets/images/iconTokopedia.png" class="icon-olshop" alt="icon tokopedia">
             </a> 
             </div>
         </div>`
    });
    return cardContainerProduct.innerHTML = card

}


// fitur select detail product
function detailTumbApi(){
    return fetch('https://kingbarbar-api.herokuapp.com/api/v1/produk/')
    .then(respone =>{

        if(!respone.ok){
            throw new Error('bad server')
        }

        return respone.json() 

    })
    .then(dataProduct => {
        
        // panggil function cardProduct()
        return dataProduct;
    })
    .catch(error =>{
            console.error(error)
    })
}

// fitur sort kategori

const navDetailCard = document.querySelector('.nav-detail-card')

const navItemDetail = document.querySelectorAll('.nav-item');


// EVENT NAV CONTAINER DARI NAV ITEM
navDetailCard.addEventListener('click', async function(e){
    // CEK APAKAH TARGET YG DI KLIK ADA CLASS NAV-ITEM OR NOT
    if(e.target.classList.contains('nav-item')){
        
        // FOREACH NAV-ITEM DAN CEK APAKAH ADA CLASS ACTIVE SPAN OR NOT
        navItemDetail.forEach(navItem =>{
                if(navItem.classList.contains('active-span')){
                    navItem.classList.remove('active-span')
                }
               
        })
        // JIKA TIDAK ADA TAMBAH CLASS ACTIVE SPAN
        e.target.classList.add('active-span')


        // PROSES SORT BY KATEGORY

        let dataTextContent = e.target.textContent;
        let dataDetailProduct = await detailTumbApi();
        let fragmentCardSort = ``;

        dataDetailProduct.forEach(elDetail =>{
            if(dataTextContent === elDetail.kategori.nama){
               
               fragmentCardSort += `
                    <div class="card card card-item-detail" >
                    <img src="${elDetail.img_url}" class="card-img-top" alt="...">
                    <div class="card-body mt-0">
                        <span class="card-kategori text-muted">${elDetail.kategori.nama}</span>
                        <h5 class="card-title-detail">${elDetail.nama} </h5>
                        <p class="card-text text-muted">
                        ${elDetail.deskripsi}
                        </p>
                        <h3 class="harga-detail">Rp ${numberWithCommas(elDetail.harga)}</h3>
                        <a class="btn btn-outline-info btn-detail" href="detailProduct.html?id=${elDetail.id}"  data-name="${elDetail.nama}">Detail</a> 
                        <a class="btn btn-outline-info btn-detail" href="#">
                            <img src="../assets/images/iconShopee.svg" class="icon-olshop" alt="icon shopee">
                        </a> 
                        <a class="btn btn-outline-info btn-detail" href="#">
                            <img src="../assets/images/iconTokopedia.png" class="icon-olshop" alt="icon tokopedia">
                        </a> 
                    </div>
                    </div>`
                    cardContainerProduct.innerHTML = fragmentCardSort;
            }
            else if(dataTextContent === 'All'){
                 detailProductCard(dataDetailProduct)
            }
        })
        
    }
})