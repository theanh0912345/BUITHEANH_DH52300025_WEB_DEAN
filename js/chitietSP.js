import {data} from "./data.js";

const urlParams= new URLSearchParams(window.location.search);
const productid= urlParams.get('id');

const product=data.find(p=>p.id===productid);
const titleMap = {
    "vot-lining": 'Lining',
    "vot-yonex": 'Yonex',
    "vot-victor": 'Victor',
};
if(product)
{
    document.getElementById('id').innerText=product.id;
    document.getElementById('name').innerText=product.name;
    document.getElementById('image').src=product.image;
    document.getElementById('thuonghieu').innerText=titleMap[product.category],
    document.getElementById('price').innerText=product.price;
    document.getElementById('priceOld').innerText=product.priceOld;
    // document.getElementById('description').innerText=product.description;
    const descriptionlist= document.getElementById('description');
   descriptionlist.innerHTML="";
   product.description.forEach(p=>{descriptionlist.innerHTML+=`<li>${p}</li>`;});
   const specslist= document.getElementById('specs');
   specslist.innerHTML="";
   product.specs.forEach(p=>{specslist.innerHTML+=`<li>${p}</li>`;});

   const addtocartbtn = document.getElementById('add-to-cart');
   addtocartbtn.addEventListener('click',function()
{
    themgiohang(product);
})
}

function themgiohang(product){
    let giohang= JSON.parse(localStorage.getItem('cart'))||[];
    const sanphamgiohang= giohang.find(item=>item.id===product.id);
    if(sanphamgiohang)
    {
        sanphamgiohang.quantity+=1;
    }
    else{
        giohang.push({
            id:product.id,
            name:product.name,
            price:product.price,
            image:product.image,
            quantity:1
        });
    }
        localStorage.setItem('cart',JSON.stringify(giohang));
        if (window.updateCartBadge) updateCartBadge();
        // also trigger storage event for other tabs
        try{ window.dispatchEvent(new Event('storage')); }catch(e){}
        alert(`Đã thêm "${product.name}" vào giỏ hàng`);
}