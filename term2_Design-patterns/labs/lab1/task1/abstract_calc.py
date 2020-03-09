import functools
from abc import ABC

class CalculatorAbstract(ABC):

    @staticmethod
    def add(*nums):
        print('Adding nums', nums)
        _sum = sum(nums)
        return _sum

    @staticmethod
    def sub(num1, num2):
        print('Substracting numbers', num1, num2)
        return num1 - num2

    @staticmethod
    def mult(*nums):
        print('Multiplyinig numbers', nums)
        return functools.reduce(lambda acc, curr: acc * curr, nums)

    @staticmethod
    def div(num1, num2):
        print('Dividing number', num1, 'by', num2)
        return num1 / num2
        

