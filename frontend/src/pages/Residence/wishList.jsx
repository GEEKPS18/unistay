import { useEffect, useState } from "react";
import api from "../../lib/api.js";

const WishList=()=>{
    const[data,setData]=useState([])
    const [liked, setLiked] = useState({})

    useEffect(() => {
        const getData = async () => {
            const res = await api.get('/residence')
            setData(res.data.residences || [])
        }
        getData()
    }, [])

    const handleRemoveFromFavourites = async (residenceId) => {
        const student = JSON.parse(localStorage.getItem("student"))
        const studentId = student?.id
        if (!studentId) return
        await api.delete(`/residence/${residenceId}/wishlist/student/${studentId}/`)
        setData(prev => prev.filter(r => r.res_id !== residenceId))
    }
    return(
        <>
            
            <div className=" row p-4">
                <h3>العودة لكل السكنات</h3>
                {data.map((hotel) => (
                            <div className="col-6 col-md-4 col-lg-4 mb-4" key={hotel?.id}>
                                <div className="card me-2" style={{ cursor: "pointer", color: "#1b2a41" }} >


                                    


                                    <img src={hotel?.ResidenceImages?.[0]?.image_url} style={{ aspectRatio: "14/15" }} alt={hotel?.address} />
                                    <div
                                        style={{position:"absolute", top:"1rem",right:"1rem"}}
                                        >
                                            <i className="bi bi-heart-fill" style={{ fontSize: "35px", position:"relative",bottom:"3.5px" }} onClick={()=>handleRemoveFromFavourites(hotel?.res_id)}></i>
                                    </div>
                                    <div className="card-body bg-light">
                                        <h5 className="card-title">{hotel?.address}</h5>
                                        <div className="d-flex w-100 justify-content-around ">

                                             <button className="btn" style={{width:"100%",
                                                                            height: "40px",
                                                                            borderRadius: "8px",
                                                                            backgroundColor: "#1b2a41",
                                                                            color:"white"}}
                                                                           // onClick={() => navigate(`/details/${hotel?.id}`)}
                                             >info</button>


                                            
                                            
                                            
                                           

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

            </div>

        </>
    )
}

export default WishList;