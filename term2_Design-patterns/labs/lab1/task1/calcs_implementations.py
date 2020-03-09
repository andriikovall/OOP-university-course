from math import sqrt as math_sqrt
from advanced_calc_interface import ICalculatorAdvanced
   
class IngeneerCalculator(ICalculatorAdvanced):
    @staticmethod
    def get_sqrt(num: float) -> float:
        print('Getting square root of', num)
        return math_sqrt(num)
    
    @staticmethod
    def divide_by_module(what: float, by: float) -> int:
        print('Dividing', what, 'by module of', by)
        return what % by

    @staticmethod
    def power(num: float, p: float):
        print('Raising', num, 'to the power of', p)
        return num ** p


class SimpleCalculator(ICalculatorAdvanced):
    @staticmethod
    def get_sqrt(num: float):
        print('Unable to get sqrt in a simple calculator')
    
    @staticmethod
    def divide_by_module(what: float, by: float) -> int:
        print('Unable to divide by module in a simple calculator')

    @staticmethod
    def power(num: float, p: float) -> float:
        print('Unable to get a power of a number in a simple calculator')