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
# Camadas que serão utilizadas
from keras.layers import Dense, Flatten

# Criação do modelo linear
linear_model = Sequential()
linear_model.add(Flatten(input_shape=(28, 28, 1)))  # Flatten the input
linear_model.add(Dense(128, activation='relu'))  # First dense layer
linear_model.add(Dense(64, activation='relu'))   # Second dense layer
linear_model.add(Dense(10, activation='softmax'))  # Output layer

# Constroi o modelo
linear_model.build()
# Exibe um resumo do modelo
linear_model.summary()

from keras.optimizers import Adam

adam = Adam()
linear_model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer=adam)

start_time = time.time()

# Realiza o treinamento do modelo
historico = linear_model.fit(x_treino_norm, y_treino_cat, epochs=5, validation_split=0.2)

end_time = time.time()
training_time = end_time - start_time
print(f"Tempo de treinamento: {training_time} segundos")

linear_model.save('linear_modelo_mnist.h5')

# Avalia o modelo
test_loss, test_acc = linear_model.evaluate(x_teste_norm, y_teste_cat)
print(f"Acurácia: {test_acc}")

from tensorflow.keras.models import load_model
modelo_2 = load_model('linear_modelo_mnist.h5')

predicao = linear_model.predict(x_teste_norm[6].reshape(1, 28, 28, 1))
print(predicao)
# Exibe a classe com a maior probabilidade de ser a correta da predição
import numpy as np
print(np.argmax(predicao))
