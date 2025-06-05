numeros = []

from random import  randrange
for n in range(100):
    #numero = randr1ange(1, 999999)
    try:
        numero = int(input())    
        if numero not in numeros:
            numeros.append(numero)
    except EOFError:
        pass

maior = max(numeros)
pos = numeros.index(maior)
print(maior)
print(pos+1)
print(len(numeros))    