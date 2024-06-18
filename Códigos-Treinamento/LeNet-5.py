import time
from keras.datasets import mnist

# Carregando o dataset separando os dados de treino e de teste
(x_treino, y_treino), (x_teste, y_teste) = mnist.load_data()

# Trazendo a função `to_categorical` para transformar os labels em one-hot encoding
from keras.utils import to_categorical
y_treino_cat = to_categorical(y_treino)
y_teste_cat = to_categorical(y_teste)

x_treino_norm = x_treino / x_treino.max()
x_teste_norm = x_teste / x_teste.max()

x_treino = x_treino.reshape(len(x_treino), 28, 28, 1)
x_treino_norm = x_treino_norm.reshape(len(x_treino_norm), 28, 28, 1)
x_teste = x_teste.reshape(len(x_teste), 28, 28, 1)
x_teste_norm = x_teste_norm.reshape(len(x_teste_norm), 28, 28, 1)

from keras.models import Sequential
from keras.layers import Dense, Conv2D, MaxPool2D, Flatten

# Criação do modelo LeNet5
model = Sequential()
model.add(Conv2D(filters=32, kernel_size=(5, 5), padding='same', activation='relu', input_shape=(28, 28, 1)))
model.add(MaxPool2D(strides=2))
model.add(Conv2D(filters=48, kernel_size=(5, 5), padding='valid', activation='relu'))
model.add(MaxPool2D(strides=2))
model.add(Flatten())
model.add(Dense(256, activation='relu'))
model.add(Dense(84, activation='relu'))
model.add(Dense(10, activation='softmax'))

# Constroi o modelo
model.build()
# Exibe um resumo do modelo
model.summary()

from keras.optimizers import Adam

adam = Adam()
model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer=adam)

# Pega o tempo antes do treinamento
start_time = time.time()

# Realiza o treinamento do modelo
historico = model.fit(x_treino_norm, y_treino_cat, epochs=5, validation_split=0.2)

# Calcula o tempo gasto para treinar
end_time = time.time()
training_time = end_time - start_time
print(f"Tempo para treinar modelo LeNet-5: {training_time} segundos")

model.save('modelo_mnist.h5')

# Avalia o modelo
test_loss, test_acc = model.evaluate(x_teste_norm, y_teste_cat)
print(f"Acuráca modelo: {test_acc}")

from tensorflow.keras.models import load_model
modelo_2 = load_model('modelo_mnist.h5')

predicao = model.predict(x_teste_norm[6].reshape(1, 28, 28, 1))
print(predicao)
# Exibe a classe com a maior probabilidade de ser a correta da predição
import numpy as np
print(np.argmax(predicao))
