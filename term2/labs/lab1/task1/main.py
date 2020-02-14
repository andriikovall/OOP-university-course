from abstract_calc import CalculatorAbstract
from calcs_implementations import IngeneerCalculator, SimpleCalculator



class Calculator(CalculatorAbstract):
    def __init__(self, implementator):
        self.__implementator = implementator
    
    def result_decorator(func): 
        def wrapper(self, *args, **kwargs):
            result = func(self, *args, **kwargs)
            self.__display_result(result)
            return result
        return wrapper


    @staticmethod
    def __display_result(result):
        print('The result is', result)

    @result_decorator
    def add(self, *nums):
        result = super().add(*nums)
        return result

    @result_decorator
    def sub(self, num1, num2):
        result = super().sub(num1, num2)
        # self.__display_result(result)
        return result

    @result_decorator
    def mult(self, *nums):
        result = super().mult(*nums)
        # self.__display_result(result)
        return result

    @result_decorator
    def div(self, num1, num2):
        result = super().div(num1, num2)
        # self.__display_result(result)
        return result
    
    @result_decorator
    def mod(self, what, by):
        result = self.__implementator.divide_by_module(what, by)
        # self.__display_result(result)
        return result
    
    @result_decorator
    def pow(self, num, p):
        result = self.__implementator.power(num, p)
        # self.__display_result(result)
        return result

    @result_decorator
    def sqrt(self, num):
        result = self.__implementator.get_sqrt(num)
        # self.__display_result(result)
        return result


ingeneer = Calculator(IngeneerCalculator())
simple = Calculator(SimpleCalculator())

ingeneer.sqrt(9)
simple.sqrt(9)

ingeneer.add(123, 213)
simple.add(123, 123)