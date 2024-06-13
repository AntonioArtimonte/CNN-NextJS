"use client"

import * as React from 'react';
import { useState } from "react"
import Cards from "@/components/upload";
import ResultCard from "@/components/img-card";
import AlertComponenent from "@/components/alert";

const ParentComponent: React.FC = () => {
    const [model, setModel] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [timeTaken, setTimeTaken] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ message:string; type: "success" | "error"} | null>(null);

    const handleResult = (model: string, result: string, timeTaken: string) => {
        setModel(model);
        setResult(result);
        setTimeTaken(timeTaken);
        setAlert({ message: "Análise de imagem completa", type: "success"});
    };

    const handleError = (message: string) => {
        setAlert({ message, type: "error" });
    }

    const closeAlert = () => {
        setAlert(null);
    };

    return (
        <div className="p-8">
            <Cards onResult={handleResult} onError={handleError} />
            <div className="mt-4">
            {result && model && timeTaken && (
                <ResultCard model={model} result={result} time_taken={timeTaken}/>
                )}
                {alert && (
                    <AlertComponenent message={alert.message} type={alert.type} onClose={closeAlert} />
                )}
            </div>
        </div>
    );
};

export default ParentComponent