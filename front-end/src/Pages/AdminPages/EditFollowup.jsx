import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminRequest } from "../../axios";
import { toast } from "react-toastify";



function EditFollowup() {
  const { id } = useParams();
const [status ,setStatus] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("status", status);
    console.log(formData);
    adminRequest({
      url: `/api/admin/followup-edit/${id}`,formData,
      method: "PUT",
      
    }).then((response) => {
      console.log(response);
      toast.success("follow up updated");
    });
  };

 

  return (
    <div>
      <div className="container text-center">
        <form  onSubmit={handleSubmit}>
          <label htmlFor="status">Status</label>
          <input
            name="status"
            id="Example2text"
            placeholder="status"
            cols="30"
            rows="10"
            value={status}
            onChange={(e)=>{
                setStatus(e.target.value)
            }}
          ></input>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditFollowup;
