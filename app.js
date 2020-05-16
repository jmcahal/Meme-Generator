// get elements to manipulate in the DOM
const memes = document.querySelector("#memes");
const memeForm = document.querySelector("form");
const url = document.querySelector("url");

// Code for the color moving title
function randomRGB(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}
const letters = document.querySelectorAll('.letter');
setInterval(function(){
    for(let letter of letters){
        letter.style.color = randomRGB();
    }
},1000)

// retrive saved memes
oldMemes= JSON.parse(localStorage.getItem("savedMemes"))||[];
// place saved memes in their place
for (let i =0; i<oldMemes.length; i++){
    // for (const property in oldMemes[i]) {
            function create(){
            // e.preventDefault();
            const newMeme= document.createElement("div");
            newMeme.classList.add("parentDiv");
            const image = document.querySelector("#url-input");
            let background = newMeme.style.backgroundImage = `${oldMemes[i].background}`;
            console.log(background);
            //create overlay
            const overlay = document.createElement("div");
            overlay.classList.add("overlay");
            newMeme.append(overlay);
            // create the upper text
            const uText = `${oldMemes[i].upperText}`;
            const upperCaption = document.createElement("div")
            upperCaption.classList.add("memeTop");
            upperCaption.innerText = uText;
            newMeme.append(upperCaption);
            // create the bottom text
            const bText = `${oldMemes[i].bottomText}`;
            const bottomCaption = document.createElement("div")
            bottomCaption.classList.add("memeBottom");
            bottomCaption.innerText = bText;
            newMeme.append(bottomCaption);
            //Click function to delete meme
            newMeme.addEventListener("click", function(e){
                let x = oldMemes.indexOf(e.target);
                console.log(x);
                oldMemes.splice(x,1)
                localStorage.setItem("savedMemes", JSON.stringify(oldMemes));
                memes.removeChild(newMeme);
            })
            memes.append(newMeme);
        }
        create();
    }

//Make the meme when submit is clicked or enter is pressed
memeForm.addEventListener("submit", function(e){
    e.preventDefault();
    const newMeme= document.createElement("div");
    newMeme.classList.add("parentDiv");
    const image = document.querySelector("#url-input");
    let background = newMeme.style.backgroundImage = `url(${image.value})`;
    console.log(background);
    //create overlay
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    newMeme.append(overlay);
    
    // create the upper text
    const upperText = document.querySelector("#upperText-input");
    const uText = upperText.value;
    const upperCaption = document.createElement("div")
    upperCaption.classList.add("memeTop");
    upperCaption.innerText = upperText.value;
    newMeme.append(upperCaption);

    // create the bottom text
    const bottomText = document.querySelector("#bottomText-input");
    const bText = bottomText.value;
    const bottomCaption = document.createElement("div")
    bottomCaption.classList.add("memeBottom");
    bottomCaption.innerText = bottomText.value;
    newMeme.append(bottomCaption);

    newMeme.addEventListener("click", function(e){
        let x = oldMemes.indexOf(e.target);
        console.log(x);
        oldMemes.splice(x,1)
        localStorage.setItem("savedMemes", JSON.stringify(oldMemes));
        memes.removeChild(newMeme);

    })
    memes.prepend(newMeme);

   //save what's needed to rebuild meme with a refresh
    let saveMeme = new Object();
    saveMeme.background = background;
    saveMeme.upperText= uText;
    saveMeme.bottomText = bText;
    console.log(saveMeme);
    console.log("done")

    oldMemes.push(saveMeme);
    localStorage.setItem("savedMemes", JSON.stringify(oldMemes));
    
    memeForm.reset();
})






