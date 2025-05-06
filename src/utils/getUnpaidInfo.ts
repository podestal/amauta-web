import moment from "moment"

interface Props {
    paymentStatus: string
}

const getUnpaidInfo = ({ paymentStatus }: Props): {active:boolean, unpaidMessage:string} => {
    const today = moment()
    const startOfMonth = moment().startOf("month")
    const daysPassed = today.diff(startOfMonth, "days")

    if (paymentStatus === 'P') return {
        active: true,
        unpaidMessage: ""
    }

    if (daysPassed < 8) {
        return  {
            active: true,
            unpaidMessage: `Recuerda que tu suscripción caduca ${6 - daysPassed === 1 ? `en ${6 - daysPassed} día` : `${6 - daysPassed === 0 ? 'hoy' : `en ${6 - daysPassed} días`} `}. Por favor, actualiza tu suscripción para seguir usando la plataforma.`
        }
    } 
    return {
        active: false,
        unpaidMessage: "Tu suscripción ha caducado. Por favor, actualiza tu suscripción para seguir usando la plataforma."
    }
}

export default getUnpaidInfo