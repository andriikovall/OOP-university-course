from abstract_calc import CalculatorAbstract
from calcs_implementations import IngeneerCalculator, SimpleCalculator
from advanced_calc_interface import ICalculatorAdvanced

from typing import List

class Calculator(CalculatorAbstract):
    def __init__(self, implementator: ICalculatorAdvanced):
        self.__implementator = implementator
    
    def result_decorator(func): 
        def wrapper(self, *args, **kwargs):
            result = func(self, *args, **kwargs)
            self.__display_result(result)
            return result
        return wrapper


    @staticmethod
    def __display_result(result) -> None:
        print('The result is', result)

    @result_decorator
    def add(self, *nums: float) -> float:
        result = super().add(*nums)
        return result

    @result_decorator
    def sub(self, num1: float, num2: float) -> float:
        result = super().sub(num1, num2)
        # self.__display_result(result)
        return result

    @result_decorator
    def mult(self, *nums: float) -> float:
        result = super().mult(*nums)
        # self.__display_result(result)
        return result

    @result_decorator
    def div(self, num1: float, num2: float) -> float:
        result = super().div(num1, num2)
        # self.__display_result(result)
        return result
    
    @result_decorator
    def mod(self, what: float, by: float) -> float:
        result = self.__implementator.divide_by_module(what, by)
        # self.__display_result(result)
        return result
    
    @result_decorator
    def pow(self, num: float, p: float) -> float:
        result = self.__implementator.power(num, p)
        # self.__display_result(result)
        return result

    @result_decorator
    def sqrt(self, num: float) -> float:
        result = self.__implementator.get_sqrt(num)
        # self.__display_result(result)
        return result


def main():
    ingeneer = Calculator(IngeneerCalculator())
    simple = Calculator(SimpleCalculator())

    ingeneer.sqrt(9)
    simple.sqrt(9)

    ingeneer.add(123, 213)
    simple.add(123, 123)

    ingeneer.mod(32.3, 1)
    simple.mod(123, 21)


if __name__ == '__main__':
    main()

