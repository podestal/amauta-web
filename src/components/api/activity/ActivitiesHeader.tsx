import GoBack from '../../ui/GoBack'
import Selector from '../../ui/Selector'
import CreateActivity from './CreateActivity'

interface Props {
    area: string
    assignatureId: string
    selectedQuarter: string
    setSelectedQuarter: React.Dispatch<React.SetStateAction<string>>
    classroom: string
}

const ActivitiesHeader = ({ area, assignatureId, setSelectedQuarter, selectedQuarter, classroom }: Props) => {
  return (
    <div>
      <div className='max-lg:grid max-lg:grid-cols-3 lg:flex lg:justify-center lg:items-center w-full mx-auto mb-8 lg:gap-8'>
        <div className='w-fit lg:hidden'>
          <GoBack 
            path={'/app/assignatures/'}
            state={{}}
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">Actividades</h2>
      </div>
      <div className="lg:grid lg:grid-cols-3 gap-12 mb-8">
        <div className='max-lg:hidden w-full flex justify-start items-center'>
          <GoBack 
            path={'/app/assignatures/'}
            state={{}}
          />
        </div>
        <div className='flex flex-col gap-8 my-6 lg:hidden'>
        <Selector 
              values={[{ id: 'Q1', name: 'Bimestre 1'}, { id: 'Q2', name: 'Bimestre 2'}, { id: 'Q3', name: 'Bimestre 3'}, { id: 'Q4', name: 'Bimestre 4'}]}
              lan='ES'
              setter={setSelectedQuarter}
              defaultValue={selectedQuarter}
          />
        <CreateActivity 
            area={parseInt(area)}
            assignatureId={assignatureId}
            selectedQuarter={selectedQuarter}
            classroom={classroom}
        />
        </div>
        <div className='max-lg:hidden'>
        <Selector 
              values={[{ id: 'Q1', name: 'Bimestre 1'}, { id: 'Q2', name: 'Bimestre 2'}, { id: 'Q3', name: 'Bimestre 3'}, { id: 'Q4', name: 'Bimestre 4'}]}
              lan='ES'
              setter={setSelectedQuarter}
              defaultValue={selectedQuarter}
          />
        </div>
        <div className='max-lg:hidden'>
        <CreateActivity 
            area={parseInt(area)}
            assignatureId={assignatureId}
            selectedQuarter={selectedQuarter}
            classroom={classroom}
        />
        </div>
    </div>
    </div>
  )
}

export default ActivitiesHeader