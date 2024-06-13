import * as React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ResultCardProps {
    model: string,
    result: string,
    time_taken: string
}

const ResultCard: React.FC<ResultCardProps> = ({ model, result, time_taken }) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Resultado</CardTitle>
                <CardDescription>Resultado adquirido após tratamento da imagem com o modelo <b>{model}</b></CardDescription>
            </CardHeader>
            <CardContent>
                <p>Numero identificado <b>{result}</b></p>
            </CardContent>
            <CardFooter>
                <p>Tempo gasto: <b>{time_taken}</b> segundos</p>
            </CardFooter>
        </Card>
    );
}

export default ResultCard;
