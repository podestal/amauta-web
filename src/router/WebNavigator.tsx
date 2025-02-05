import Button from "../components/ui/Button"

const WebNavigator = () => {
  return (
    <div className="w-full dark:bg-neutral-950 bg-white fixed z-40 px-20">

        <div className="w-full h-14 flex justify-between items-center">
            {/* <a href="/"><img src="/images/logo.png" alt="Logo" className="w-12 h-12"/>sdasd</a> */}
            <h2>Logo</h2>
            <ul className="flex w-full justify-center items-center gap-32">
                <li>Home</li>
                <li>Nosotros</li>
                <li>Legal</li>
            </ul>
            <div>
                <Button 
                    label="Ingresa"
                />
            </div>
        </div>
    </div>
  )
}

export default WebNavigator