# Upload de Imagem com Predição I.A

Este projeto permite o upload de imagens para a predição utilizando dois modelos de rede neural: um modelo linear simples e o modelo LeNet-5. A aplicação é construída utilizando Flask para o backend e permite o upload de imagens através de uma interface web simples.

## Comparação de Modelos

### Modelo Linear
- **Tempo de treinamento:** 43.89964437484741 segundos
- **Acurácia no teste:** 0.9768000245094299

### Modelo LeNet-5
- **Tempo de treinamento:** 186.78246140480042 segundos
- **Acurácia no teste:** 0.9901000261306763

### Comparação de Execução

| Modelo       | Tempo de Treinamento (s) | Acurácia no Teste |
|--------------|---------------------------|-------------------|
| Linear       | 43.899644                 | 0.9768            |
| LeNet-5      | 186.782461                | 0.9901            |

## Estrutura do Projeto

- `/app`: Arquivo que contem a aplicação NextJS -> Frontend
- `app/components`: Componenentes utilizads na aplicação React.
- `backend/app/api/endpoints`: Endpoints da aplicação.
- `backend/app/models/models/linear_modelo_mnist.h5`: Arquivo do modelo linear treinado.
- `backend/app/models/models/modelo_mnist.h5`: Arquivo do modelo LeNet-5 treinado.

## Pré-requisitos

Certifique-se de ter os seguintes pacotes instalados:

- Python3.11

Você pode instalar os pacotes necessários usando o seguinte comando (no MacOS, para outro S.O cheque a documentação própria do python):

```bash
brew install python@3.11
```

## Executando o projeto

1. Clone o repositório

```bash
git clone https://github.com/AntonioArtimonte/CNN-NextJS
```

2. Inicie o frontend

```bash
cd app
npm i
npm run dev
```

Em outro terminal, dentro do repositório também

3. Inicie um ambiente virtual do python

```bash
python3 -m venv venv

source venv/bin/activate
```

Ou com UV

```bash
uv venv venv

source venv/bin/activate
```

4. Instale as depêndencias

```bash
python3 -m pip install -r requirements.txt
```

Ou com UV

```bash
uv pip install -r requirements.txt
```



5. Inicie o backend (**Em outro terminal**)

```bash
cd backend

python3 -m uvicorn app.main:app --reload
```

## Executando com o Docker

Caso tenha o docker instalado em sua máquina, também é possível executar o projeto através do mesmo através do seguinte tutorial:

Buildar o docker

```bash
docker-compose up --build
```

Se não rodar automaticamente execute o seguinte

```bash
docker-compose up
```

## Uso

1. Na página inicial, faça o upload de uma imagem com algum algarismo.

2. A aplicação exibirá um dropdown para escolha do modelo a ser utilizado. Após selecionar e clicar em analisar, a aplicação retornará os resultados daquela imagem.

## Rotas da API

A aplicação FastAPI possui duas rotas principais:

### 1. `http://localhost:8000/api/padrao` (POST)

- **Descrição:** Esta rota processa a imagem enviada usando o modelo LeNet-5.
- **Entrada:**
  - Recebe um arquivo de imagem enviado através de um formulário com a chave `file`.
- **Processamento:**
  - A imagem é redimensionada para 28x28 pixels, convertida para escala de cinza, normalizada (dividida por 255) e reshapeada para o formato (1, 28, 28, 1).
  - O tempo de início é registrado antes de fazer a predição.
  - A predição é realizada pelo modelo LeNet-5.
  - O tempo de término é registrado após a predição.
- **Saída:**
  - Retorna um JSON com os seguintes dados:
    - `predict`: Classe prevista pelo modelo (inteiro).
    - `predict_normal_time`: Tempo gasto no processamento da predição (segundos).

### 2. `http://localhost:8000/api/linear` (POST)

- **Descrição:** Esta rota processa a imagem enviada usando o modelo linear.
- **Entrada:**
  - Recebe um arquivo de imagem enviado através de um formulário com a chave `file`.
- **Processamento:**
  - A imagem é redimensionada para 28x28 pixels, convertida para escala de cinza, normalizada (dividida por 255) e reshapeada para o formato (1, 28, 28, 1).
  - O tempo de início é registrado antes de fazer a predição.
  - A predição é realizada pelo modelo linear.
  - O tempo de término é registrado após a predição.
- **Saída:**
  - Retorna um JSON com os seguintes dados:
    - `predict_linear`: Classe prevista pelo modelo (inteiro).
    - `predict_linear_time`: Tempo gasto no processamento da predição (segundos).


## Códigos referentes ao treinamento

Ambos os códigos utilizados para o treinamento do modelo estão disponíveis na pasta `Códigos-Treinamento`.

Ambos foram utilizados do jeito que estão em um arquivo `.py`, afim de diminuir o tempo de treinamento porém diminuir a acurácia pode-se reduzir as `epochs`, no treinamento dos modelos utilizados foram utilizadas épocas **50**.

## Vídeo

Para saber melhor como a aplicação funciona, segue um vídeo abaixo demonstrando o uso da mesma

[Vídeo](https://drive.google.com/file/d/1ZM9rvCJfrFtXAPLuabt0bCnwKUOQW5kq/view?usp=sharing)

## Autor

Projeto desenvolvido por Antonio Artimonte Vaz Guimarães