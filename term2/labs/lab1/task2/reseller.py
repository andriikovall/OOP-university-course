from distributor import Distributor

class Reseller(Distributor):

    def sell_item(self, item):
        if self.item == None:
            self.item = item

        new_price = self.curr_item_price

        if (new_price > self.item.max_price):
            print('Unable with price more than was set by distributor')
            print('Current price', new_price)
            print('Max price', self.item.max_price)
        else:
            print('The product', self.item.name, 'has been sold for', new_price)

    def add_distibutor(self, reseller):
        print('Final reseller can not have partners')

    def remove(self, reseller):
        print("Final reseller doesn't have parnters")

    def display_next_resellers(self, item, level = 1):
        print('\n')

class DistributorComposite(Distributor):
    def sell_item(self, item):
        self.item = item
        self.item.current_price = self.curr_item_price
        for d in self.child_distributors:
            print(self.name, 'resells the product to', d.name)
            item.price = self.curr_item_price
            d.sell_item(item)
        self.item.reset_price()
    
    def display_self(self, level = 1):
        print('-'.ljust(level * 2, '-'), self.name, self.item.current_price)

    def add_distibutor(self, reseller):
        self.child_distributors.append(reseller)

    def remove(self, reseller):
        self.child_distributors.remove(reseller)

    def display_next_resellers(self, item, level = 1):
        self.item = item
        self.item.current_price = self.curr_item_price
        self.display_self(level)
        for d in self.child_distributors:
            d.display_next_resellers(item, level + 1)
        self.item.reset_price()
    


