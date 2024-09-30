export function Navbar(){

    return(
        <>
           <div className="Nav-div">
            <div>
               <img src="https://i.ibb.co/YkW256z/Group-7.png"/>
            </div>
            <div className="Navbtn">
                <button>Home</button>
                <button>Contact</button>
                <button>About</button>
            </div>
            <div className="logbtn">
                <span class="material-symbols-outlined">person</span>
                <button >Log in</button>
            </div>
           </div>
           <hr/>
        </>
    )
}