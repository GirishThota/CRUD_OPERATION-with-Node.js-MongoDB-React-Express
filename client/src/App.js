import './App.css';
import { useState, useEffect } from 'react';
import axios from "axios"
import Formtable from './components/Formtable'

axios.default.baseURL = "http://localhost:8080/"



function App() {
  const [addSection,setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)
  const [formDataEdit, setFormDataEdit] = useState({
    name : "",
    email : "",
    mobile : "",
    id: ""
  })
  const [dataList, setDataList] = useState([])
  const handleOnChange = (e) => {
    const {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e) => {
  e.preventDefault()
  const data = await axios.post("/create",formData)
  console.log(data)
  if(data.data.success){
    setAddSection(false)
    alert(data.data.message)
    getFetchData()
    setFormData({
      name : "",
      email : "",
      mobile : ""
    })
  }
}
const getFetchData = async()=>{
  const data = await axios.get("/")
  console.log(data)
  if(data.data.success){
    setDataList(data.data)
    alert(data.data.message)
  }
}
useEffect(() => {
  getFetchData()
},[])

const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
  }
}
const handleUpdate = async(id)=>{
  const [formDataEdit, setFormDataEdit] = useState({
    name : "",
    email : "",
    mobile : "",
    id: ""
  })
}

const handleEditOnChange = async(e) => {
  const {value,name} = e.target
    setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
}
  <div className='container'>
    <button className='btn btn-add' onClick={()=>setAddSection(true)}>Add</button>

    {
      addSection && (
        <Formtable
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        hanndleclose={()=>setAddSection(false)}
        />
      )
    }
      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>
              <button className='btn btn-edit' onClick={()=>{
                setEditSection(true)
              }}>Edit</button>
              <button className='btn btn-delete'>Delete</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              dataList.map((el)=>{
                console.log(el);
                return(
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                    <button className='btn btn-edit' onClick={()=>{
                      setEditSection(true)
                      setFormDataEdit(el)
                    }}>Edit</button>
                    <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      </div>
}

export default App;
