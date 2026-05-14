// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"

// const ResDetails = () => {
//     const { id } = useParams()
//     const [hotel, setHotel] = useState(null)

//     useEffect(() => {
//         const getHotel = async () => {
//             const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
//             if (!res.ok) {
//                 console.log("API error:", res.status)
//                 return
//             }
//             const data = await res.json()
//             setHotel(data)
//         }
//         if (id) getHotel()
//     }, [id])

//     if (!hotel) return <div>Loading...</div>

//     return (
//         <>
//             <div className="container d-flex mt-4">
//                 <div className="col-8 col-md-8 col-lg-7 me-3">
//                     <div className="card">
//                         <img src={hotel?.image}  />
//                     </div>
//                 </div>
               
//                 <div className="col-4 col-md-4 col-lg-4 ">
//                     <div className="card">
//                         <img src={hotel?.image} />
//                     </div>
//                     <div className="card">
//                         <img src={hotel?.image}/>
//                     </div>
//                     <div className="card">
//                         <img src={hotel?.image}/>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ResDetails