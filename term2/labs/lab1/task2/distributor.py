from item import Item

class Distributor:

    def __init__(self, name, item, comission_persentage):
        self.child_distributors = []
        self.name = name
        self.item = item
        self.comission_persentage = comission_persentage
    
    def distribute(self, item):
        pass
        # print('Distributing item to another resellers')
    
    def sell_item(self):
        pass
        # print('Selling item with price', self.item.price)
    
    def add(self, reseller):
        pass

    def remove(self, reseller):
        pass
