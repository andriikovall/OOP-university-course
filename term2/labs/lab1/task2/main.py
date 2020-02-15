from reseller import Reseller, DistributorComposite
from item import Item

def main():
    item = Item('parf', 100, 150)

    d1 = DistributorComposite('andrey', 0)
    d2 = DistributorComposite('sasha', 10)
    d3 = DistributorComposite('masha', 9)
    d4 = DistributorComposite('volandemort', 2)

    d1.add_distibutor(d2)

    d1.add_distibutor(d4)

    last = Reseller('last', 15)
    d1.add_distibutor(d2)
    d4.add_distibutor(d3)

    d1.add_distibutor(d4)
    
    d3.add_distibutor(last)



    d1.sell_item(item)



    d1.display_next_resellers(d1.item)


if __name__ == '__main__':
    main()


