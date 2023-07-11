import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { FormField, Loader } from "../components";
import {preview} from "../assets";
import {getRendomPrompts} from "../utils";


function CreatePost() {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name:"",
    prompt:"",
    photo:""
  });
  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);
  const [isDev, setisDev] = useState(false);

  async function handleSubmit(e){
    console.log(JSON.stringify(form));
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch("http://localhost:8080/api/v1/post",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(form)
      })
      if(response.ok){
        navigate("/")
      }else{
        const data = await response.json();
        console.log(data);
        alert(data.success);
      }

    } catch (error) {
      alert(error.message);
    }finally{
      setloading(false);
    }
  }

  function handleChange(e){

    setform({...form,[e.target.name]:e.target.value})
   
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = ()=>{
        setform({...form,photo:reader.result})
      }
    
      
    
    console.log(form);
  }
  function handleSurpriseMe(){
    const prompt = getRendomPrompts();
    setform({...form,prompt:prompt});
  }
  async function generateImage(){
     try {
        if(form.prompt !=""){
          setgeneratingImg(true);
          const response = await fetch("http://localhost:8080/api/v1/dalle",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({prompt:form.prompt})
          });
          if(response.ok){
            const data = await response.json();
            setform({...form,photo:`data:image/jpeg;base64,${data.photo}`});
          }else{
            const error = await response.text();
            alert(error);
          }
        }
     } catch (error) {
        alert(error.message);
     }finally{
      setgeneratingImg(false);
     }
  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Create imaginative and visually stunning images through DALL-E AI and share them with the community.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>

        <div className="flex flex-col gap-5">
          <FormField 
            lableName="Your name"
            type="text"
            name="name"
            placeholder="Abhishek kumar"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField 
            lableName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe = {handleSurpriseMe}
          />
        </div>

        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center mt-3">
          {
            form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ):(
              <img 
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )
          }
          {
            generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )
          }

        </div>
        {
          isDev && (
            <div>
              <FormField 
                type="file"
                name="photo"
                lableName="Select photo from drive"
                placeholder="Click here to select"
                handleChange={handleChange}
              />
            </div>
          )
        }
          <div className="mt-5 flex gap-5">
            <button 
              type="button"
              onClick={generateImage}
              disabled={generatingImg}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5"
            >
              {
                generatingImg ? "Generating..." : "Generate"
              }
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community</p>

            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {
                loading ? "Sharing...":"Share with the community"
              }
            </button>
          </div>
      </form>
    </section>
  )
}

export default CreatePost