// import Activities from '../components/api/activity/Activities'
import { GoogleGenAI } from '@google/genai'
import { useState } from 'react'
import Input from '../components/ui/Input'

const AssignaturePage = () => {

  const [topic, setTopic] = useState('')
  const apiKey = import.meta.env.VITE_GEMINI_KEY
  const googleGenAI = new GoogleGenAI({
    apiKey: apiKey,})
    
  const getAIResponse = async (topic: string) => {
    const response = await googleGenAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Make a lesson for a 5th grade class about this topic ${topic}, this lesson is going to be 50 minutes long, and it has to be very fun and interactive. after the lesson give me some ways to interact with the students in order to them to learn this . The lesson has to be in Spanish. just add the lesson, do not say sure here you have, or at the end do not say I hope this works, just the lesson period`,
    })
// 
    console.log('AI response',response);
  }
   

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">
        <Input 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder='Enter your prompt here...'
        />
        <button className='bg-blue-600 text-slate-50 px-6 py-2' onClick={() => {
          getAIResponse(topic)
          setTopic('')
        }}>Get AI Response</button>
        {/* <Activities /> */}
    </div>
  )
}

export default AssignaturePage