import StaffInstructors from "./StaffInstructors"

const profiles = [
    {id: 1, name: 'Administrativo', group: 'manager'},
    {id: 2, name: 'Docente', group: 'instructor'},
    {id: 3, name: 'Auxiliar', group: 'assistant'},
]

const Staff = () => {
  return (
    <div
        className="grid grid-cols-3 gap-4"
    >
        {profiles.map(profile => (
            <div key={profile.id}>
                <h2 className="text-center">{profile.name}</h2>
                {profile.group === 'instructor' && <StaffInstructors
                    group={profile.group}
                />}
            </div>
        ))}
    </div>
  )
}

export default Staff