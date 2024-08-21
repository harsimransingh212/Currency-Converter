const Base_URl='https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_jsRmR3jvemwjGFR0KOYCf6lArWNh1jdz9TJgoieZ&'
const requestsending=`&currencies=INR&base_currency=USD`

const dropdowns= document.querySelectorAll('.dropdown select')
// console.log(dropdowns)
const btn=document.querySelector('button')
const fromCurr=document.querySelector('.from select')
const toCurr=document.querySelector('.to select')
const msg=document.querySelector(".msg")
for(let select of dropdowns)
{
    for(let currcodes in countryList)
        {
            let newOption=document.createElement("option")
            newOption.innerText=currcodes;
            newOption.value=currcodes;
            if(select.name==='from' && currcodes==='USD')
                {
                    newOption.selected="selected"
                }
          else if(select.name==='to' && currcodes==='INR')
                {
                    newOption.selected="selected"
                }
           select.append(newOption)
        }

        select.addEventListener('change',(event)=>
        {
          updateFlag(event.target)  
        })
}


const updateFlag=(element)=>
{
   let currCode=element.value
   let countrycode=countryList[currCode]
   let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`
   let img=element.parentElement.querySelector('img')
   img.src=newSrc

}


const UpdateExchangeRate=async()=>
{
    let amount=document.querySelector('.amount input')
    let amountval=amount.value
 
 //    console.log(amountval)
    if(amountval==="" || amountval< 1)
    {
        amountval=1
        amount.value="1"
    }
     // console.log(fromCurr.value,toCurr.value)
    const URL=`${Base_URl}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`
    let response= await fetch(URL)
    let data= await response.json()
    let rate=data.data[toCurr.value]
 //    console.log(rate)
 // //    console.log(data.data[toCurr.value])
    let finalAmount=amountval*rate
 
    msg.innerText=`${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`   
}

btn.addEventListener('click',(event)=>
    {
       event.preventDefault()
       UpdateExchangeRate()
    })

window.addEventListener('load',()=>
{
    UpdateExchangeRate()
})