import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "../../components/Sidbar/SideBar.jsx"
import MobileSidebar from "../../components/Contact/MobileSidebar.jsx"
import Header from "../../components/Header/Header.jsx"
import Footer from "../../components/Footer/Footer.jsx"

const AllResidence = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [smallScreen,setSmallScreen]=useState(window.innerWidth>=1000)
    const [liked, setLiked] = useState({})
    useEffect(() => {
     

        const getData = async () => {
            const res = await fetch(`http://localhost:3000/residence`)
            const data = await res.json()
            setData(data.residences)
            console.log(data)
        }
        getData()
    }, [])
    

    //   useEffect(() => {
     

    //     const getData = async () => {
    //         const res = await fetch("https://api.escuelajs.co/api/v1/categories")
    //         const data = await res.json()
    //         setData(data)
    //     }
    //     getData()
    // }, [])

    useEffect(()=>{
        const handelSmallScreen=()=>{
            setSmallScreen(window.innerWidth>=1000)
        }

        window.addEventListener("resize",handelSmallScreen)
        return () => window.removeEventListener("resize", handelSmallScreen)
    },[])
  
    
    return (
        <>
             {/* <div style={{  padding: '40px' }}>
                <Header></Header>
            </div> */}
            
            <div className="d-flex p-4" style={{ minHeight: "100vh", color: "#1b2a41" ,backgroundColor:"white"}}>
                
                
                {smallScreen &&<SideBar></SideBar>}
                <div className="col-12 col-md-12 col-lg-9">
                    
                    <p className="pt-4" style={{ color: "gray" }}>{data.length} results</p>
                    {!smallScreen&&<MobileSidebar></MobileSidebar>}
                    
                    <div className="row">


                        {data.length===0 &&<div className="d-flex justify-content-center align-items-center">
                            لا يوجد سكنات حاليا
                        </div>}
                        
                        {data.map((hotel) => (
                            <div className="col-6 col-md-4 col-lg-4 mb-4" key={hotel?.id}>
                                <div className="card me-2" style={{ cursor: "pointer", color: "#1b2a41" }} >
                                    <img src={hotel?.ResidenceImages[0]?.image_url} style={{ aspectRatio: "14/15" }} alt={hotel?.name} />
                                    <div className="card-body bg-light">
                                        <h5 className="card-title">{hotel?.name}</h5>
                                        <div className="d-flex w-100 justify-content-around ">

                                             <button className="btn" style={{width:"80%",
                                                                            height: "40px",
                                                                            borderRadius: "8px",
                                                                            backgroundColor: "#1b2a41",
                                                                            color:"white"}}
                                                                            onClick={() => navigate(`/details/${hotel?.res_id}`)}
                                             >info</button>

{/* 
                                            <button className="bg-light" style={{width:"15%",
                                                                            height: "40px",
                                                                            borderRadius: "8px",
                                                                            backgroundColor: "lightgrey",
                                                                            color:"#1b2a41"}}>
                                                <i className="" class="bi bi-heart" style={{fontSize:"30px"}}></i>
                                            </button> */}
                                            
                                            <div onClick={() => setLiked(prev => ({ ...prev, [hotel.id]: !prev[hotel.id] }))}>
                                                {liked[hotel.id]
                                                    ? <i className="bi bi-heart-fill" style={{ fontSize: "35px", position:"relative",bottom:"3.5px" }}></i>
                                                    : <i className="bi bi-heart" style={{ fontSize: "35px", position:"relative",bottom:"3.5px"  }}></i>
                                                }
                                            </div>
                                            
                                            
                                           

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
                
                
                
                
                
                   
            
            </div>
            <Footer></Footer>
        </>
    )
}

export default AllResidence