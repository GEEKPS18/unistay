import { useEffect, useState } from "react";

const WishList=()=>{
    const[data,setData]=useState([])
    const [liked, setLiked] = useState({})
    useEffect(() => {
     

        const getData = async () => {
            const res = await fetch("https://api.escuelajs.co/api/v1/categories")
            const data = await res.json()
            setData(data)
        }
        getData()
    }, [])

    const handleRemoveFromFavourites=async(id)=>{
        const wishlist=await fetch(`http://localhost:3000/wishlist/${id}`,{
           method:"DELETE"
        })
        console.log(wishlist.json())

    }
    return(
        <>
            
            <div className=" row p-4">
                <h3>العودة لكل السكنات</h3>
                {data.map((hotel) => (
                            <div className="col-6 col-md-4 col-lg-4 mb-4" key={hotel?.id}>
                                <div className="card me-2" style={{ cursor: "pointer", color: "#1b2a41" }} >


                                    


                                    <img src={hotel?.image} style={{ aspectRatio: "14/15" }} alt={hotel?.name} />
                                    <div 
                                        style={{position:"absolute", top:"1rem",right:"1rem"}}
                                        >
                                            <i className="bi bi-heart-fill" style={{ fontSize: "35px", position:"relative",bottom:"3.5px" }} onClick={()=>handleRemoveFromFavourites(3)}></i>
                                    </div>
                                    <div className="card-body bg-light">
                                        <h5 className="card-title">{hotel?.name}</h5>
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