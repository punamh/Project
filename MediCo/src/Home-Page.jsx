import { Navbar } from './component/Navbar'
import { InfiniteScroll } from './component/InfiniteScroll'
import { Catagory } from './component/catagory'
import { Posters } from './component/Posters'
import { SinglePoster } from './component/SinglePoster'
import { Footer1 } from './component/footer1'
import { Footer2 } from './component/Footer2'
import { BlogParent } from './component/BlogParent'

export function Home(){

    return(
        <>
     <Navbar/>
     <InfiniteScroll/>
     <Catagory/>
     <SinglePoster/>
     <Posters/>
     <BlogParent/>
     <Footer1/>
     <Footer2/>
        </>
    )
}