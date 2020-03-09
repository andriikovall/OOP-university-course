from abc import ABCMeta, abstractmethod

class ICalculatorAdvanced():
    __metaclass__= ABCMeta

    @staticmethod
    @abstractmethod
    def get_sqrt(num):
        pass
    
    @staticmethod
    @abstractmethod
    def divide_by_module(what, by):
        pass

    @staticmethod
    @abstractmethod
    def power(num, p):
        pass
    