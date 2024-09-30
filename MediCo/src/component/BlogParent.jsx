import { BlogChild } from "./BlogChild"
import './Blog.css'

export function BlogParent(){

    const blog=[
        {
            image:"https://i.ibb.co/BcF5mVd/pixelcut-export-2.png",
            title:"Selecting the Right Weight Loss Program",
            medico:"By MediCo 24/7"
        },
        {
            image:"https://i.ibb.co/c1HMd4G/pixelcut-export-3.png",
            title:"Handy tips to ease a panic attack",
            medico:"By MediCo 24/7"
        },
        {
            image:"https://i.ibb.co/DgHyb8T/pixelcut-export-4.png",
            title:"10 tips to prevent diabetes in children",
            medico:"By MediCo 24/7"
        },
        {
            image:"https://i.ibb.co/h795dMj/pixelcut-export.png",
            title:"Practical Tips for Managing Diabetes and Gluten Intolerance",
            medico:"By MediCo 24/7"
        },
        {
            image:"https://i.ibb.co/kHpz7QW/pixelcut-export-5.png",
            title:"Top points you didnt know about your allergy",
            medico:"By MediCo 24/7"
        },
        {
            image:"https://i.ibb.co/RTGMNCK/pixelcut-export-6.png",
            title:"Diagnosis & Treatment For Sensitivity",
            medico:"By MediCo 24/7"
        },
        // {
        //     image:"https://i.ibb.co/QD72zS7/pixelcut-export-7.png",
        //     title:"Limit Your Alcohol Consumption",
        //     medico:"By MediCo 24/7"
        // },
        // {
        //     image:"https://i.ibb.co/gJzBF6b/pixelcut-export-1.png",
        //     title:"World Arthritis Day 2022: 5 Foods That Can Improve And Worsen Arthritis Pain",
        //     medico:"By MediCo 24/7"
        // },
        // {
        //     image:"https://i.ibb.co/JKndqPp/pixelcut-export-8.png",
        //     title:"4 Tips to Save Your Neck/back on a Bumpy Road",
        //     medico:"By MediCo 24/7"
        // },
        // {
        //     image:"https://i.ibb.co/rwZMZpx/pixelcut-export-9.png",
        //     title:"Measuring Your Heart Rate",
        //     medico:"By MediCo 24/7"
        // },
        // {
        //     image:"https://i.ibb.co/M60r5cT/pixelcut-export-10.png",
        //     title:"Tips for Meeting Fluid and Carbohydrate Guidelines",
        //     medico:"By MediCo 24/7"
        // },
        // {
        //     image:"https://i.ibb.co/cN2VMJh/pixelcut-export-11.png",
        //     title:"Diet to Improve Haemoglobin Levels (Hb%)",
        //     medico:"By MediCo 24/7"
        // },
        // {
        //     image:"https://i.ibb.co/PMVP109/pixelcut-export-12.png",
        //     title:"Women! Eat Wise to Keep Healthy",
        //     medico:"By MediCo 24/7"
        // },
        // {
        //     image:"https://i.ibb.co/NyV1842/pixelcut-export-13.png",
        //     title:"Medical Management of Osteoporosis",
        //     medico:"By MediCo 24/7"
        // },
    ]

    return(
        <>
         <div className="blog">
            <h2>Blogs and Articles for You</h2>
                <div className="blog2">
                {blog.map((cards)=>{
                    return(
                        <>
                            <BlogChild cards={cards}/>
                        </>
                    )
                })}
                </div>
            </div>
        </>
    )
}