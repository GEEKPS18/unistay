import { useEffect } from "react";

const ContactSidebar=()=>{
    useEffect(()=>{
      const getOwnerData=async()=>{
        const owner=await fetch (`http://localhost:3000/`)
      }
    })


    return(
       <> 
       
        
        <div className="bg-light p-4  col-md-12 col-lg-12 " style={{height:"fit-content",borderRadius:"5px",color:"#1b2a41"}}>
            <h4><b>تواصل مع المالك</b></h4>
            <p className="mb-3">اسم المالك</p>
            <h5>اسمك</h5>
            <input  type="text" className= "  form-control" placeholder="حمزة موسى.." style={{width:"100%",}}></input>
            <h5 className="mt-3">رقم جوالك</h5>
            <input className="form-control" placeholder="+970123456789" type="tel" style={{width:"100%"}}></input>
            <h5 className="mt-3">نص الرسالة</h5>
            <div className="position-relative ">
                     <textarea
                       className="form-control"
                      rows="3"
                      placeholder="بدي سكن كذا كذا"
                     style={{ resize: "none", paddingLeft: "45px", fontSize: "16px", }}
                    ></textarea>
                     <button
                      className="btn position-absolute"
                      style={{
                       bottom: "12px",
                       left: "1rem",
                       width: "30px",
                       height: "30px",
                       borderRadius: "8px",
                     backgroundColor: "#1b2a41",
                      padding: 0,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                    }}
                    >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                 </div>
            
        </div> 
       
       </>  
    )
}
export default ContactSidebar;