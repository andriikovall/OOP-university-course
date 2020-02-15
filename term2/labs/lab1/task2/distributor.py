from item import Item

class Distributor:


    @property
    def curr_item_price(self):
        if (self.item != None):
            return self.item.current_price * (1 + (self.comission_persentage / 100))
        return 0

    def __init__(self, name, comission_persentage, item = None):
        self.child_distributors = []
        self.name = name
        self.item = item
        self.comission_persentage = comission_persentage
    
    def sell_item(self):
        pass
    
    def add_distibutor(self, reseller):
        pass

    def remove(self, reseller):
        pass

    def display_next_resellers(self):
        pass
