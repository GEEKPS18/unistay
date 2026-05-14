const SideBar=()=>{
    return (
        <>
         <div className="col-7 col-md-3 col-lg-3 p-4" style={{ position: "sticky", top: 0, height: "fit-content", alignSelf: "flex-start",flex:"none" }}>
                    <h4 className="mb-3"><b>نظام اقتراحات</b></h4>
                    <div className=" bg-light p-4" style={{ borderRadius: 5 }}>
                        <h4><b>فلترة النتائج</b></h4>
                        <h5>Price Range</h5>
                        <select className="form-select form-select-sm w-80" aria-label="Small select example">
                            <option selected>Any Price</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <h5 className="mt-4">المسافة</h5>
                        <select className="form-select form-select-sm w-100" aria-label="Small select example">
                            <option selected>Any Distance</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <h5 className="mt-4">الميزات</h5>
                        <div className="form-check" style={{ color: "#1b2a41" }}>
                            <input className="form-check-input" type="checkbox" id="wifi" value="wifi" />
                            <label className="form-check-label" htmlFor="wifi">Wi-fi</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="ac" value="ac" />
                            <label className="form-check-label" htmlFor="ac">Air conditioning</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="parking" value="parking" />
                            <label className="form-check-label" htmlFor="parking">Parking</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="laundry" value="laundry" />
                            <label className="form-check-label" htmlFor="laundry">Laundry</label>
                        </div>
                        <button className="btn text-center mt-4 w-100" style={{ width: "80%", backgroundColor: "#1b2a41", color: "white" }}>Apply filter</button>
                       

                    </div><div className="mt-4">
                    
                    <h4 className="mb-3"><b>Ask AI</b></h4>
                    <div className="position-relative ">
                     <textarea
                       className="form-control"
                      rows="3"
                      placeholder="بدي سكن كذا كذا ..."
                     style={{ resize: "none", paddingLeft: "45px", fontSize: "16px" }}
                    ></textarea>
                     <button
                      className="btn position-absolute"
                      style={{
                       bottom: "8px",
                       left: "1.5rem",
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
                    <p className="text-muted mt-1" style={{ fontSize: "11px" }}>Powered by AI</p>
                </div>
                </div>
        </>
    )
}

export default SideBar;