//SHOP PAGE TYPEWRITER GSAP
/*
gsap.registerPlugin(TextPlugin);

const Spice = document.getElementById("page_title")
const Solar = document.getElementById("page_title_solar")
const Sprout = document.getElementById("page_title_sprout")
const Music = document.getElementById("page_title_music")
const Sprouts_sec_title = document.getElementById("sprouts_section_title")
const Blog_title = document.getElementById("page_blog_title")

gsap.to(Spice, {
    duration: 3,
    text: {
        value: "Sacred Connections Ministry",
        //delimiter: " ",
        oldClass:"start",
        newClass:"end",
    },
});
*/




// TEXT ANIMATION START 
// Select the element you want the typewriter effect on
const textElement = document.querySelector("#page_title");

// Ensure the element exists
if (textElement) {
  // Text to be typed out
  const text = "Sacred Connections Ministry";

  // Split text into characters for individual animation
  const characters = text.split("");

  // Wrap each character in a span and add cursor at the end
  textElement.innerHTML = characters.map(char => `<span class="char">${char}</span>`).join("") + '<span class="cursor">|</span>';

  // Get all character spans and the cursor
  const charSpans = textElement.querySelectorAll(".char");
  const cursor = textElement.querySelector(".cursor");

  // GSAP typewriter animation
  gsap.from(charSpans, {
    opacity: 0, // Start with invisible characters
    duration: 0.05, // Speed of each character appearance
    stagger: 0.1, // Delay between each character
    ease: "none",
    onUpdate: function () {
      // Move cursor to follow the last visible character
      const lastVisibleIndex = Math.floor(this.progress() * charSpans.length);
      if (lastVisibleIndex < charSpans.length) {
        cursor.style.left = charSpans[lastVisibleIndex].offsetLeft + charSpans[lastVisibleIndex].offsetWidth + "px";
      } else {
        cursor.style.left = charSpans[charSpans.length - 1].offsetLeft + charSpans[charSpans.length - 1].offsetWidth + "px";
      }
    }
  });

  // GSAP cursor blink animation
  gsap.to(".cursor", {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 0.5,
    ease: "power1.inOut"
  });
} else {
  console.error("Element with ID 'logo' not found.");
}
// TEXT ANIMATION END