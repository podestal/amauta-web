// import Activities from '../components/api/activity/Activities'
import { useLocation } from 'react-router-dom'
import useGetProfileStore from '../hooks/store/useGetProfileStore'
import Lessons from '../components/api/lesson/Lessons'


const AssignaturePage = () => {

  const state = useLocation().state
  const profile = useGetProfileStore(s => s.profile)
  const assignature = state.assignatureId
  const classroom = profile?.clases_details?.find( classroom => classroom.split('-')[classroom.split('-').length - 1] === (state.classroom)?.toString()) || ''
   

  return (
    <div className="w-full max-w-[95%] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] 2xl:max-w-[1380px] mx-auto overflow-hidden">
      {/* <form 
        onSubmit={handleSubmit}>
        <Input 
          value={topic}
          onChange={(e) => {
            topic && setTopicError('')
            setTopic(e.target.value)}}
          placeholder='Enter your prompt here...'
          error={topicError}
          setError={setTopicError}
        />
        <button className='bg-blue-600 text-slate-50 px-6 py-2'>Get AI Response</button>
      </form>
      {loading 
      ? 
      <div className='w-full flex justify-center items-center my-10'>
        <p className='text-md animate-pulse font-bold'>Un Momento</p>
      </div> 
      : 
      <LessonContent 
        markdown={markdown}
        setMarkdown={setMarkdown}
        open={open}
        setOpen={setOpen}
      />
      } */}




      <div className='w-full h-screen flex justify-center items-center'>
      <Lessons 
        classroom={classroom}
        assignature={assignature}
        area={state.area}
      />
      </div>


      
        {/* <Activities /> */}
    </div>
  )
}

export default AssignaturePage