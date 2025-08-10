function navigateTo(url){
    window.location.href=url;
}
function scrollDown() {
    window.scrollTo({
      top: window.innerHeight, // Scroll by one viewport height
      behavior: "smooth"
    });
    }    