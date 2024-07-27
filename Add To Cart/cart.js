let cartData=JSON.parse(localStorage.getItem("cart-data"))|| []
var container = document.getElementById("container");


console.log(cartData)
displaydata(cartData)

function displaydata(arr){
container.innerHTML=""
    arr.forEach((ele,i) => {
        let container = document.getElementById("container")
        let box=document.createElement("div")
        
        let name =document.createElement("h4")
        name.innerText = ele.name
        
        let username = document.createElement("p")
        username.innerText=ele.username
        
        let email=document.createElement("h6")
        email.innerText=ele.email
        
        let btn=document.createElement("button")
        btn.innerText="Remove"
        btn.addEventListener("click",function(){
            RemoveData(ele,i)
        })
       
        
        box.append(name,username,email,btn)
        container.append(box)
      
        })
}


    function RemoveData(ele , i){
        cartData.splice(i,1)
       localStorage.setItem("cart-data",JSON.stringify(cartData))
        displaydata(cartData)
    }