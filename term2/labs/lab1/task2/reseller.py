from distributor import Distributor

class Reseller(Distributor):

    def distribute(self):
        print('Reseller is unable to distribute', self.item.name)

    def sell(self):
        new_price = self.item.curr_price + (self.item.curr_price * self.comission_persentage)

        if (new_price > self.item.max_price):
            print('Unable with price more than was set by distributor')
            print('Current price', new_price)
            print('Max price', self.item.max_price)
        else:
            pass

    def add(self):
        pass

    def remove(self):
        pass

