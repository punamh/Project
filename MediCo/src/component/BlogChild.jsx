import './Blog.css'

export function BlogChild({cards}){

    const{image,title,medico}=cards;

    return(
        <>
        <div>
            <img src={image}/>
            <h4>{title}</h4>
            <h6>{medico}</h6>
        </div>
        </>
    )
}
