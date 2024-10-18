const baseURL = "https://v6.exchangerate-api.com/v6/60346a993149cc0e9b9b62ad/pair";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const result = document.querySelector(".msg");
const amount = document.querySelector(".amount input");

for(let select of dropdown){
    for(currentCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currentCode;
        newOption.value = currentCode;
        if(select.name === "from" && currentCode === "USD"){
            newOption.selected = "selected"
        }else if(select.name === "to" && currentCode === "INR"){
            newOption.selected = "selected"
        }
    select.append(newOption)
   }
   select.addEventListener("change", (evt) => {
       updateFlage(evt.target)
    })
}
const updateExchangeRate = async () => {
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
    
    const url = `${baseURL}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(url)
    let data =await response.json();
    let conversion_rate = data.conversion_rate;
   let finalAmount = conversion_rate * amount.value;
   result.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount.toFixed(3)} ${toCurr.value}`

}
const updateFlage =(element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})
window.addEventListener("load", () =>{
    updateExchangeRate()
})