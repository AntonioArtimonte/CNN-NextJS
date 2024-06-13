import { RocketIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertComponenentProps{
    message: string,
    type: "success" | "error",
    onClose: () => void
}

const AlertComponenent: React.FC<AlertComponenentProps> = ({message, type, onClose}) => {

    const alertPos = {
        position: "fixed" as "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        padding: "16px"
    }

  return (
    <div style={alertPos}>
        <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Aviso!</AlertTitle>
        <AlertDescription>
            {message}
        </AlertDescription>
        <div className="flex mt-4">
        <Button onClick={onClose}>Fechar</Button>
        </div>
        </Alert>
    </div>
  )
}

export default AlertComponenent;