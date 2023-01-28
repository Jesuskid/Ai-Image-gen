import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'


const CreatePost = () => {
    const navigate = useNavigate()
    const [form, setform] = useState({
        name: '',
        prompt: '',
        photo: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.prompt && form.photo) {
            setloading(true)
            try {
                const response = await fetch("http://localhost:8000/api/v1/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                })

                await response.json()
                navigate('/')
            } catch (err) {
                alert(err)
            } finally {
                setloading(false)
            }
        } else {
            alert("Please enter a prompt")
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleSupriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setform({ ...form, prompt: randomPrompt })
    }
    const generateImage = async () => {
        if (form.prompt) {
            try {
                setgeneratingImg(true)
                const response = await fetch('http://localhost:8000/api/v1/dalle', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ prompt: form.prompt })
                })
                const data = await response.json()
                setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
            } catch (error) {
                alert(error)
            } finally {
                setgeneratingImg(false)
            }
        } else {
            alert("Please enter a prompt")
        }
    }

    const [generatingImg, setgeneratingImg] = useState(false)
    const [loading, setloading] = useState(false)



    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extra-bold text-[#222328] text-[32px]'>Create</h1>
                <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>Create imaginative a visually stunning AI generated images</p>
            </div>
            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName='Your Name'
                        type='text'
                        name='name'
                        placeholder='John Doe'
                        value={form.name}
                        handleChange={handleChange}
                    />

                    <FormField
                        labelName='Prompt'
                        type='text'
                        name='promt'
                        placeholder='A red ass cheek'
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe={true}
                        handleSupriseMe={handleSupriseMe}

                    />



                    <div className='relative bg-gray-50 border border-gray-300 tetx-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 flex justify-center items-center p-3'>
                        {form.photo ? (
                            <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
                        ) : (
                            <img src={preview} alt={preview} className='w-9/12 h-9/12 opacity-40 object-contain' />
                        )}

                        {generatingImg && (
                            <div className='absolute inset-0 z-0 flex justify-center items-center bg-rgba(0,0,0, 0.5) rounded-lg'>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>

                <div className='mt-5 flex gap-5'>
                    <button type='button' className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' onClick={generateImage}>
                        {generatingImg ? 'Generating...' : 'Generate'}
                    </button>
                </div>

                <div className='mt-10'>
                    <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you want you can share it with others in the community</p>
                    <button type='button' className='text-white mt-3 bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' onClick={handleSubmit}>
                        {loading ? 'Sharing...' : 'Share with the community'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost