import moment from "moment"

interface Props {
    paymentStatus: string
    profile: string
}   

const getUnpaidInfo = ({ paymentStatus, profile }: Props): {active:boolean, unpaidMessage:string} => {
    const today = moment()
    const startOfMonth = moment().startOf("month")
    const daysPassed = today.diff(startOfMonth, "days")
    if (paymentStatus === 'N') {
        if (daysPassed < 6) {
            return  {
                active: true,
                unpaidMessage: profile === 'tutor' ? '' : `Recuerda que tu suscripción caduca ${6 - daysPassed === 1 ? `en ${6 - daysPassed} día` : `${6 - daysPassed === 0 ? 'hoy' : `en ${6 - daysPassed} días`} `}. Por favor, actualiza tu suscripción para seguir usando la plataforma.`
            }
        } 
        return {
            active: false,
            unpaidMessage: profile === 'tutor' ? 'El servicio ha sido suspendido. Porfavor contáctese con su institución educativa.' : "Tu suscripción ha caducado. Por favor, actualiza tu suscripción para seguir usando la plataforma."
        }
    }

    return {
        active: true,
        unpaidMessage: ""
    }
    
}

export default getUnpaidInfo