setTimeout(()=> {
    document.querySelector(".jarvis").style.opacity = "100";
    document.querySelector(".arrow").style.opacity = "100";
    document.querySelector(".dropdown-content").style.opacity = "100";
  },4000);
    $(document).ready(function () {
    // ELEMENTS
    var $scramble = $(".scramble");
  
    $scramble.scramble(2800, 50, "alphabet", true);
  });
  
  // ----------scrambleEnd--------------
  
  var tl = gsap.timeline();
  tl.to(".Loading", {
    opacity: 0,
    delay: 2.5,
  })
    .to(".loader", {
      // y: "-100%",
      opacity: 0,
      duration: 1,
      ease: "Expo.easeInOut",
    })
    .to(".loader",{
        y: "-100%",
        duration: 1,
        ease: "Expo.easeInOut"
      },
      "up"
    )
      
  function navigateTo(url){
      window.location.href=url;
  }
  function scrollDown() {
  window.scrollBy({
    top: window.innerHeight, // Scroll by one viewport height
    behavior: 'smooth' // Smooth scrolling
  });
  }    
  
  const container = document.querySelector('.container');
  const sections = Array.from(container.children);
  let scrollPosition = 0;
  
  // Clone the sections only once for the loop
  sections.forEach((section) => {
    const clone = section.cloneNode(true);
    container.appendChild(clone);
  });
  
  // Continuous scrolling loop
  function infiniteScroll() {
    scrollPosition -= 1; // Adjust speed as needed
    container.style.transform = `translateX(${scrollPosition}px)`;
  
    // Reset position when reaching the end of original sections
    const totalWidth = container.scrollWidth / 2; // Half the container (original + clone)
    if (Math.abs(scrollPosition) >= totalWidth) {
      scrollPosition = 0;
    }
  
    requestAnimationFrame(infiniteScroll); // Keep the loop running
  }
  
  // Start the scrolling loop
  infiniteScroll();
  let loopInterval; // Global reference for the loop interval
  
  // Function to start the loop
  function startLoop() {
      loopInterval = setInterval(() => {
          // Your existing loop logic for moving images horizontally
          container.scrollLeft += 1; // Example logic
      }, 16); // Adjust interval as needed
  }
  
  // Function to stop the loop
  function stopLoop() {
      clearInterval(loopInterval);
  }
  
  // Start the loop initially
  startLoop();
  
  // Add event listeners to all images
  const images = document.querySelectorAll(".image-class"); // Update with your image class
  images.forEach((image) => {
      image.addEventListener("mouseenter", stopLoop); // Pause loop on hover
      image.addEventListener("mouseleave", startLoop); // Resume loop on hover out
  });