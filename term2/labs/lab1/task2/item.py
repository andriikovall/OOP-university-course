class Item:

    id = 0

    def __init__(self, name, start_price, max_price):
        Item.id += 1
        self.id = Item.id
        self.name = name
        self.current_price = start_price
        self.max_price = max_price