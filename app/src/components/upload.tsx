"use client"

import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CardsProps {
    onResult: (model: string, result: string, timeTaken: string) => void
    onError: (message: string) => void
}

const Cards: React.FC<CardsProps> = ({ onResult, onError }) => {
    const [file, setFile] = useState<File | null>(null);
    const [model, setModel] = useState<string>('');
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        setFile(files[0]);
      }
    };
  
    const handleModelChange = (value: string) => {
      setModel(value);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!file || !model) {
        onError('Por favor, selecione uma imagem e um modelo');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      const endpoints: { [key: string]: string } = {
        padrao: 'http://localhost:8000/api/padrao',
        linear: 'http://localhost:8000/api/linear',
      };

      const endpoint = endpoints[model];
  
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        onResult(model, data.predict.toString(), data.predict_normal_time.toString());
      } catch (error) {
        console.error('There was an error:', error);
        onError('Erro ao analisar a imagem');
      }
    };
  
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Upload de imagem</CardTitle>
          <CardDescription>Adicione uma imagem para indentificar o número nela presente</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Imagem</Label>
                <Input type="file" id="name" onChange={handleFileChange}/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Modelo</Label>
                <Select onValueChange={handleModelChange}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="padrao">Modelo Padrão</SelectItem>
                    <SelectItem value="linear">Modelo Linear</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-between justify-items-start">
              <Button type="submit" className="mt-4 flex ">Analisar</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    )
}

export default Cards;
