import React, { useCallback, useEffect, useRef, useState } from 'react'

const PasswordGenerator = () => {

    const [password, setpassword] = useState('')
    const [length, setlength] = useState(8)
    const [numberAllowed, setnumberAllowed] = useState(false)
    const [charAllowed, setcharAllowed] = useState(false)

     //useRef Hook
     const passwordRef = useRef(null)

    //useCallback Hook
    const passwordGenerator = useCallback(() => {
       let pass = ""
       let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

       if(numberAllowed) str += "1234567890"
       if(charAllowed) str += "~!@#$%^&*(){}`"

       for (let i = 1 ; i <=length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        // console.log(char)
        pass += str.charAt(char)
       }

       setpassword(pass)

    },[length,numberAllowed,charAllowed,setpassword])

    const copyToClipBoard = useCallback(() => {
       passwordRef.current?.select();
       passwordRef.current?.setSelectionRange(0,51);
       window.navigator.clipboard.writeText(password)
    }, [password])  

    //useEffect Hook
    useEffect(() => {
       passwordGenerator()
    },[length, numberAllowed, charAllowed, passwordGenerator ])
    
  return <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
           <input 
           type='text'
           className='outline-none w-full py-1 px-3'
           placeholder='Password...'
           value={password}
           readOnly
           ref={passwordRef}
           />
           <button className='outline-none bg-blue-700 
           text-white 
           px-3 
           py-0.5 
           shrink-0'
           onClick={copyToClipBoard}
           >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
           <input 
           type="range"
           min={6}
           max={50}
           value={length}
           onChange={(e) => {setlength(e.target.value)}}
           className='cursor-pointer'
           />
           <label>Length: {length}</label>
        </div>

        {/* CheckBox */}
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          className='cursor-pointer'
          defaultChecked={numberAllowed}
          onChange={() => {
            setnumberAllowed((prevState) => !prevState)
          }}
          />
          <label>Numbers</label>
        </div>

        {/* CheckBox */}
        <div className='flex items-center gap-x-1'>
           <input 
           type="checkbox" 
           className='cursor-pointer'
           defaultChecked={charAllowed}
           onChange={() => {
            setcharAllowed((prev) => !prev)
           }}
           />
           <label>Characters</label> 
        </div>
      </div>
    </div>
  </>
}

export default PasswordGenerator


