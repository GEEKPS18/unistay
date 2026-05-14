// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import SideBar from "../Sidbar/SideBar.jsx"
// import MobileSidebar from "../Contact/MobileSidebar.jsx"

// const AllResidence = () => {
//     const navigate = useNavigate()
//     const [data, setData] = useState([])
//     const [smallScreen,setSmallScreen]=useState(window.innerWidth>=1000)
//     useEffect(() => {
     

//         const getData = async () => {
//             const res = await fetch("https://api.escuelajs.co/api/v1/categories")
//             const data = await res.json()
//             setData(data)
//         }
//         getData()
//     }, [])

//     useEffect(()=>{
//         const handelSmallScreen=()=>{
//             setSmallScreen(window.innerWidth>=1000)
//         }

//         window.addEventListener("resize",handelSmallScreen)
//         return () => window.removeEventListener("resize", handelSmallScreen)
//     },[])
    
//     return (
//         <>
             
            
//             <div className="d-flex p-4" style={{ minHeight: "100vh", color: "#1b2a41" }}>
                
                
//                 {smallScreen &&<SideBar></SideBar>}
                

//                 <div className="col-12 col-md-12 col-lg-9">
                    
//                     <p className="pt-4" style={{ color: "gray" }}>{data.length} results</p>
//                     {!smallScreen&&<MobileSidebar></MobileSidebar>}
//                     <div className="row">
//                         {data.map((hotel) => (
//                             <div className="col-6 col-md-4 col-lg-4 mb-4" key={hotel?.id}>
//                                 <div className="card me-2" style={{ cursor: "pointer", color: "#1b2a41" }} onClick={() => navigate(`/details/${hotel?.id}`)}>
//                                     <img src={hotel?.image} style={{ aspectRatio: "14/15" }} alt={hotel?.name} />
//                                     <div className="card-body bg-light">
//                                         <h5 className="card-title">{hotel?.name}</h5>
//                                         <p className="card-text">Test</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
                
                    
                
                
                
                   
            
//             </div>
//         </>
//     )
// }

// export default AllResidence