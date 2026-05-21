/* Updates the cart badge count from localStorage and listens for changes */
(function(){
    const badgeId = 'cart-badge';
    function getCart(){
        try{ return JSON.parse(localStorage.getItem('cart')) || []; }catch(e){ return []; }
    }
    function countItems(){
        return getCart().reduce((s,i)=>s + (Number(i.quantity)||0),0);
    }
    function updateCartBadge(){
        const el = document.getElementById(badgeId);
        if(!el) return;
        const count = countItems();
        if(count > 0){
            el.style.display = 'inline-block';
            el.textContent = count;
        } else {
            el.style.display = 'none';
            el.textContent = '';
        }
    }
    window.updateCartBadge = updateCartBadge;
    window.addEventListener('storage', function(e){ if(e.key === 'cart') updateCartBadge(); });
    document.addEventListener('DOMContentLoaded', updateCartBadge);
})();
