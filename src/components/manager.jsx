import React, { use } from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';


const manager = () => {
  const ref = useRef()
  const passwordref = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarr, setpasswordarr] = useState([]);


const getpasswords = async () => {
  let req=await fetch('http://localhost:3000/')
  let passwords=await req.json()
  console.log(passwords)
  setpasswordarr(passwords)

}

  useEffect(() => {
    getpasswords();
  }, []);

  const copyText = (text) => {
    toast('🦄Copied!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text)
  }

  const showpassword = () => {
    if (ref.current.src.includes('hidden.png')) {
      ref.current.src = 'eye.png'
      passwordref.current.type = 'password'
    }
    else {
      ref.current.src = 'hidden.png'
      passwordref.current.type = 'text'
    }
  }

  const savePassword = async () => {
    if(form.site.length > 3 && form.password.length >3 && form.username.length > 3){
    setpasswordarr([...passwordarr, {...form, id: uuidv4() }])
    //localStorage.setItem("passwords", JSON.stringify([...passwordarr, {...form, id: uuidv4() }]))
    let res=await fetch('http://localhost:3000/',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({...form, id: uuidv4()})
    })
    setform({ site: "", username: "", password: "" })
    console.log([...passwordarr, {...form, id: uuidv4() }])
    toast('🦄Password Saved!', {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
    else {
      toast.error('Please enter valid data!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  const deletePassword = async (id) => {
    let c=confirm("Are you sure you want to delete this password?")
    if(c){
   console.log(id);
   setpasswordarr(passwordarr.filter((item) => item.id !== id))
   //localStorage.setItem("passwords", JSON.stringify(passwordarr.filter((item) => item.id !== id)))}
   let res=await fetch('http://localhost:3000/',{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({id})
  })
   toast('🦄Password Deleted!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  }}


  const editPassword = async (id) => {
        setform(passwordarr.find((item) => item.id === id))
        setpasswordarr(passwordarr.filter((item) => item.id !== id))
        let res=await fetch('http://localhost:3000/',{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({id})
        })

  }

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

      

      <div className=" bg-amber-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]  max-w-7xl md:mycontainer md:p-0 mycontainer min-h-[81.2vh]">
        <h1 className='text-4xl font-bold text-center  '>
          <span className='text-[#874f41]'>&lt;</span>
          Pass
          <span className='text-[#874f41]'>OP/&gt;</span>
        </h1>

        <p className='text-[#e64833] font-bold text-lg text-center '>Your password manager</p>
        <div className='flex justify-center  flex-col text-black px-4 gap-5 py-1 items-center '>
          <input placeholder='Enter Website Url' value={form.site} onChange={handlechange} type="text" name="site" id="site" className='rounded-full border px-4 border-[#e64833] w-full' />
          <div className="flex w-full flex-col md:flex-row gap-8 justify-between">
            <input placeholder="Username" value={form.username} onChange={handlechange} type="text" name="username" id="username" className='rounded-full border px-4 border-[#e64833] w-full' />
            <div className='relative'>



              <input placeholder='Password' ref={passwordref} value={form.password} onChange={handlechange} type="password" name="password" id="password" className='rounded-full border px-4 border-[#e64833] w-full' />
              <span className='absolute right-[2px] top-[1px] cursor-pointer ' onClick={showpassword}>
                <img className='p-1' ref={ref} width={26} src="eye.png" alt="" />
              </span>
            </div>

          </div>
          <button onClick={savePassword} className='flex justify-center  items-center  gap-2 rounded-full bg-[#e64833de]  hover:bg-[#e64934] px-5 py-2 w-fit  ring-slate-700 ring-1'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#000000,secondary:#08a88a"
            >
            </lord-icon>
            Save</button>

        </div>

        <div className="">
          <h2 className='text-2xl font-bold text-center py-2'>Your Passwords</h2>
          {passwordarr.length === 0 && <p className='text-center  text-slate-400'>No passwords saved</p>}
          {passwordarr.length !== 0 &&
            <table className="table-auto w-full overflow-hidden rounded-md mb-5">
              <thead className='bg-[#874f41] text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-[#fbe9d0]'>
                {passwordarr.map((item, index) => {

                  return <tr key={index}>
                    <td className="flex items-center justify-center  py-1 border border-white "><a href={item.site} target='blank'>{item.site} </a>
                      <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>

                        <lord-icon
                          style={{ "width": '25px', "height": '25px', "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon></div>

                    </td>
                    <td className="text-center w-32 py-1 border border-white ">
                      <div className=' flex items-center justify-center'>
                        {item.username}
                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>

                          <lord-icon
                            style={{ "width": '25px', "height": '25px', "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon></div>

                      </div>
                    </td>
                    <td className="text-center w-32 py-1 border border-white ">
                      <div className=' flex items-center justify-center'>
                        {item.password}
                        <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>

                          <lord-icon
                            style={{ "width": '25px', "height": '25px', "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon></div>

                      </div>
                    </td>
                    <td className="text-center w-32 py-1 border border-white ">
                      <span className='mx-1.5 cursor-pointer' onClick={() => { editPassword(item.id) }}>
                     <lord-icon 
                       style={{ "width": '20px', "height": '20px', "paddingTop": "3px", "paddingLeft": "3px" }}
                         src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"></lord-icon>

                          </span>
                          <span className='mx-1.5 cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                     <lord-icon 
                       style={{ "width": '20px', "height": '20px', "paddingTop": "3px", "paddingLeft": "3px" }}
                         src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"></lord-icon>
                          
                          </span>
                    </td>
                  </tr>

                })}
              </tbody>
            </table>}

        </div>

      </div>


    </>
  )
}

export default manager
