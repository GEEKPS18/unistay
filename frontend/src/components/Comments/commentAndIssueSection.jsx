import { useEffect, useState } from "react"
import InputAndSubmet from "./inputAndSubmit"
import CommentSection from "./commentSection"
import IssueSection from "./issueSection"

const InputField = (props) => {
  const [data,setData]=useState([])
  
  const [commentSetting, setCommentSetting] = useState(null)
 

  const handleCommentSettings = (index) => {
    setCommentSetting(commentSetting === index ? null : index)
  }


const handleDeleteComment=async(id)=>{
    try{
     
      const response=await fetch(`http://localhost:3000/Ratings/${id}/comment`,{
        method:"DELETE"
        
      })
       
      if (!response.ok) {
        throw new Error("Failed to delete comment");
        console.log("Error")
      }
      
      setData(prev => prev.filter(c => c.id !== id));
    }
    catch(error){
      console.log("E")
      console.error("Error deleting comment:", error);
    }
}


const handleDeleteIssue=async(id)=>{
    try{
     
      const response=await fetch(`http://localhost:3000/Ratings/${id}/issue`,{
        method:"DELETE"
        
      })
        
      if (!response.ok) {
        throw new Error("Failed to delete issue");
        console.log("Error")
      }
      
      setData(prev => prev.filter(c => c.id !== id));
    }
    catch(error){
      
      console.error("Error deleting comment:", error);
    }
}



  const ratingType=[
    "comments",
    "issues",
    "stars"
  ]
  useEffect(()=>{
    const getData=async()=>{
      const res=await fetch('http://localhost:3000/residence/1/Ratings')
      const data=await res.json()
      setData(data)
    }
    getData()
  },[])
  

  return (
    <>
    

    <ul className="list-unstyled">
      {data.map((comm,i)=>(
  
          <div  key={i} >

          {props.tab==="comments"&&comm.comment!==null && 
          <div>
            <CommentSection data={comm} i={i} setData={setData}></CommentSection> 
            <span style={{color:"gray", fontSize:"0.9rem"}}>{new Date(comm.rateDate).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</span>
          </div>
          }



          {props.tab==="issues" && comm.issues!==null&& 
          <div>

            <IssueSection data={comm} i={i} setData={setData} ></IssueSection>
            <span style={{color:"gray", fontSize:"0.9rem"}}>{new Date(comm.rateDate).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</span>
          </div>
          }
            
            
          </div>

      ))}

    </ul>
    
      <InputAndSubmet content={props.content} tab={props.tab} data={data} setData={setData} ></InputAndSubmet>
      
    </>
  )
}

export default InputField



  {/* <ul className="list-unstyled">
        {data.map((c, i) => (
          <div
            key={i}
            className="mb-2 p-2 rounded d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#faf7f7", color: "#1b2a41" }}
          >
            {editingIndex === i ? (
              <div className="d-flex gap-2 flex-grow-1 me-2">
                <input
                  className="form-control form-control-sm"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveEdit(i)
                    if (e.key === "Escape") setEditingIndex(null)
                  }}
                  autoFocus
                />
                <button
                  className="btn btn-sm"
                  style={{ backgroundColor: "#1b2a41", color: "white", whiteSpace: "nowrap" }}
                  onClick={() => handleSaveEdit(i)}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setEditingIndex(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <li style={{ listStyle: "none" }}>{c.comment}</li>
            )}

            {editingIndex !== i && (
              <div style={{ position: "relative" }}>
                <i
                  className="bi bi-three-dots-vertical"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCommentSettings(i)}
                />
                {commentSetting === i && (
                  <div
                    style={{
                      width: "90px",
                      height: "auto",
                      backgroundColor: "#1b2a41",
                      color: "lightgray",
                      position: "absolute",
                      right: "0",
                      zIndex: 10,
                      padding: "2px",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      className="d-flex p-1 justify-content-between align-items-baseline"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleUpdate(i)}
                    >
                      <i className="bi bi-pencil" />
                      <span>Update</span>
                    </div>

                    <div
                      className="d-flex p-1 mt-1 justify-content-between align-items-baseline"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(i)}
                    >
                      <i className="bi bi-trash3" />
                      <span>Delete</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </ul> */}