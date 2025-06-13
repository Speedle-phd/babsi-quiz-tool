import Accent from "@/components/Accent"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"


const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold"><Accent>404</Accent> - Not Found</h1>
      <p className="mt-2 text-sm">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-4">
        <Button variant="outline" className="border-2 border-brand text-brand">Zurück zum Quiz</Button>
      </Link>
    </div>
  )
}

export default ErrorPage
