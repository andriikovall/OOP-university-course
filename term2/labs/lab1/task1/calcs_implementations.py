from math import sqrt as math_sqrt
from advanced_calc_interface import ICalculatorAdvanced
   
class IngeneerCalculator(ICalculatorAdvanced):
    @staticmethod
    def get_sqrt(num):
        print('Getting square root of', num)
        return math_sqrt(num)
    
    @staticmethod
    def divide_by_module(what, by):
        print('Dividing', what, 'by module of', by)
        return what % by

    @staticmethod
    def power(num, p):
        print('Raising', num, 'to the power of', p)
        return num ** p

from advanced_calc_interface import ICalculatorAdvanced



class SimpleCalculator(ICalculatorAdvanced):
    @staticmethod
    def get_sqrt(num):
        print('Unable to get sqrt in a simple calculator')
    
    @staticmethod
    def divide_by_module(what, by):
        print('Unable to divide by module in a simple calculator')

    @staticmethod
    def power(num, p):
        print('Unable to get a power of a number in a simple calculator')