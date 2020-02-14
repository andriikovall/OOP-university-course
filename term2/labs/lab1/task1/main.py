from abstract_calc import CalculatorAbstract
from calcs_implementations import IngeneerCalculator, SimpleCalculator

class Calculator(CalculatorAbstract):
    def __init__(self, implementator):
        self.__implementator = implementator

    @staticmethod
    def __display_result(result):
        print('The result is', result)

    def add(self, *nums):
        result = self.__implementator.add(nums)
        self.__display_result(result)
        return result

    def sub(self, num1, num2):
        result = self.__implementator.sub(num1, num2)
        self.__display_result(result)
        return result

    def mult(self, *nums):
        result = self.__implementator.mult(nums)
        self.__display_result(result)
        return result

    def div(self, num1, num2):
        result = self.__implementator.div(num1, num2)
        self.__display_result(result)
        return result
    
    def mod(self, what, by):
        result = self.__implementator.divide_by_module(what, by)
        self.__display_result(result)
        return result
    
    def pow(self, num, p):
        result = self.__implementator.power(num, p)
        self.__display_result(result)
        return result

    def sqrt(self, num):
        result = self.__implementator.get_sqrt(num)
        self.__display_result(result)
        return result


ingeneer = Calculator(IngeneerCalculator())
simple = Calculator(SimpleCalculator())

ingeneer.sqrt(9)
simple.sqrt(9)