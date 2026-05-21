import { data } from "./data.js";

const searchInput=document.getElementById('search-input');
const searchBtn=document.getElementById('search-btn');
function xulyTimkiem(){
    const tukhoa=searchInput.value.trim();
    if(tukhoa!=="")
    {
        window.location.href = `danhsachSP.html?search=${encodeURIComponent(tukhoa)}`;
    }
}
    searchBtn.addEventListener('click',xulyTimkiem);
    searchInput.addEventListener('keypress',function(e){
        if(e.key==='Enter')
            xulyTimkiem();
    });

const urlParams = new URLSearchParams(window.location.search);
const currentCategory = urlParams.get('category');
const searchQuery=urlParams.get('search');

const pageTitle = document.getElementById('page-title');
const titleMap = {
    vot: 'Vợt cầu lông',
    giay: 'Giày cầu lông',
    balo: 'Balo cầu lông',
    phukien: 'Phụ kiện cầu lông',
};
let filterData =data;
if(currentCategory){
pageTitle.innerText = titleMap[currentCategory] || 'Danh sách sản phẩm';

filterData=data.filter(p => p.category.startsWith(currentCategory));
}
else if(searchQuery)
{
    pageTitle.innerText=`kết quả tìm kiếm: ${searchQuery}`;
    filterData = data.filter(p=>p.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
}
const grid = document.getElementById('product-vot');

if (!grid) {
    console.error('Không tìm thấy phần tử #product-vot');
} else if (filterData.length === 0) {
    grid.innerHTML = '<p>Không tìm thấy sản phẩm.</p>';
} else {
    grid.innerHTML = filterData.map(product => `
        <div class="prd-card">
            <div class="inner">
                <a href="#" class="prd-card-img">
                    <img src="${product.image}" alt="${product.alt}">
                </a>
                <div class="btn_xemchitiet">
                    <a href="chitietSP.html?id=${product.id}" class="xemchitiet">Xem chi tiết</a>
                </div>
            </div>
            <div class="prd-card-ctn">
                <a href="#" class="prd-card-link">${product.name}</a>
                <div class="prd-card-gia">
                    <div class="prd-card-gia-box">
                        <span class="prd-card-gia-new">${product.price}</span>
                        <span class="prd-card-gia-goc">${product.priceOld}</span>
                    </div>
                </div>
            </div>
        </div>`).join('');
}
