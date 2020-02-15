from reseller import Reseller, DistributorComposite
from item import Item

def main():
    item1 = Item('parf', 100, 150)
    # item2 = Item('shoto', 150, 520)

    andrey = DistributorComposite('andrey', 3)

    sasha = DistributorComposite('sasha', 10)
    # ktoto = DistributorComposite('ktoto', 15)
    boy = DistributorComposite('boy', 9)
    sajda = DistributorComposite('sajda', 12)

    andrey.add_distibutor(sasha)
    sasha.add_distibutor(sajda)

    andrey.add_distibutor(boy)

    last = Reseller('last', 1)
    boy.add_distibutor(last)



    andrey.sell_item(item1)

    andrey.display_next_resellers()

main()


