const selectTag=document.querySelectorAll('select');
let fromText=document.querySelector('.fromText');
let tranBtn= document.querySelector('.translateBtn');
let toText= document.querySelector('.toText');
let exchange=document.querySelector('.exchang-icon');
let icons= document.querySelectorAll('.icons i')



selectTag.forEach((tag,id)=>{

    for (countryCode in countries){


        let selected;
        if (id == 0 && countryCode === "en-GB"){
            selected = "selected"
        }else if (id == 1 && countryCode == "hi-IN"){
            selected = "selected"
        }
        let option= `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`
        tag.insertAdjacentHTML("beforeend",option);

    }
})

tranBtn.addEventListener('click',function (){

    let text= fromText.value;
    let translateFrom=selectTag[0].value;
    let translateTo= selectTag[1].value;
    if (!text) return;
    toText.value="Translating...."

    let apiUrl=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl).then(res=>res.json()).then(data=>{
        toText.value= data.responseData.translatedText;
    })
})

exchange.addEventListener('click',function (){
    let tempText= fromText.value;
    fromText.value=toText.value;
    toText.value=tempText;

    let temLang= selectTag[0].value;
    selectTag[0].value=selectTag[1].value;
    selectTag[1].value=temLang;
})

icons.forEach(icon=>{
   icon.addEventListener('click',function (e){
       if (e.target.classList.contains('fa-clipboard')){
           if (e.target.classList.contains('from')){
               navigator.clipboard.writeText(fromText.value);
           }else {
               navigator.clipboard.writeText(toText.value);
           }
       }else {
           let utterance;
           if(e.target.classList.contains('from')){
               utterance= new SpeechSynthesisUtterance(fromText.value);
               utterance.lang= selectTag[0].value;

           }else {
               utterance= new SpeechSynthesisUtterance(toText.value);
               utterance.lang= selectTag[1].value;
           }
           speechSynthesis.speak(utterance);
       }
   })
})